package prime.flow.domain.user.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import prime.flow.domain.user.entity.User;
import prime.flow.domain.user.enums.Role;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Page<User> findByRole(Role role, Pageable pageable);

  boolean existsByEmail(String email);

  Optional<User> findByEmail(String email);

  @Query("SELECT e FROM Employee e LEFT JOIN FETCH e.services WHERE e.id = :id")
  Optional<User> findByIdWithServices(@Param("id") Long id);
}
