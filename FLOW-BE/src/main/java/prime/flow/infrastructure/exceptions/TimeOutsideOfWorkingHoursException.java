package prime.flow.infrastructure.exceptions;

public class TimeOutsideOfWorkingHoursException extends RuntimeException {

  public TimeOutsideOfWorkingHoursException(String message) {
    super(message);
  }
}
