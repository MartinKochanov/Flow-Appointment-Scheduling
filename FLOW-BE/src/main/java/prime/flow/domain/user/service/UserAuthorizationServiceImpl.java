package prime.flow.domain.user.service;

import static prime.flow.infrastructure.security.util.UserServiceUtil.extractAuthenticatedUser;
import static prime.flow.infrastructure.security.util.UserServiceUtil.getAuthority;
import static prime.flow.infrastructure.security.util.UserServiceUtil.isOwnerOrAdmin;

import org.springframework.stereotype.Component;
import prime.flow.domain.user.entity.User;
import prime.flow.domain.user.enums.Role;
import prime.flow.domain.user.repository.UserRepository;
import prime.flow.infrastructure.exceptions.ResourceNotFoundException;

@Component(value = "userAuthorizationService")
public class UserAuthorizationServiceImpl implements UserAuthorizationService {

  private final UserRepository userRepository;

  public UserAuthorizationServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public boolean authorizeAccessToUser(Long requestedUserId) {
    User authenticatedUser = extractAuthenticatedUser();

    User user = userRepository.findById(requestedUserId).orElseThrow(
        () -> new ResourceNotFoundException("User with id " + requestedUserId + " not found", "User not found"));

    if (!authenticatedUser.getAuthorities().contains(getAuthority(Role.ADMIN))
        && user.getAuthorities().contains(getAuthority(Role.ADMIN))) {
      return false;
    }

    return authenticatedUser.getId().equals(requestedUserId) || (
        authenticatedUser.getAuthorities().contains(getAuthority(Role.ADMIN))
            || authenticatedUser.getAuthorities().contains(getAuthority(Role.EMPLOYEE))
    );
  }

  @Override
  public boolean authorizeAccessToUpdateUser(Long requestedUserId) {

    User authenticatedUser = extractAuthenticatedUser();
    return isOwnerOrAdmin(authenticatedUser, requestedUserId);
  }

  @Override
  public boolean authorizeAccessToDeleteUser(Long requestedUserId) {

    User authenticatedUser = extractAuthenticatedUser();
    return isOwnerOrAdmin(authenticatedUser, requestedUserId);
  }
}
