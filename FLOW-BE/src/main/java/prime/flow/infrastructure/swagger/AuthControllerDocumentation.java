package prime.flow.infrastructure.swagger;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import prime.flow.domain.user.dto.AuthenticatedUserDTO;
import prime.flow.infrastructure.security.dto.AuthenticationRequest;
import prime.flow.infrastructure.security.dto.AuthenticationResponse;

public interface AuthControllerDocumentation {

  @Operation(
      summary = "Authenticate a user",
      description = "Authenticates a user using their email and password, returning a JWT token if successful.",
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Successfully authenticated",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = AuthenticationResponse.class)
              )
          ),
          @ApiResponse(
              responseCode = "400",
              description = "Invalid credentials provided"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request);

  @Operation(
      summary = "Get authenticated user details",
      description = "Returns the details of the currently authenticated user.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Successfully retrieved authenticated user details",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = AuthenticatedUserDTO.class)
              )
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          ),
          @ApiResponse(
              responseCode = "401",
              description = "Unauthorized - Token is missing or invalid"
          )
      }
  )
  ResponseEntity<AuthenticatedUserDTO> me();
}
