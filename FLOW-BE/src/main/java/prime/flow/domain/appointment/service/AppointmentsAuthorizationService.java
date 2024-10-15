package prime.flow.domain.appointment.service;


public interface AppointmentsAuthorizationService {

  boolean authorizeAccessToOwnAppointments(Long requestedUserId);
}
