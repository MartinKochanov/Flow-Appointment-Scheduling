package prime.flow.infrastructure.exceptions;

public class InvalidEmployeeException extends RuntimeException {

  public InvalidEmployeeException(String message) {
    super(message);
  }
}
