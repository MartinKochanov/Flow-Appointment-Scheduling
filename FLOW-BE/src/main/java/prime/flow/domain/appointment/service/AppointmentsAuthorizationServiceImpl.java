package prime.flow.domain.appointment.service;

import static prime.flow.infrastructure.security.util.UserServiceUtil.extractAuthenticatedUser;
import static prime.flow.infrastructure.security.util.UserServiceUtil.isOwnerOrAdmin;

import org.springframework.stereotype.Component;
import prime.flow.domain.user.entity.User;

@Component(value = "appointmentsAuthorizationService")
public class AppointmentsAuthorizationServiceImpl implements
    AppointmentsAuthorizationService {

  @Override
  public boolean authorizeAccessToOwnAppointments(Long requestedUserId) {

    User authenticatedUser = extractAuthenticatedUser();
    return isOwnerOrAdmin(authenticatedUser, requestedUserId);
  }
}
