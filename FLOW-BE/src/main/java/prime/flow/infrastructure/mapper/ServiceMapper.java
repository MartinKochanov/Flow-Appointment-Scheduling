package prime.flow.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import prime.flow.domain.service.dto.RequestEditServiceDTO;
import prime.flow.domain.service.dto.RequestServiceDTO;
import prime.flow.domain.service.dto.ResponseServiceDTO;
import prime.flow.domain.service.entity.Service;

@Mapper(componentModel = "spring")
public interface ServiceMapper {

 ResponseServiceDTO toResponse(Service service);

 @Mapping(target = "id", ignore = true)
 Service toService(RequestServiceDTO requestServiceDTO);

 @Mapping(target = "id", ignore = true)
 void mapUpdatesToEntity(RequestEditServiceDTO dto, @MappingTarget Service service);
}
