package prime.flow.domain.user.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import prime.flow.domain.user.repository.UserRepository;

public class UniqueEmailConstraintValidator implements ConstraintValidator<UniqueEmail, String> {

  private final UserRepository userRepository;

  public UniqueEmailConstraintValidator(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return !userRepository.existsByEmail(value);
  }
}
