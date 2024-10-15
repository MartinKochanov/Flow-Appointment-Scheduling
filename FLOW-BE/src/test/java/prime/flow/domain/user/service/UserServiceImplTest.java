package prime.flow.domain.user.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import prime.flow.domain.service.entity.Service;
import prime.flow.domain.service.service.ServiceService;
import prime.flow.domain.user.dto.RequestEmployeeDTO;
import prime.flow.domain.user.dto.RequestUserDTO;
import prime.flow.domain.user.dto.ResponseEmployeeDTO;
import prime.flow.domain.user.dto.ResponseUserDTO;
import prime.flow.domain.user.dto.UpdateEmployeeDTO;
import prime.flow.domain.user.dto.UpdateUserDTO;
import prime.flow.domain.user.entity.Employee;
import prime.flow.domain.user.entity.User;
import prime.flow.domain.user.enums.Role;
import prime.flow.domain.user.repository.UserRepository;
import prime.flow.infrastructure.events.StaffMemberRegistrationEvent;
import prime.flow.infrastructure.exceptions.ResourceNotFoundException;
import prime.flow.infrastructure.mapper.UserMapper;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

  public static final Role USER_ROLE = Role.USER;
  public static final Pageable PAGEABLE = PageRequest.of(0, 10);
  public static final Role EMPLOYEE_ROLE = Role.EMPLOYEE;
  private static final String defaultPassword = "defaultPass123";
  private static final String startTime = "09:00";
  private static final String endTime = "17:00";
  private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm");
  public static final String ENCODED_PASSWORD = "encodedPassword";
  @Mock
  private UserMapper userMapper;
  @Mock
  private UserRepository userRepository;
  @Mock
  private PasswordEncoder passwordEncoder;
  @Mock
  private ServiceService serviceService;
  @Mock
  private ApplicationEventPublisher applicationEventPublisher;
  @InjectMocks
  private UserServiceImpl userService;

  @BeforeEach
  public void setup() {
    ReflectionTestUtils.setField(userService, "startTime", "09:00");
    ReflectionTestUtils.setField(userService, "endTime", "17:00");
    ReflectionTestUtils.setField(userService, "defaultPassword",
        defaultPassword);
  }

  @Test
  public void get_ReturnsValidUser_WithValidId() {
    Long validId = 1L;

    User user = mock(User.class);
    ResponseUserDTO expected = mock(ResponseUserDTO.class);

    when(userRepository.findById(validId)).thenReturn(Optional.of(user));
    when(userMapper.toResponse(user)).thenReturn(expected);

    ResponseUserDTO result = userService.get(validId);

    Assertions.assertEquals(expected, result, "Result mismatch");
  }

  @Test
  public void get_ThrowsResourceNotFoundException_WithInvalidId() {
    Long invalidId = 0L;

    when(userRepository.findById(invalidId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> userService.get(invalidId));
  }

  @Test
  public void get_ReturnsListOfUsers_WithUserRoleAndPageable() {
    User user = mock(User.class);
    ResponseUserDTO expected = mock(ResponseUserDTO.class);

    Page<User> userPage = new PageImpl<>(List.of(user));
    when(userRepository.findByRole(USER_ROLE, PAGEABLE)).thenReturn(userPage).thenReturn(userPage);
    when(userMapper.toResponse(user)).thenReturn(expected);

    Page<ResponseUserDTO> result = userService.get(USER_ROLE, PAGEABLE);

    Assertions.assertEquals(1, result.getTotalElements(), "Total elements mismatch");
    Assertions.assertEquals(expected, result.getContent().getFirst(), "Content mismatch");
  }

  @Test
  public void getEmployees_ReturnsValidPageOfEmployees_WithValidRoleAndPageable() {

    Employee user = mock(Employee.class);
    ResponseEmployeeDTO responseEmployeeDTO = mock(ResponseEmployeeDTO.class);

    Page<User> employeesPage = new PageImpl<>(List.of(user));
    when(userRepository.findByRole(EMPLOYEE_ROLE, PAGEABLE)).thenReturn(employeesPage);
    when(userMapper.toEmployeeResponse(user)).thenReturn(responseEmployeeDTO);

    Page<ResponseEmployeeDTO> result = userService.getEmployees(EMPLOYEE_ROLE, PAGEABLE);

    Assertions.assertEquals(1, result.getTotalElements(), "Total elements mismatch");
    Assertions.assertEquals(responseEmployeeDTO, result.getContent().getFirst(),
        "Employee content mismatch");
  }

  @Test
  public void get_ReturnsValidEmployee_WithValidId() {
    Long validId = 1L;

    Employee employee = mock(Employee.class);
    ResponseEmployeeDTO expected = mock(ResponseEmployeeDTO.class);

    when(userRepository.findByIdWithServices(validId)).thenReturn(Optional.of(employee));
    when(userMapper.toEmployeeResponse(employee)).thenReturn(expected);

    ResponseEmployeeDTO result = userService.getEmployee(validId);

    Assertions.assertEquals(expected, result, "Result mismatch");
  }

  @Test
  public void get_ThrowsResourceNotFoundException_WhenInvalidId() {
    Long invalidId = 0L;

    when(userRepository.findByIdWithServices(invalidId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class,
        () -> userService.getEmployee(invalidId));
  }

  @Test
  public void create_ReturnsResponseEmployeeDTO_WithValidInput() {

    RequestEmployeeDTO dto = mock(RequestEmployeeDTO.class);
    Employee employee = mock(Employee.class);
    ResponseEmployeeDTO expected = mock(ResponseEmployeeDTO.class);
    List<Service> services = List.of(mock(Service.class));

    when(userMapper.toEmployee(dto)).thenReturn(employee);
    when(serviceService.getServices(dto.serviceIds())).thenReturn(services);
    when(passwordEncoder.encode(defaultPassword)).thenReturn(ENCODED_PASSWORD);
    when(userRepository.save(employee)).thenReturn(employee);
    when(userMapper.toEmployeeResponse(employee)).thenReturn(expected);

    when(dto.firstName()).thenReturn("John");
    when(dto.email()).thenReturn("john.doe@example.com");

    ResponseEmployeeDTO result = userService.create(dto);

    verify(employee).setServices(services);
    verify(employee).setRole(EMPLOYEE_ROLE);
    verify(employee).setWorkStartTime(LocalTime.parse(startTime, dateTimeFormatter));
    verify(employee).setWorkEndTime(LocalTime.parse(endTime, dateTimeFormatter));
    verify(employee).setPassword(ENCODED_PASSWORD);
    verify(userRepository).save(employee);

    verify(applicationEventPublisher).publishEvent(any(StaffMemberRegistrationEvent.class));

    Assertions.assertEquals(expected, result);
  }

  @Test
  void whenServiceIdsListIsNull_thenThrowsResourceNotFoundException() {

    RequestEmployeeDTO dto = mock(RequestEmployeeDTO.class);

    Employee mockEmployee = new Employee();
    when(userMapper.toEmployee(dto)).thenReturn(mockEmployee);

    when(serviceService.getServices(dto.serviceIds()))
        .thenThrow(new ResourceNotFoundException("Service/s not found", "Service not found"));

    ResourceNotFoundException thrownException = assertThrows(
        ResourceNotFoundException.class,
        () -> userService.create(dto),
        "Expected create() to throw ResourceNotFoundException, but it didn't"
    );

    Assertions.assertEquals("Service/s not found", thrownException.getMessage());

    verify(userMapper, times(1)).toEmployee(any());
    verify(userRepository, times(0)).save(any());
    verify(applicationEventPublisher, times(0)).publishEvent(any());
  }

  @Test
  public void create_ReturnsUserDTO_whenValidRequest() {
    RequestUserDTO dto = mock(RequestUserDTO.class);
    User user = mock(User.class);
    ResponseUserDTO expected = mock(ResponseUserDTO.class);

    when(userMapper.toUser(dto)).thenReturn(user);
    when(passwordEncoder.encode(dto.password())).thenReturn(ENCODED_PASSWORD);
    when(userMapper.toResponse(user)).thenReturn(expected);

    ResponseUserDTO result = userService.create(dto);

    verify(userRepository).save(user);
    Assertions.assertEquals(expected, result);
  }

  @Test
  void update_ReturnsUserDTO_whenValidId() {
    Long validId = 1L;
    User user = mock(User.class);
    User updatedUser = mock(User.class);
    UpdateUserDTO updateUserDTO = mock(UpdateUserDTO.class);
    ResponseUserDTO expected = mock(ResponseUserDTO.class);

    when(userRepository.findById(validId)).thenReturn(Optional.of(user));
    when(userRepository.save(user)).thenReturn(updatedUser);
    when(userMapper.toResponse(updatedUser)).thenReturn(expected);

    ResponseUserDTO result = userService.update(validId, updateUserDTO);

    verify(userMapper).mapUpdatesToEntity(updateUserDTO, user);
    verify(userRepository).save(user);
    Assertions.assertEquals(expected, result);
  }

  @Test
  void update_ThrowsResourceNotFoundException_whenInvalidId() {
    Long invalidId = 0L;
    UpdateUserDTO dto = mock(UpdateUserDTO.class);

    when(userRepository.findById(invalidId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> userService.update(invalidId, dto));
  }

  @Test
  void update_ReturnsEmployeeDTO_WhenValidId() {
    Long validId = 1L;
    UpdateEmployeeDTO dto = mock(UpdateEmployeeDTO.class);
    Employee employee = mock(Employee.class);
    List<Service> services = List.of(mock(Service.class));
    Employee updatedEmployee = mock(Employee.class);
    ResponseEmployeeDTO expected = mock(ResponseEmployeeDTO.class);

    when(userRepository.findById(validId)).thenReturn(Optional.of(employee));
    when(serviceService.getServices(dto.serviceIds())).thenReturn(services);
    when(userRepository.save(employee)).thenReturn(updatedEmployee);
    when(userMapper.toEmployeeResponse(updatedEmployee)).thenReturn(expected);

    ResponseEmployeeDTO result = userService.update(validId, dto);

    verify(userMapper).mapUpdatesToEntity(dto, employee);
    verify(userRepository).save(employee);
    Assertions.assertEquals(expected, result);
  }

  @Test
  void update_ThrowsResourceNotFoundException_WhenInvalidId() {
    Long invalidId = 0L;
    UpdateEmployeeDTO updateEmployeeDTO = mock(UpdateEmployeeDTO.class);

    when(userRepository.findById(invalidId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () ->
        userService.update(invalidId, updateEmployeeDTO)
    );
  }

  @Test
  void update_ThrowsResourceNotFoundException_WhenInvalidServiceIds() {
    Long userId = 1L;
    UpdateEmployeeDTO updateEmployeeDTO = mock(UpdateEmployeeDTO.class);
    Employee existingUser = mock(Employee.class);

    when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
    when(serviceService.getServices(updateEmployeeDTO.serviceIds()))
        .thenThrow(new ResourceNotFoundException("Service/s not found", "Service not found"));

    assertThrows(ResourceNotFoundException.class,
        () -> userService.update(userId, updateEmployeeDTO));
  }

  @Test
  void delete_DeletesUser_WhenValidId() {
    Long validId = 1L;

    when(userRepository.existsById(validId)).thenReturn(true);

    userService.delete(validId);

    verify(userRepository).existsById(validId);
    verify(userRepository).deleteById(validId);
  }

  @Test
  void delete_ThrowsResourceNotFoundException_WhenUserDoesNotExist() {
    Long invalidId = 0L;

    when(userRepository.existsById(invalidId)).thenReturn(false);

    ResourceNotFoundException thrownException = Assertions.assertThrows(
        ResourceNotFoundException.class,
        () -> userService.delete(invalidId),
        "Expected delete() to throw ResourceNotFoundException"
    );

    Assertions.assertEquals("User with id " + invalidId + " not found",
        thrownException.getMessage());

    verify(userRepository).existsById(invalidId);
    verify(userRepository, never()).deleteById(invalidId);
  }

}