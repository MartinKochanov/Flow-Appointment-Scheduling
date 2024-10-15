package prime.flow.domain.user.dto;

public record ResponseUserDTO(
    Long id,
    String firstName,
    String lastName,
    String email,
    String phone
) {

}
