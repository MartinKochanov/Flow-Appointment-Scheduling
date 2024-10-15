package prime.flow.domain.service.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = UniqueServiceConstraintValidator.class)
public @interface UniqueService {

  String message() default "Service already exists";

  Class<?>[]groups() default {};

  Class<? extends Payload>[] payload() default {};
}
