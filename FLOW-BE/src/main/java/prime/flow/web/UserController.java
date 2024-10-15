package prime.flow.web;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import prime.flow.domain.user.dto.RequestEmployeeDTO;
import prime.flow.domain.user.dto.RequestUserDTO;
import prime.flow.domain.user.dto.ResponseEmployeeDTO;
import prime.flow.domain.user.dto.ResponseUserDTO;
import prime.flow.domain.user.dto.UpdateEmployeeDTO;
import prime.flow.domain.user.dto.UpdateUserDTO;
import prime.flow.domain.user.enums.Role;
import prime.flow.domain.user.service.UserService;
import prime.flow.infrastructure.swagger.UserControllerDocumentation;

@RestController
@RequestMapping("/api/v1/users")
public class UserController implements UserControllerDocumentation {

  public static final String EMPLOYEES = "/employees";
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @Override
  @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
  @GetMapping()
  public ResponseEntity<Page<ResponseUserDTO>> get(Pageable pageable) {
    Page<ResponseUserDTO> response = userService.get(Role.USER, pageable);
    return ResponseEntity.ok(response);
  }

  @Override
  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping(EMPLOYEES)
  public ResponseEntity<Page<ResponseEmployeeDTO>> getEmployees(Pageable pageable) {
    Page<ResponseEmployeeDTO> response = userService.getEmployees(Role.EMPLOYEE, pageable);
    return ResponseEntity.ok(response);
  }

  @Override
  @PreAuthorize("@userAuthorizationService.authorizeAccessToUser(#id)")
  @GetMapping("/{id}")
  public ResponseEntity<ResponseUserDTO> get(@PathVariable Long id) {
    ResponseUserDTO response = userService.get(id);
    return ResponseEntity.ok(response);
  }

  @Override
  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping(EMPLOYEES + "/{id}")
  public ResponseEntity<ResponseEmployeeDTO> getEmployee(@PathVariable Long id) {
    ResponseEmployeeDTO response = userService.getEmployee(id);
    return ResponseEntity.ok(response);
  }

  @Override
  @PostMapping
  public ResponseEntity<ResponseUserDTO> create(@Valid @RequestBody RequestUserDTO dto) {
    ResponseUserDTO response = userService.create(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @Override
  @PostMapping(EMPLOYEES)
  public ResponseEntity<ResponseEmployeeDTO> create(@Valid @RequestBody RequestEmployeeDTO dto) {
    ResponseEmployeeDTO response = userService.create(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @Override
  @PreAuthorize("@userAuthorizationService.authorizeAccessToUpdateUser(#id)")
  @PatchMapping("/{id}")
  public ResponseEntity<ResponseUserDTO> update(@PathVariable Long id,
      @Valid @RequestBody UpdateUserDTO dto) {
    ResponseUserDTO response = userService.update(id, dto);
    return ResponseEntity.ok(response);
  }

  @Override
  @PreAuthorize("hasRole('ADMIN')")
  @PatchMapping(EMPLOYEES + "/{id}")
  public ResponseEntity<ResponseEmployeeDTO> update(@PathVariable Long id,
      @Valid @RequestBody UpdateEmployeeDTO dto) {
    ResponseEmployeeDTO response = userService.update(id, dto);
    return ResponseEntity.ok(response);
  }

  @Override
  @DeleteMapping("/{id}")
  @PreAuthorize("@userAuthorizationService.authorizeAccessToDeleteUser(#id)")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    userService.delete(id);
  }
}
