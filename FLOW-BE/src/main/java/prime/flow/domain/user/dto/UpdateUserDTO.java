package prime.flow.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import prime.flow.domain.user.validation.PhoneNumber;

public record UpdateUserDTO(
    @NotBlank(message = "First name is required")
    String firstName,

    @NotBlank(message = "Last name is required")
    String lastName,

    @PhoneNumber
    String phone
) {

}
