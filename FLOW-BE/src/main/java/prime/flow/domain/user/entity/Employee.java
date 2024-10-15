package prime.flow.domain.user.entity;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import prime.flow.domain.appointment.entity.Appointment;
import prime.flow.domain.service.entity.Service;
import prime.flow.domain.user.enums.Role;

@Entity
@EqualsAndHashCode(callSuper = true, exclude = {"services"})
@Getter
@Setter
@DiscriminatorValue("EMPLOYEE")
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Employee extends User {

  @OneToMany(mappedBy = "employee", orphanRemoval = true)
  private Set<Appointment> employeeAppointments;

  @ManyToMany
  @JoinTable(
      name = "user_services",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "service_id")
  )
  private List<Service> services;

  private LocalTime workStartTime;

  private LocalTime workEndTime;

  public Employee(
      String firstName,
      String lastName,
      String email,
      String password,
      Role role, String phone,
      LocalTime workStartTime,
      LocalTime workEndTime) {
    super(firstName, lastName, email, password, role, phone);
    this.employeeAppointments = new HashSet<>();
    this.services = new ArrayList<>();
    this.workStartTime = workStartTime;
    this.workEndTime = workEndTime;
  }
}
