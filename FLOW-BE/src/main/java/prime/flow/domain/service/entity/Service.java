package prime.flow.domain.service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import prime.flow.domain.appointment.entity.Appointment;
import prime.flow.domain.user.entity.User;

@Entity
@Table(name = "services")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"users", "services"})
@ToString(exclude = {"users", "services"})
@NoArgsConstructor
@AllArgsConstructor
public class Service {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(min = 2)
  @Column(nullable = false, unique = true)
  private String name;

  @NotBlank
  @Size(min = 10)
  @Column(nullable = false)
  private String description;

  @NotNull
  @Column(nullable = false)
  private Duration duration;

  @NotNull
  @Positive
  @Column(nullable = false)
  private BigDecimal price;

  @ManyToMany
  @JoinTable(
      name = "user_services",
      joinColumns = @JoinColumn(name = "service_id"),
      inverseJoinColumns = @JoinColumn(name = "user_id")
  )
  private Set<User> users;

  @OneToMany(mappedBy = "service", orphanRemoval = true)
  private Set<Appointment> services;

  public Service(String name, String description, Duration duration, BigDecimal price,
      Set<User> users) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.price = price;
    this.users = users;
  }

}
