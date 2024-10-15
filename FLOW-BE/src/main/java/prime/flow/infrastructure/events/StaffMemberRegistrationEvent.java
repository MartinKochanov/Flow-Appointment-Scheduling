package prime.flow.infrastructure.events;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class StaffMemberRegistrationEvent extends ApplicationEvent {

  private final String firstName;
  private final String userEmail;
  private final String defaultPassword;

  public StaffMemberRegistrationEvent(Object source, String firstname, String userEmail,
      String defaultPassword) {
    super(source);
    this.firstName = firstname;
    this.userEmail = userEmail;
    this.defaultPassword = defaultPassword;
  }

}
