package prime.flow.domain.service.service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import prime.flow.domain.service.dto.RequestEditServiceDTO;
import prime.flow.domain.service.dto.RequestServiceDTO;
import prime.flow.domain.service.dto.ResponseServiceDTO;
import prime.flow.domain.service.entity.Service;

public interface ServiceService {

  Page<ResponseServiceDTO> get(Pageable pageable);

  ResponseServiceDTO get(Long id);

  ResponseServiceDTO create(RequestServiceDTO dto);

  ResponseServiceDTO update(Long id, RequestEditServiceDTO dto);

  void delete(Long id);

  Service getService(Long id);

  List<Service> getServices(List<Long> ids);
}
