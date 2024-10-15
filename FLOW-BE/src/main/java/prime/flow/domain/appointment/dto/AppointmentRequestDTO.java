package prime.flow.domain.appointment.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

public record AppointmentRequestDTO(
    @NotNull(message = "Service id is required")
    @Positive(message = "Service id cannot be negative")
    Long serviceId,

    @NotNull(message = "Employee id is required")
    @Positive(message = "Employee id cannot be negative")
    Long employeeId,

    @NotNull(message = "Client id is required")
    @Positive(message = "Client id cannot be negative")
    Long clientId,

    @NotNull(message = "Appointment date and time is required")
    @FutureOrPresent(message = "Date or time cannot be in the past")
    LocalDateTime appointmentDateTime
) {

}
