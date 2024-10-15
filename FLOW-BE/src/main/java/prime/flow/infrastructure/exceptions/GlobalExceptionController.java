package prime.flow.infrastructure.exceptions;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionController {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ProblemDetail resourceNotFound(ResourceNotFoundException e) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND,
        e.getMessage());
    problemDetail.setTitle(e.getTitle());

    return problemDetail;
  }

  @ExceptionHandler(ServiceAlreadyExistsException.class)
  public ProblemDetail serviceExists(ServiceAlreadyExistsException e) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Service exists");

    return problemDetail;
  }

  @ExceptionHandler(TimeOutsideOfWorkingHoursException.class)
  public ProblemDetail timeOutOfBounds(TimeOutsideOfWorkingHoursException e) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Working time out of bounds");

    return problemDetail;
  }

  @ExceptionHandler(UnavailableTimeSLotException.class)
  public ProblemDetail unavailableTimeSlot(UnavailableTimeSLotException e) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Unavailable time slot");

    return problemDetail;
  }

  @ExceptionHandler(InvalidDateException.class)
  public ProblemDetail invalidDate(InvalidDateException e) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Invalid date");

    return problemDetail;
  }

  @ExceptionHandler(InvalidClientException.class)
  public ProblemDetail argumentExceptions(InvalidClientException e) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
  }

  @ExceptionHandler(InvalidEmployeeException.class)
  public ProblemDetail argumentExceptions(InvalidEmployeeException e) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions(
      MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage()));

    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(CreateStaffMailException.class)
  public ProblemDetail createStaffMailFailed(CreateStaffMailException e) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Email delivery failed");

    return problemDetail;
  }

  @ExceptionHandler(ScheduleAppointmentMailException.class)
  public ProblemDetail scheduleAppointmentMailFailed(ScheduleAppointmentMailException e) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Email delivery failed");

    return problemDetail;
  }

  @ExceptionHandler(CancelAppointmentMailException.class)
  public ProblemDetail cancelAppointmentMailFailed(CancelAppointmentMailException e) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
        e.getMessage());
    problemDetail.setTitle("Email delivery failed");

    return problemDetail;
  }
}