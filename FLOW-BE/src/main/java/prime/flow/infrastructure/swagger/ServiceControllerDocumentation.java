package prime.flow.infrastructure.swagger;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import prime.flow.domain.service.dto.RequestEditServiceDTO;
import prime.flow.domain.service.dto.RequestServiceDTO;
import prime.flow.domain.service.dto.ResponseServiceDTO;

public interface ServiceControllerDocumentation {

  @Operation(
      summary = "Retrieve a paginated list of services",
      description = "This endpoint returns a paginated list of services available in the system.",
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Successfully retrieved list of services",
              content = @Content(
                  mediaType = "application/json"
              )
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<Page<ResponseServiceDTO>> get(Pageable pageable);

  @Operation(
      summary = "Retrieve a service by its ID",
      description = "Fetches the details of a specific service using its unique ID.",
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Service found",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseServiceDTO.class)
              )
          ),
          @ApiResponse(
              responseCode = "404",
              description = "Service not found"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<ResponseServiceDTO> get(Long id);

  @Operation(
      summary = "Create a new service",
      description = "Creates a new service with the provided details. Requires ADMIN role.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "201",
              description = "Service successfully created",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseServiceDTO.class)
              )
          ),
          @ApiResponse(
              responseCode = "400",
              description = "Invalid input provided"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<ResponseServiceDTO> create(RequestServiceDTO dto);

  @Operation(
      summary = "Update an existing service",
      description = "Updates the details of an existing service identified by its ID. Requires ADMIN role.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Service successfully updated",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseServiceDTO.class)
              )
          ),
          @ApiResponse(
              responseCode = "400",
              description = "Invalid input provided"
          ),
          @ApiResponse(
              responseCode = "404",
              description = "Service not found"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<ResponseServiceDTO> update(Long id, RequestEditServiceDTO dto);

  @Operation(
      summary = "Delete a service",
      description = "Deletes a service identified by its ID. Requires ADMIN role.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "204",
              description = "Service successfully deleted"
          ),
          @ApiResponse(
              responseCode = "404",
              description = "Service not found"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  void delete(Long id);
}
