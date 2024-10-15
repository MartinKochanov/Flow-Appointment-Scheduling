package prime.flow.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import prime.flow.domain.user.validation.PhoneNumber;
import prime.flow.domain.user.validation.UniqueEmail;
import prime.flow.domain.user.validation.ValidPassword;

public record RequestUserDTO(
    @NotBlank(message = "First name is required")
    String firstName,

    @NotBlank(message = "Last name is required")
    String lastName,

    @UniqueEmail
    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    String email,

    @NotBlank(message = "Password is required")
    @ValidPassword
    String password,

    @PhoneNumber
    String phone
) {

}
