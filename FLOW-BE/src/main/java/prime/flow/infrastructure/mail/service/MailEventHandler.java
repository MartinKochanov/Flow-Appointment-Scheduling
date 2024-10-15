package prime.flow.infrastructure.mail.service;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import prime.flow.infrastructure.events.AppointmentCancelEvent;
import prime.flow.infrastructure.events.AppointmentScheduledEvent;
import prime.flow.infrastructure.events.StaffMemberRegistrationEvent;

@Component
public class MailEventHandler {

  private final AppointmentMailService appointmentMailService;
  private final StaffMailService staffMailService;

  public MailEventHandler(AppointmentMailService appointmentMailService,
      StaffMailService staffMailService) {
    this.appointmentMailService = appointmentMailService;
    this.staffMailService = staffMailService;
  }

  @EventListener(StaffMemberRegistrationEvent.class)
  public void staffMemberRegistered(StaffMemberRegistrationEvent event) {
    staffMailService.sendCreatedStaffMail(
        event.getFirstName(),
        event.getUserEmail(),
        event.getDefaultPassword());
  }

  @EventListener(AppointmentScheduledEvent.class)
  public void appointmentScheduled(AppointmentScheduledEvent event) {
    appointmentMailService.sendAppointmentScheduledMail(
        event.getServiceName(),
        event.getClientName(),
        event.getEmployeeName(),
        event.getAppointmentDate(),
        event.getAppointmentTime(),
        event.getClientEmail()
    );
  }

  @EventListener(AppointmentCancelEvent.class)
  public void appointmentCancel(AppointmentCancelEvent event) {
    appointmentMailService.sendAppointmentCancelMail(
        event.getServiceName(),
        event.getClientName(),
        event.getEmployeeName(),
        event.getClientEmail()
    );
  }
}

