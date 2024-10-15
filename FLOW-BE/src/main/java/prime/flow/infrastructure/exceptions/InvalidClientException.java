package prime.flow.infrastructure.exceptions;

public class InvalidClientException extends RuntimeException {

  public InvalidClientException(String message) {
    super(message);
  }
}
