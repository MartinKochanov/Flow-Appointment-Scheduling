package prime.flow.infrastructure.security.dto;

public record AuthenticationRequest(
    String email,
    String password
) {

}
