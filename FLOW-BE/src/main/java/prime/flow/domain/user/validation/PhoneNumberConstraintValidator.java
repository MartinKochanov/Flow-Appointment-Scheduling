package prime.flow.domain.user.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneNumberConstraintValidator implements ConstraintValidator<PhoneNumber, String> {

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value != null && !value.trim().isEmpty()) {
      return value.matches("\\d+");
    }
    return true;
  }
}
