package prime.flow.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import prime.flow.domain.user.dto.AuthenticatedUserDTO;
import prime.flow.infrastructure.security.dto.AuthenticationRequest;
import prime.flow.infrastructure.security.dto.AuthenticationResponse;
import prime.flow.infrastructure.security.service.AuthenticationService;
import prime.flow.infrastructure.swagger.AuthControllerDocumentation;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController implements AuthControllerDocumentation {

  private final AuthenticationService authService;

  public AuthController(AuthenticationService authService) {
    this.authService = authService;
  }

  @Override
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {
    AuthenticationResponse auth = authService.authenticate(request);
    return ResponseEntity.ok(auth);
  }

  @Override
  @GetMapping("/me")
  public ResponseEntity<AuthenticatedUserDTO> me() {
    AuthenticatedUserDTO authenticatedUser = authService.getAuthenticatedUser();
    return ResponseEntity.ok(authenticatedUser);
  }
}
