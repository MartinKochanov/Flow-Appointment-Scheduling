package prime.flow.domain.user.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = UniqueEmailConstraintValidator.class)
public @interface UniqueEmail {

  String message() default "The email already exist!";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
