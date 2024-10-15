package prime.flow.domain.service.dto;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;
import prime.flow.domain.user.dto.ResponseUserDTO;

public record ResponseServiceDTO(
    Long id,
    String name,
    String description,
    Duration duration,
    BigDecimal price,
    List<ResponseUserDTO> users
) {

}
