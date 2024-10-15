package prime.flow.infrastructure.security.service;

import prime.flow.domain.user.dto.AuthenticatedUserDTO;
import prime.flow.infrastructure.security.dto.AuthenticationRequest;
import prime.flow.infrastructure.security.dto.AuthenticationResponse;

public interface AuthenticationService {

  AuthenticationResponse authenticate(AuthenticationRequest request);

  AuthenticatedUserDTO getAuthenticatedUser();
}
