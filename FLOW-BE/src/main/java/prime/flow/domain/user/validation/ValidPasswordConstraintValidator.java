package prime.flow.domain.user.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.passay.*;
import java.util.Arrays;

public class ValidPasswordConstraintValidator implements
    ConstraintValidator<ValidPassword, String> {

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {

    if (value != null) {
      PasswordValidator validator = new PasswordValidator(
          Arrays.asList(
              new LengthRule(8, 20),
              new CharacterRule(EnglishCharacterData.UpperCase, 1),
              new CharacterRule(EnglishCharacterData.LowerCase, 1),
              new CharacterRule(EnglishCharacterData.Digit, 1),
              new CharacterRule(EnglishCharacterData.Special, 1),
              new WhitespaceRule()
          )
      );

      RuleResult result = validator.validate(new PasswordData(value));

      if (result.isValid()) {
        return true;
      }

      context.buildConstraintViolationWithTemplate(
              validator.getMessages(result)
                  .stream().findFirst().get())
          .addConstraintViolation()
          .disableDefaultConstraintViolation();
    }
    return false;
  }
}
