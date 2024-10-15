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
import prime.flow.domain.service.dto.RequestEditServiceDTO;
import prime.flow.domain.service.dto.RequestServiceDTO;
import prime.flow.domain.service.dto.ResponseServiceDTO;
import prime.flow.domain.service.service.ServiceService;
import prime.flow.infrastructure.swagger.ServiceControllerDocumentation;

@RestController
@RequestMapping("/api/v1/services")
public class ServiceController implements ServiceControllerDocumentation {

  private final ServiceService serviceService;

  public ServiceController(ServiceService serviceService) {
    this.serviceService = serviceService;
  }

  @GetMapping
  public ResponseEntity<Page<ResponseServiceDTO>> get(Pageable pageable) {
    Page<ResponseServiceDTO> response = serviceService.get(pageable);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ResponseServiceDTO> get(@PathVariable Long id) {
    ResponseServiceDTO response = serviceService.get(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ResponseServiceDTO> create(@Valid @RequestBody RequestServiceDTO dto) {
    ResponseServiceDTO response = serviceService.create(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PatchMapping("/{id}")
  public ResponseEntity<ResponseServiceDTO> update(@PathVariable Long id,
      @Valid @RequestBody RequestEditServiceDTO dto) {
    ResponseServiceDTO response = serviceService.update(id, dto);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    serviceService.delete(id);
  }
}