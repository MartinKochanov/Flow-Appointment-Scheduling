package prime.flow.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import prime.flow.domain.user.dto.AuthenticatedUserDTO;
import prime.flow.domain.user.dto.UpdateEmployeeDTO;
import prime.flow.domain.user.dto.RequestUserDTO;
import prime.flow.domain.user.dto.RequestEmployeeDTO;
import prime.flow.domain.user.dto.ResponseUserDTO;
import prime.flow.domain.user.dto.ResponseEmployeeDTO;
import prime.flow.domain.user.dto.UpdateUserDTO;
import prime.flow.domain.user.entity.Employee;
import prime.flow.domain.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

  @Mapping(target = "email", source = "username")
  ResponseUserDTO toResponse(User user);

  @Mapping(target = "email", source = "username")
  ResponseEmployeeDTO toEmployeeResponse(Employee employee);

  @Mapping(target = "email", source = "username")
  AuthenticatedUserDTO toAuthenticatedUserResponse(User user);

  @Mapping(target = "id", ignore = true)
  User toUser(RequestUserDTO requestUserDTO);

  @Mapping(target = "id", ignore = true)
  Employee toEmployee(RequestEmployeeDTO requestUserEmployeeDTO);

  void mapUpdatesToEntity(UpdateUserDTO dto, @MappingTarget User entity);

  @Mapping(target = "services", ignore = true)
  void mapUpdatesToEntity(UpdateEmployeeDTO dto, @MappingTarget Employee employee);
}
