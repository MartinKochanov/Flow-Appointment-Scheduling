package prime.flow.domain.appointment.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.transaction.annotation.Transactional;
import prime.flow.domain.appointment.Status;
import prime.flow.domain.appointment.dto.AppointmentRequestDTO;
import prime.flow.domain.appointment.dto.AppointmentResponseDTO;
import prime.flow.domain.appointment.entity.Appointment;
import prime.flow.domain.appointment.repository.AppointmentRepository;
import prime.flow.domain.service.entity.Service;
import prime.flow.domain.service.service.ServiceService;
import prime.flow.domain.user.entity.Client;
import prime.flow.domain.user.entity.Employee;
import prime.flow.domain.user.entity.User;
import prime.flow.domain.user.enums.Role;
import prime.flow.domain.user.service.UserService;
import prime.flow.infrastructure.events.AppointmentCancelEvent;
import prime.flow.infrastructure.events.AppointmentScheduledEvent;
import prime.flow.infrastructure.exceptions.InvalidClientException;
import prime.flow.infrastructure.exceptions.InvalidDateException;
import prime.flow.infrastructure.exceptions.InvalidEmployeeException;
import prime.flow.infrastructure.exceptions.ResourceNotFoundException;
import prime.flow.infrastructure.exceptions.TimeOutsideOfWorkingHoursException;
import prime.flow.infrastructure.exceptions.UnavailableTimeSLotException;
import prime.flow.infrastructure.mapper.AppointmentMapper;

@org.springframework.stereotype.Service
public class AppointmentServiceImpl implements AppointmentService {

  private final AppointmentRepository appointmentRepository;
  private final UserService userService;
  private final ServiceService serviceService;
  private final AppointmentMapper mapper;
  private final ApplicationEventPublisher applicationEventPublisher;

  public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
      UserService userService, ServiceService serviceService,
      AppointmentMapper mapper, ApplicationEventPublisher applicationEventPublisher) {
    this.appointmentRepository = appointmentRepository;
    this.userService = userService;
    this.serviceService = serviceService;
    this.mapper = mapper;
    this.applicationEventPublisher = applicationEventPublisher;
  }

  @Override
  public AppointmentResponseDTO create(AppointmentRequestDTO dto) {

    Service service = getService(dto.serviceId());
    Employee employee = getEmployee(dto.employeeId());
    Client client = getClient(dto.clientId());
    LocalDateTime endDateTime = dto.appointmentDateTime().plus(service.getDuration());

    if (dto.appointmentDateTime().toLocalTime().isBefore(employee.getWorkStartTime()) ||
        endDateTime.toLocalTime().isAfter(employee.getWorkEndTime())) {
      throw new TimeOutsideOfWorkingHoursException("Appointment time is outside of working hours");
    }

    boolean isAvailable = isTimeSlotAvailable(
        dto.employeeId(),
        dto.appointmentDateTime(),
        endDateTime
    );

    if (!isAvailable) {
      throw new UnavailableTimeSLotException("The selected time slot is not available.");
    }

    Appointment appointment = new Appointment(
        service,
        employee,
        client,
        dto.appointmentDateTime(),
        endDateTime,
        Status.SCHEDULED
    );

    applicationEventPublisher.publishEvent(new AppointmentScheduledEvent(
        "AppointmentService",
        client.getFirstName(),
        employee.getFirstName(),
        appointment.getAppointmentTime().toLocalDate(),
        appointment.getAppointmentTime().toLocalTime(),
        service.getName(),
        client.getEmail()
    ));

    return mapper.toResponse(appointmentRepository.save(appointment));
  }

  @Override
  public List<LocalDateTime> getAvailableTimeSlots(
      Long employeeId,
      Long serviceId,
      LocalDate date) {

    if (date.isBefore(LocalDate.now())) {
      throw new InvalidDateException("Invalid date.");
    }

    Employee employee = getEmployee(employeeId);
    Service service = getService(serviceId);

    List<Appointment> appointments = appointmentRepository.findAppointmentsForEmployeeOnDate(
        employeeId, date);

    List<LocalDateTime> availableSlots = new ArrayList<>();
    LocalTime startTime = employee.getWorkStartTime();
    LocalTime endTime = employee.getWorkEndTime();
    LocalDateTime slot = LocalDateTime.of(date, startTime);

    LocalDateTime currentTime = LocalDateTime.now();

    while (slot.toLocalTime().isBefore(endTime)) {
      LocalDateTime slotEnd = slot.plus(service.getDuration());

      if (slot.isAfter(currentTime) && slotEnd.toLocalTime().isBefore(endTime)) {
        LocalDateTime finalSlot = slot;

        boolean isSlotAvailable = appointments.stream()
            .noneMatch(appointment ->
                finalSlot.isBefore(appointment.getEndDateTime()) &&
                    slotEnd.isAfter(appointment.getAppointmentTime()));

        if (isSlotAvailable) {
          availableSlots.add(slot);
        }
      }

      slot = slot.plus(service.getDuration());
    }

    return availableSlots;
  }

  @Override
  @Transactional
  public AppointmentResponseDTO cancelAppointment(Long id) {
    Appointment appointment = getAppointment(id);
    appointment.setStatus(Status.CANCELED);
    Appointment updated = appointmentRepository.save(appointment);

    applicationEventPublisher.publishEvent(new AppointmentCancelEvent("AppointmentService",
        appointment.getClient().getFirstName(),
        appointment.getEmployee().getFirstName(),
        appointment.getService().getName(),
        appointment.getClient().getEmail()));
    return mapper.toResponse(updated);
  }

  @Override
  public List<AppointmentResponseDTO> findAppointmentsForEmployee(Long employeeId, LocalDate date) {
    return appointmentRepository.findAppointmentsForEmployeeOnDate(employeeId, date).stream()
        .map(mapper::toResponse).toList();
  }

  @Override
  public List<AppointmentResponseDTO> findAppointmentsForClient(Long customerId) {
    return appointmentRepository.findAppointmentsByClientId(customerId).stream()
        .map(mapper::toResponse).toList();
  }

  private boolean isTimeSlotAvailable(Long employeeId, LocalDateTime startDateTime,
      LocalDateTime endDateTime) {
    List<Appointment> appointments = appointmentRepository
        .findAppointmentsForEmployeeBetweenTimes(employeeId, startDateTime,
            endDateTime.minusMinutes(1));

    return appointments.isEmpty();
  }

  private Appointment getAppointment(Long id) {
    return appointmentRepository.findById(id).orElseThrow(
        () -> new ResourceNotFoundException("Appointment with id" + id + " not found!",
            "Appointment not found")
    );
  }

  private Employee getEmployee(Long id) {
    User employee = userService.getUser(id);
    if (employee.getRole() != Role.EMPLOYEE) {
      throw new InvalidEmployeeException("Invalid employee");
    }
    return (Employee) employee;
  }

  private Client getClient(Long id) {
    User client = userService.getUser(id);
    if (client.getRole() != Role.USER) {
      throw new InvalidClientException("Invalid invalid client");
    }
    return (Client) client;
  }

  private Service getService(Long id) {
    return serviceService.getService(id);
  }
}
