package prime.flow.infrastructure.events;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class AppointmentCancelEvent extends ApplicationEvent {

  private final String clientName;
  private final String employeeName;
  private final String serviceName;
  private final String clientEmail;


  public AppointmentCancelEvent(Object source, String clientName, String employeeName,
      String serviceName,
      String clientEmail) {
    super(source);
    this.clientName = clientName;
    this.employeeName = employeeName;
    this.serviceName = serviceName;
    this.clientEmail = clientEmail;
  }

}
