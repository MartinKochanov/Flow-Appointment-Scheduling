package prime.flow.infrastructure.security.service;

import static prime.flow.infrastructure.security.util.UserServiceUtil.extractAuthenticatedUser;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import prime.flow.domain.user.dto.AuthenticatedUserDTO;
import prime.flow.domain.user.entity.User;
import prime.flow.infrastructure.mapper.UserMapper;
import prime.flow.infrastructure.security.dto.AuthenticationRequest;
import prime.flow.infrastructure.security.dto.AuthenticationResponse;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {


  private final JwtService jwtService;

  private final AuthenticationManager authenticationManager;
  private final UserMapper userMapper;

  public AuthenticationServiceImpl(JwtServiceImpl jwtService,
      AuthenticationManager authenticationManager, UserMapper userMapper) {
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
    this.userMapper = userMapper;
  }

  @Override
  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.email(),
            request.password()
        ));
    String token = jwtService.generateToken(request.email());
    return new AuthenticationResponse(token);
  }

  @Override
  public AuthenticatedUserDTO getAuthenticatedUser() {
    User user = extractAuthenticatedUser();
    return userMapper.toAuthenticatedUserResponse(user);
  }
}
