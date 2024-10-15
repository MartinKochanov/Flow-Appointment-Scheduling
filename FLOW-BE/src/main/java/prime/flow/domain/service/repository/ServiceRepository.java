package prime.flow.domain.service.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import prime.flow.domain.service.entity.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

  boolean existsByName(String value);

  boolean existsByNameAndIdNot(String name, Long id);

  @Query("SELECT s FROM Service s LEFT JOIN s.users WHERE s.id = :id")
  Optional<Service> findByIdWithEmployees(@Param("id") Long id);

}
