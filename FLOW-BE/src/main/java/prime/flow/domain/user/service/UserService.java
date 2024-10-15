package prime.flow.domain.user.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import prime.flow.domain.user.dto.RequestEmployeeDTO;
import prime.flow.domain.user.dto.RequestUserDTO;
import prime.flow.domain.user.dto.ResponseEmployeeDTO;
import prime.flow.domain.user.dto.ResponseUserDTO;
import prime.flow.domain.user.dto.UpdateEmployeeDTO;
import prime.flow.domain.user.dto.UpdateUserDTO;
import prime.flow.domain.user.entity.User;
import prime.flow.domain.user.enums.Role;

public interface UserService {

  Page<ResponseUserDTO> get(Role user, Pageable pageable);

  Page<ResponseEmployeeDTO> getEmployees(Role role, Pageable pageable);

  ResponseUserDTO get(Long id);

  ResponseEmployeeDTO getEmployee(Long id);

  ResponseUserDTO create(RequestUserDTO dto);

  ResponseEmployeeDTO create(RequestEmployeeDTO dto);

  ResponseUserDTO update(Long id, UpdateUserDTO dto);

  ResponseEmployeeDTO update(Long id, UpdateEmployeeDTO dto);

  void delete(Long id);

   User getUser(Long id);
}
