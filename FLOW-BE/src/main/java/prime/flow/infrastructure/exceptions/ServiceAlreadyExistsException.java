package prime.flow.infrastructure.exceptions;

public class ServiceAlreadyExistsException extends RuntimeException {

  public ServiceAlreadyExistsException(String message) {
    super(message);
  }
}
