package prime.flow.web;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import prime.flow.domain.appointment.dto.AppointmentRequestDTO;
import prime.flow.domain.appointment.dto.AppointmentResponseDTO;
import prime.flow.domain.appointment.service.AppointmentService;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

  private final AppointmentService appointmentService;

  public AppointmentController(AppointmentService appointmentService) {
    this.appointmentService = appointmentService;
  }

  @PreAuthorize("@appointmentsAuthorizationService.authorizeAccessToOwnAppointments(#id)")
  @GetMapping("/employee/{id}")
  public ResponseEntity<List<AppointmentResponseDTO>> getAppointmentsForEmployee(
      @PathVariable Long id,
      @RequestParam LocalDate date) {
    return ResponseEntity.ok(appointmentService
        .findAppointmentsForEmployee(id, date));
  }

  @PreAuthorize("@appointmentsAuthorizationService.authorizeAccessToOwnAppointments(#id)")
  @GetMapping("/client/{id}")
  public ResponseEntity<List<AppointmentResponseDTO>> getAppointmentsForClient(
      @PathVariable Long id) {
    return ResponseEntity.ok(appointmentService.findAppointmentsForClient(id));
  }

  @PreAuthorize("hasRole('USER')")
  @PostMapping("/book")
  public ResponseEntity<AppointmentResponseDTO> create(
      @Valid @RequestBody AppointmentRequestDTO dto) {
    return ResponseEntity.ok(appointmentService.create(dto));
  }

  @GetMapping("/available-time-slots")
  public ResponseEntity<List<LocalDateTime>> getAvailableTimeSlots(
      @RequestParam @NotNull Long employeeId,
      @RequestParam @NotNull Long serviceId,
      @RequestParam @NotNull LocalDate date) {
    return ResponseEntity.ok(
        appointmentService.getAvailableTimeSlots(
            employeeId,
            serviceId,
            date));
  }

  @PatchMapping("/cancel/{appointmentId}")
  public ResponseEntity<AppointmentResponseDTO> cancelAppointment(
      @PathVariable Long appointmentId) {
    return ResponseEntity.ok(appointmentService.cancelAppointment(appointmentId));
  }
}
