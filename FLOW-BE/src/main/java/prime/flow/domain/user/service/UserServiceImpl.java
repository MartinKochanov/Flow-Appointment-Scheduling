package prime.flow.domain.user.service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
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

@org.springframework.stereotype.Service
public class UserServiceImpl implements UserService {

  private final String startTime;
  private final String endTime;
  private final String defaultPassword;
  private final UserMapper userMapper;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final ServiceService serviceService;
  private final ApplicationEventPublisher applicationEventPublisher;
  private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm");

  public UserServiceImpl(
      @Value("${work.startTime}")
      String startTime,
      @Value("${work.endTime}")
      String endTime,
      @Value("${spring.application.default-staff-password}")
      String defaultPassword,
      UserRepository userRepository, UserMapper userMapper,
      PasswordEncoder passwordEncoder, ServiceService serviceService,
      ApplicationEventPublisher applicationEventPublisher
      ) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.userMapper = userMapper;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.serviceService = serviceService;
    this.applicationEventPublisher = applicationEventPublisher;
    this.defaultPassword = defaultPassword;
  }

  @Override
  public Page<ResponseUserDTO> get(Role role, Pageable pageable) {
    return userRepository.findByRole(role, pageable).map(userMapper::toResponse);
  }

  @Override
  public Page<ResponseEmployeeDTO> getEmployees(Role role, Pageable pageable) {
    return userRepository.findByRole(role, pageable).map(user -> (Employee) user)
        .map(userMapper::toEmployeeResponse);
  }

  @Override
  public ResponseUserDTO get(Long id) {
    User user = getUser(id);
    return userMapper.toResponse(user);
  }

  @Override
  public ResponseEmployeeDTO getEmployee(Long id) {
    return userMapper.toEmployeeResponse((Employee)
        getEmployeeWithServices(id));
  }

  @Override
  public ResponseUserDTO create(RequestUserDTO dto) {

    User user = userMapper.toUser(dto);
    user.setRole(Role.USER);
    user.setPassword(passwordEncoder.encode(dto.password()));
    userRepository.save(user);
    return userMapper.toResponse(user);
  }

  @Override
  public ResponseEmployeeDTO create(RequestEmployeeDTO dto) {
    Employee user = userMapper.toEmployee(dto);
    List<Service> services = serviceService.getServices(dto.serviceIds());
    user.setServices(services);
    user.setRole(Role.EMPLOYEE);
    user.setWorkStartTime(LocalTime.parse(startTime, dateTimeFormatter));
    user.setWorkEndTime(LocalTime.parse(endTime, dateTimeFormatter));
    user.setPassword(passwordEncoder.encode(defaultPassword));
    userRepository.save(user);

    applicationEventPublisher.publishEvent(new StaffMemberRegistrationEvent(
        "UserService",
        dto.firstName(),
        dto.email(),
        defaultPassword
    ));

    return userMapper.toEmployeeResponse(user);
  }

  @Override
  public ResponseUserDTO update(Long id, UpdateUserDTO dto) {

    User user = getUser(id);
    userMapper.mapUpdatesToEntity(dto, user);
    User updatedUser = userRepository.save(user);
    return userMapper.toResponse(updatedUser);
  }

  @Override
  public ResponseEmployeeDTO update(Long id, UpdateEmployeeDTO dto) {
    Employee user = (Employee) getUser(id);
    List<Service> service = serviceService.getServices(dto.serviceIds());
    userMapper.mapUpdatesToEntity(dto, user);
    user.setServices(service);
    Employee updatedUser = userRepository.save(user);
    return userMapper.toEmployeeResponse(updatedUser);
  }

  @Override
  public void delete(Long id) {

    boolean exists = userRepository.existsById(id);
    if (!exists) {
      throw new ResourceNotFoundException("User with id " + id + " not found", "User not found");
    }
    userRepository.deleteById(id);
  }

  @Override
  public User getUser(Long id) {
    return userRepository.findById(id).orElseThrow(() ->
        new ResourceNotFoundException("User with id " + id + " not found", "User not found")
    );
  }

  private User getEmployeeWithServices(Long id) {
    return userRepository.findByIdWithServices(id).orElseThrow(() ->
        new ResourceNotFoundException("User with id " + id + " not found", "User not found")
    );
  }
}
