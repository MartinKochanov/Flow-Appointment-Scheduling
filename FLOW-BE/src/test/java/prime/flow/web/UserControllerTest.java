package prime.flow.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import prime.flow.domain.user.dto.ResponseUserDTO;
import prime.flow.domain.user.entity.User;
import prime.flow.domain.user.repository.UserRepository;
import prime.flow.infrastructure.security.service.JwtService;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
class UserControllerIT {

  private static final String ADMIN_EMAIL = "admin@test.com";
  private static final String EMPLOYEE_EMAIL = "emma.brown@example.com";
  private static final String CLIENT_EMAIL = "frankie.wright@example.com";

  @Container
  @ServiceConnection
  public static MySQLContainer<?> mySQLContainer = new MySQLContainer<>("mysql:8.4.2");

  @Autowired
  public JwtService jwtService;

  @Autowired
  public MockMvc mockMvc;

  @Autowired
  public UserRepository userRepository;

  @Autowired
  public ObjectMapper objectMapper;

  @Test
  public void get_ReturnsValidUser_WhenValidIdAndUserRoleAdmin() throws Exception {

    User admin = userRepository.findByEmail(ADMIN_EMAIL)
        .orElseThrow(() -> new IllegalArgumentException("No seeded data"));

    ResponseUserDTO expectedResult = new ResponseUserDTO(admin.getId(), admin.getFirstName(),
        admin.getLastName(), admin.getEmail(), admin.getPhone());

//    mockMvc.perform(get("/api/v1/users/" + admin.getId())
//            .header("Authorization", generateBarrierAuthHeader(ADMIN_EMAIL)))
//        .andExpect(status().isOk())
//        .andExpect(jsonPath("$.id").value(admin.getId()))
//        .andExpect(jsonPath("$.firstName").value(admin.getFirstName()))
//        .andExpect(jsonPath("$.lastName").value(admin.getLastName()))
//        .andExpect(jsonPath("$.email").value(admin.getEmail()))
//        .andExpect(jsonPath("$.phone").value(admin.getPhone()));

    MvcResult result = mockMvc.perform(get("/api/v1/users/" + admin.getId())
            .header("Authorization", generateBarrierAuthHeader(ADMIN_EMAIL)))
        .andExpect(status().isOk())
        .andReturn();

    String jsonResponse = result.getResponse().getContentAsString();
    ResponseUserDTO actualUserView = objectMapper.readValue(jsonResponse, ResponseUserDTO.class);

    Assertions.assertEquals(expectedResult, actualUserView);
  }


  private String generateBarrierAuthHeader(String userEmail) {
    String token = jwtService.generateToken(userEmail);
    return "Bearer " + token;
  }
}