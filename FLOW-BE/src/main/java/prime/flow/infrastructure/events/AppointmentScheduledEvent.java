package prime.flow.infrastructure.events;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class AppointmentScheduledEvent extends ApplicationEvent {

  private final String clientName;
  private final String employeeName;
  private final String serviceName;
  private final String clientEmail;
  private final LocalDate appointmentDate;
  private final LocalTime appointmentTime;

  public AppointmentScheduledEvent(Object source, String clientName, String employeeName,
      LocalDate appointmentDate, LocalTime appointmentTime, String serviceName,
      String clientEmail1) {
    super(source);
    this.clientName = clientName;
    this.employeeName = employeeName;
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
    this.serviceName = serviceName;
    this.clientEmail = clientEmail1;
  }
}
