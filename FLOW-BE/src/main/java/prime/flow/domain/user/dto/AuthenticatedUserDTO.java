package prime.flow.domain.user.dto;

import prime.flow.domain.user.enums.Role;

public record AuthenticatedUserDTO(
    Long id,
    String firstName,
    String lastName,
    String email,
    Role role,
    String phone
) {

}
