package prime.flow.domain.appointment.dto;

import java.time.LocalDateTime;
import prime.flow.domain.appointment.Status;

public record AppointmentResponseDTO(
    Long id,
    String serviceName,
    LocalDateTime startDate,
    LocalDateTime endDate,
    String clientName,
    String employeeName,
    Status status
) {

}
