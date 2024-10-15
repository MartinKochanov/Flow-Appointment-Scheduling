package prime.flow.domain.appointment.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import prime.flow.domain.appointment.dto.AppointmentRequestDTO;
import prime.flow.domain.appointment.dto.AppointmentResponseDTO;

public interface AppointmentService {

  AppointmentResponseDTO create(AppointmentRequestDTO dto);

  List<LocalDateTime> getAvailableTimeSlots(
      Long employeeId,
      Long serviceId,
      LocalDate date);

  AppointmentResponseDTO cancelAppointment(Long id);

  List<AppointmentResponseDTO> findAppointmentsForEmployee(Long employeeId, LocalDate date);

  List<AppointmentResponseDTO> findAppointmentsForClient(Long customerId);
}
