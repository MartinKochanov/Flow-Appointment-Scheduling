package prime.flow;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers
class FlowApplicationTest {

  @Container
  @ServiceConnection
  public static MySQLContainer<?> mySQLContainer = new MySQLContainer<>("mysql:8.4.2");

  @Test
  void main() {
  }
}