package prime.flow.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import prime.flow.domain.user.validation.PhoneNumber;

public record UpdateEmployeeDTO(
    @NotBlank(message = "First name is required")
    String firstName,

    @NotBlank(message = "Last name is required")
    String lastName,

    @PhoneNumber
    String phone,

    @NotNull(message = "Service required")
    List<Long> serviceIds
) {

}
