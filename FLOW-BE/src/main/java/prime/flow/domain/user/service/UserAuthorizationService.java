package prime.flow.domain.user.service;

public interface UserAuthorizationService {

  boolean authorizeAccessToUser(Long requestedUserId);

  boolean authorizeAccessToUpdateUser(Long requestedUserId);

  boolean authorizeAccessToDeleteUser(Long requestedUserId);
}
