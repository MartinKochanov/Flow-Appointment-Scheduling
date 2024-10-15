package prime.flow.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import prime.flow.domain.appointment.dto.AppointmentResponseDTO;
import prime.flow.domain.appointment.entity.Appointment;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

  @Mapping(source = "service.name", target = "serviceName")
  @Mapping(source = "appointmentTime", target = "startDate")
  @Mapping(target = "endDate", expression = "java(appointment.getAppointmentTime().plus(appointment.getService().getDuration()))")
  @Mapping(source = "employee.firstName", target = "employeeName")
  @Mapping(source = "client.firstName", target = "clientName")
  AppointmentResponseDTO toResponse(Appointment appointment);
}
