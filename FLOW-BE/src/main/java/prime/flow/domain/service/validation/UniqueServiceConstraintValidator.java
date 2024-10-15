package prime.flow.domain.service.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import prime.flow.domain.service.repository.ServiceRepository;

public class UniqueServiceConstraintValidator implements ConstraintValidator<UniqueService, String> {

  private final ServiceRepository serviceRepository;

  public UniqueServiceConstraintValidator(ServiceRepository serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return !serviceRepository.existsByName(value);
  }
}