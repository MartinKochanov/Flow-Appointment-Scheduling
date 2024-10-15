package prime.flow.domain.service.service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import prime.flow.domain.service.dto.RequestEditServiceDTO;
import prime.flow.domain.service.dto.RequestServiceDTO;
import prime.flow.domain.service.dto.ResponseServiceDTO;
import prime.flow.domain.service.entity.Service;
import prime.flow.domain.service.repository.ServiceRepository;
import prime.flow.infrastructure.exceptions.ResourceNotFoundException;
import prime.flow.infrastructure.exceptions.ServiceAlreadyExistsException;
import prime.flow.infrastructure.mapper.ServiceMapper;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

  private final ServiceRepository serviceRepository;
  private final ServiceMapper serviceMapper;

  public ServiceServiceImpl(ServiceRepository serviceRepository, ServiceMapper serviceMapper) {
    this.serviceRepository = serviceRepository;
    this.serviceMapper = serviceMapper;
  }

  @Override
  public Page<ResponseServiceDTO> get(Pageable pageable) {
    return serviceRepository.findAll(pageable).map(serviceMapper::toResponse);
  }

  @Override
  public ResponseServiceDTO get(Long id) {
    return serviceMapper.toResponse(getService(id));
  }

  @Override
  public ResponseServiceDTO create(RequestServiceDTO dto) {
    return serviceMapper.toResponse(serviceRepository.save(serviceMapper.toService(dto)));
  }

  @Override
  public ResponseServiceDTO update(Long id, RequestEditServiceDTO dto) {
    if (serviceRepository.existsByNameAndIdNot(dto.name(), dto.id())) {
      throw new ServiceAlreadyExistsException("Service with name: " + dto.name() + " already exists");
    }
    Service service = getService(id);
    serviceMapper.mapUpdatesToEntity(dto, service);
    return serviceMapper.toResponse(serviceRepository.save(service));
  }

  @Override
  public void delete(Long id) {
    boolean exists = serviceRepository.existsById(id);
    if (!exists) {
      throw new ResourceNotFoundException("Service with id " + id + " not found", "Service not found");
    }
    serviceRepository.deleteById(id);
  }

  public List<Service> getServices(List<Long> ids) {
    List<Service> services = serviceRepository.findAllById(ids);
    if (!services.isEmpty()) {
      return services;
    }
    throw new ResourceNotFoundException("Service/s not found", "Service not found");
  }

  public Service getService(Long id) {
    return serviceRepository.findByIdWithEmployees(id).orElseThrow(() ->
        new ResourceNotFoundException("Service with id " + id + " not found", "Service not found"));
  }
}
