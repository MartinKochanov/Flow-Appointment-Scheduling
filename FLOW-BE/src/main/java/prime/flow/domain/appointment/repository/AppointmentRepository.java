package prime.flow.domain.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import prime.flow.domain.appointment.entity.Appointment;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

  @Query("SELECT a FROM Appointment a WHERE a.employee.id = :employeeId AND DATE(a.appointmentTime) = :date")
  List<Appointment> findAppointmentsForEmployeeOnDate(
      @Param("employeeId") Long employeeId,
      @Param("date") LocalDate date
  );


  @Query("SELECT a FROM Appointment a WHERE a.employee.id = :employeeId AND a.appointmentTime BETWEEN :startDateTime AND :endDateTime")
  List<Appointment> findAppointmentsForEmployeeBetweenTimes(
      @Param("employeeId") Long employeeId,
      @Param("startDateTime") LocalDateTime startDateTime,
      @Param("endDateTime") LocalDateTime endDateTime
  );
  List<Appointment> findAppointmentsByClientId(Long customerId);
}
