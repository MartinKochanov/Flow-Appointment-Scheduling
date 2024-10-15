package prime.flow.infrastructure.mail.service;

import java.time.LocalDate;
import java.time.LocalTime;

public interface AppointmentMailService {

  void sendAppointmentScheduledMail(String serviceName, String clientName, String employeeName, LocalDate appointmentDate, LocalTime appointmentTime,
      String clientEmail);

  void sendAppointmentCancelMail(
      String serviceName, String clientName,
      String employeeName, String clientEmail
  );
}
