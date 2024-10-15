package prime.flow.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import prime.flow.domain.user.validation.PhoneNumber;
import prime.flow.domain.user.validation.UniqueEmail;

public record RequestEmployeeDTO(
    @NotBlank(message = "First name is required")
    String firstName,

    @NotBlank(message = "Last name is required")
    String lastName,

    @UniqueEmail
    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    String email,

    @PhoneNumber
    String phone,

    @NotNull(message = "Service required")
    List<Long> serviceIds
) {

}
