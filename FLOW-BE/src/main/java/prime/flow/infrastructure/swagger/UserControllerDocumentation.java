package prime.flow.infrastructure.swagger;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import prime.flow.domain.user.dto.RequestEmployeeDTO;
import prime.flow.domain.user.dto.RequestUserDTO;
import prime.flow.domain.user.dto.ResponseEmployeeDTO;
import prime.flow.domain.user.dto.ResponseUserDTO;
import prime.flow.domain.user.dto.UpdateEmployeeDTO;
import prime.flow.domain.user.dto.UpdateUserDTO;

public interface UserControllerDocumentation {

  @Operation(
      summary = "Retrieve a paginated list of users",
      description = "This endpoint returns a paginated list of users available in the system. Requires ADMIN or EMPLOYEE role.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Successfully retrieved list of users",
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
  ResponseEntity<Page<ResponseUserDTO>> get(Pageable pageable);

  @Operation(
      summary = "Retrieve a paginated list of employees",
      description = "This endpoint returns a paginated list of employees. Requires ADMIN role.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Successfully retrieved list of employees",
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
  ResponseEntity<Page<ResponseEmployeeDTO>> getEmployees(Pageable pageable);

  @Operation(
      summary = "Retrieve a user by their ID",
      description = "Fetches the details of a specific user using their unique ID.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "User found",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseUserDTO.class)
              )
          ),
          @ApiResponse(
              responseCode = "404",
              description = "User not found"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<ResponseUserDTO> get(Long id);

  @Operation(
      summary = "Retrieve an employee by their ID",
      description = "Fetches the details of a specific employee using their unique ID. Requires ADMIN role.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Employee found",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseEmployeeDTO.class)
              )
          ),
          @ApiResponse(
              responseCode = "404",
              description = "Employee not found"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<ResponseEmployeeDTO> getEmployee(Long id);

  @Operation(
      summary = "Create a new user",
      description = "Creates a new user with the provided details.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "201",
              description = "User successfully created",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseUserDTO.class)
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
  ResponseEntity<ResponseUserDTO> create(RequestUserDTO dto);

  @Operation(
      summary = "Create a new employee",
      description = "Creates a new employee with the provided details. Requires ADMIN role.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "201",
              description = "Employee successfully created",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseEmployeeDTO.class)
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
  ResponseEntity<ResponseEmployeeDTO> create(RequestEmployeeDTO dto);

  @Operation(
      summary = "Update a user",
      description = "Updates the details of an existing user identified by their ID.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "User successfully updated",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseUserDTO.class)
              )
          ),
          @ApiResponse(
              responseCode = "400",
              description = "Invalid input provided"
          ),
          @ApiResponse(
              responseCode = "404",
              description = "User not found"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<ResponseUserDTO> update(Long id, UpdateUserDTO dto);

  @Operation(
      summary = "Update an employee",
      description = "Updates the details of an existing employee identified by their ID. Requires ADMIN role.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Employee successfully updated",
              content = @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ResponseEmployeeDTO.class)
              )
          ),
          @ApiResponse(
              responseCode = "400",
              description = "Invalid input provided"
          ),
          @ApiResponse(
              responseCode = "404",
              description = "Employee not found"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  ResponseEntity<ResponseEmployeeDTO> update(Long id, UpdateEmployeeDTO dto);

  @Operation(
      summary = "Delete a user",
      description = "Deletes a user identified by their ID.",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
          @ApiResponse(
              responseCode = "204",
              description = "User successfully deleted"
          ),
          @ApiResponse(
              responseCode = "404",
              description = "User not found"
          ),
          @ApiResponse(
              responseCode = "403",
              description = "Forbidden"
          )
      }
  )
  void delete(Long id);
}
