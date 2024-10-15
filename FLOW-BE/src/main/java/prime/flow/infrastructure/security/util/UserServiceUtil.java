package prime.flow.infrastructure.security.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import prime.flow.domain.user.entity.User;
import prime.flow.domain.user.enums.Role;

public class UserServiceUtil {

  public static User extractAuthenticatedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (User) authentication.getPrincipal();
  }

  public static SimpleGrantedAuthority getAuthority(Role role) {
    return new SimpleGrantedAuthority("ROLE_" + role.name());
  }

  public static boolean isOwnerOrAdmin(User authenticatedUser, Long id) {
    return authenticatedUser.getId().equals(id)
        || authenticatedUser.getAuthorities().contains(getAuthority(Role.ADMIN));
  }
}
