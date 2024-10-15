package prime.flow.domain.appointment.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import prime.flow.domain.appointment.Status;
import prime.flow.domain.service.entity.Service;
import prime.flow.domain.user.entity.User;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"service", "employee", "client"})
@EqualsAndHashCode(exclude = {"service", "employee", "client"})
public class Appointment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "service_id", nullable = false)
  private Service service;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "employee_id", nullable = false)
  private User employee;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "client_id", nullable = false)
  private User client;

  @NotNull
  @Column(nullable = false)
  private LocalDateTime appointmentTime;

  @NotNull
  @Column(nullable = false)
  private LocalDateTime endDateTime;

  @NotNull
  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private Status status;

  public Appointment(Service service, User employee, User client, LocalDateTime appointmentTime,
      LocalDateTime endDateTime, Status status) {
    this.service = service;
    this.employee = employee;
    this.client = client;
    this.appointmentTime = appointmentTime;
    this.endDateTime = endDateTime;
    this.status = status;
  }
}
