package prime.flow.domain.user.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import prime.flow.domain.appointment.entity.Appointment;
import prime.flow.domain.user.enums.Role;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("CLIENT")
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class Client extends User {

  @OneToMany(mappedBy = "client", orphanRemoval = true)
  private Set<Appointment> clientAppointments;

  public Client(
      String firstName,
      String lastName,
      String email,
      String password,
      Role role,
      String phone
  ) {
    super(firstName, lastName, email, password, role, phone);
    this.clientAppointments = new HashSet<>();
  }
}
