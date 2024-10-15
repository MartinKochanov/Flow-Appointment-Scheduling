package prime.flow.domain.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.Duration;

public record RequestEditServiceDTO(
    @NotNull
    @Positive(message = "Id can't be negative or zero")
    Long id,

    @NotBlank(message = "Name is required")
    @Size(min = 2, message = "Name must be at least 2 characters long")
    String name,

    @NotBlank(message = "Description is required")
    @Size(min = 10, message = "Description must be at lest 10 characters long")
    String description,

    @NotNull(message = "Duration is required")
    Duration duration,

    @NotNull(message = "Price is required")
    @Positive(message = "Price can't be negative or zero")
    BigDecimal price

) {

}
