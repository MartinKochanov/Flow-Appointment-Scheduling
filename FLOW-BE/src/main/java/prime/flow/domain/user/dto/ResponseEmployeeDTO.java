package prime.flow.domain.user.dto;

import java.util.List;
import prime.flow.domain.service.dto.ResponseServiceDTO;
import prime.flow.domain.user.enums.Role;

public record ResponseEmployeeDTO(
    Long id,
    String firstName,
    String lastName,
    String email,
    String phone,
    Role role,
    List<ResponseServiceDTO> services
) {

}
