package prime.flow.infrastructure.exceptions;

import lombok.Getter;

@Getter
public class ResourceNotFoundException extends RuntimeException {

  private final String title;

  public ResourceNotFoundException(String message, String title) {
    super(message);
    this.title = title;
  }

}
