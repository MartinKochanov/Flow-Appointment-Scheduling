package prime.flow.infrastructure.seed;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import prime.flow.domain.service.entity.Service;
import prime.flow.domain.service.repository.ServiceRepository;
import prime.flow.domain.user.entity.Client;
import prime.flow.domain.user.entity.Employee;
import prime.flow.domain.user.entity.User;
import prime.flow.domain.user.enums.Role;
import prime.flow.domain.user.repository.UserRepository;

@Component
@Profile("dev")
public class DevDataSeeder implements CommandLineRunner {

  public static final String PASSWORD = "$2a$10$f87hSOCzpYENK8qwV7vNBuTZYKR99BZvQkAkR8FEctNvAOCAZhw0q";
  public static final LocalTime START_WORKING_HOUR = LocalTime.of(9, 0, 0);
  public static final LocalTime END_WORKING_HOUR = LocalTime.of(17, 0, 0);
  private final UserRepository userRepository;
  private final ServiceRepository serviceRepository;

  public DevDataSeeder(UserRepository userRepository, ServiceRepository serviceRepository) {
    this.userRepository = userRepository;
    this.serviceRepository = serviceRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    if (userRepository.count() > 1) {
      return;
    }

    Set<User> users = HashSet.newHashSet(40);
    Set<Service> services = HashSet.newHashSet(10);

    users.addAll(Set.of(
        new User("Alice", "Wonders", "alice.wonders@example.com",
            PASSWORD,
            Role.ADMIN, "5551001001"),

        new User("Bob", "Marley", "bob.marley@example.com",
            PASSWORD,
            Role.ADMIN, "5551002002"),

        new Client("Alice", "Walker", "alice.walker@example.com",
            PASSWORD,
            Role.USER, "5553001001"),

        new Client("Bob", "Harris", "bob.harris@example.com",
            PASSWORD,
            Role.USER, "5553002002"),

        new Client("Claire", "Miller", "claire.miller@example.com",
            PASSWORD,
            Role.USER, "5553003003"),

        new Client("Daniel", "Roberts", "daniel.roberts@example.com",
            PASSWORD,
            Role.USER, "5553004004"),

        new Client("Elena", "Garcia", "elena.garcia@example.com",
            PASSWORD,
            Role.USER, "5553005005"),

        new Client("Frankie", "Wright", "frankie.wright@example.com",
            PASSWORD,
            Role.USER, "5553006006"),

        new Client("Gina", "Mitchell", "gina.mitchell@example.com",
            PASSWORD,
            Role.USER, "5553007007"),

        new Client("Henry", "Lewis", "henry.lewis@example.com",
            PASSWORD,
            Role.USER, "5553008008"),

        new Client("Ivy", "Walker", "ivy.walker@example.com",
            PASSWORD,
            Role.USER, "5553009009"),
        new Client("Jack", "Young", "jack.young@example.com",
            PASSWORD,
            Role.USER, "5553010001"),

        new Client("Kelly", "King", "kelly.king@example.com",
            PASSWORD,
            Role.USER, "5553011002"),

        new Client("Louis", "Scott", "louis.scott@example.com",
            PASSWORD,
            Role.USER, "5553012003"),

        new Client("Mia", "Green", "mia.green@example.com",
            PASSWORD,
            Role.USER, "5553013004"),

        new Client("Nick", "Adams", "nick.adams@example.com",
            PASSWORD,
            Role.USER, "5553014005"),

        new Client("Olivia", "Baker", "olivia.baker@example.com",
            PASSWORD,
            Role.USER, "5553015006"),

        new Client("Paul", "Nelson", "paul.nelson@example.com",
            PASSWORD,
            Role.USER, "5553016007"),

        new Client("Quinn", "Carter", "quinn.carter@example.com",
            PASSWORD,
            Role.USER, "5553017008"),

        new Client("Rita", "Mitchell", "rita.mitchell@example.com",
            PASSWORD,
            Role.USER, "5553018009"),

        new Client("Steve", "Ward", "steve.ward@example.com",
            PASSWORD,
            Role.USER, "5553020001"),

        new Client("Tina", "Cook", "tina.cook@example.com",
            PASSWORD,
            Role.USER, "5553021002")));

    Set<User> haircutServiceEmployees = Set.of(
        new Employee("Catherine", "Johnson", "catherine.johnson@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552003003", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("David", "Smith", "david.smith@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552004004", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("Emma", "Brown", "emma.brown@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552005005", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("Frank", "Taylor", "frank.taylor@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552006006", START_WORKING_HOUR, END_WORKING_HOUR));
    users.addAll(haircutServiceEmployees);
    services.add(
        new Service("Haircut", "A basic haircut", Duration.ofMinutes(30), new BigDecimal("20.00"),
            haircutServiceEmployees)
    );

    Set<User> massageServiceEmployees = Set.of(
        new Employee("Grace", "Wilson", "grace.wilson@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552007007", START_WORKING_HOUR, END_WORKING_HOUR),
        new Employee("Hannah", "Davis", "hannah.davis@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552008008", START_WORKING_HOUR, END_WORKING_HOUR));
    users.addAll(massageServiceEmployees);
    services.add(
        new Service("Massage", "Relaxing massage", Duration.ofMinutes(60), new BigDecimal("50.00"),
            massageServiceEmployees)
    );

    Set<User> facialServiceEmployees = Set.of(
        new Employee("Isaac", "Martinez", "isaac.martinez@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552009009", START_WORKING_HOUR, END_WORKING_HOUR));

    new Employee("Jasmine", "Anderson", "jasmine.anderson@example.com",
        PASSWORD,
        Role.EMPLOYEE, "5552010001", START_WORKING_HOUR, END_WORKING_HOUR);
    users.addAll(facialServiceEmployees);
    services.add(new Service("Facial", "Refreshing facial treatment", Duration.ofMinutes(45),
        new BigDecimal("40.00"), facialServiceEmployees));

    Set<User> manicureServiceEmployees = Set.of(
        new Employee("Kyle", "Thomas", "kyle.thomas@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552011002", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("Lily", "Jackson", "lily.jackson@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552012003", START_WORKING_HOUR, END_WORKING_HOUR));
    users.addAll(manicureServiceEmployees);
    services.add(new Service("Manicure", "Nail care and design", Duration.ofMinutes(30),
        new BigDecimal("25.00"), manicureServiceEmployees));

    Set<User> pedicureServiceEmployees = Set.of(
        new Employee("Michael", "White", "michael.white@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552013004", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("Nora", "Harris", "nora.harris@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552014005", START_WORKING_HOUR, END_WORKING_HOUR));
    users.addAll(pedicureServiceEmployees);
    services.add(new Service("Pedicure", "Foot care and nail treatment", Duration.ofMinutes(40),
        new BigDecimal("30.00"), pedicureServiceEmployees));

    Set<User> waxingServiceEmployees = Set.of(
        new Employee("Oscar", "Martin", "oscar.martin@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552015006", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("Paula", "Thompson", "paula.thompson@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552016007", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("Quincy", "Garcia", "quincy.garcia@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552017008", START_WORKING_HOUR, END_WORKING_HOUR));
    users.addAll(waxingServiceEmployees);
    services.add(new Service("Waxing", "Hair removal service", Duration.ofMinutes(20),
        new BigDecimal("15.00"), waxingServiceEmployees));

    Set<User> sprayTanServiceEmployees = Set.of(
        new Employee("Rachel", "Martinez", "rachel.martinez@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552018009", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("Steven", "Lee", "steven.lee@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552020001", START_WORKING_HOUR, END_WORKING_HOUR),

        new Employee("Tina", "Allen", "tina.allen@example.com",
            PASSWORD,
            Role.EMPLOYEE, "5552021002", START_WORKING_HOUR, END_WORKING_HOUR));
    users.addAll(sprayTanServiceEmployees);
    services.add(new Service("Spray Tan", "Custom spray tanning", Duration.ofMinutes(30),
        new BigDecimal("35.00"), sprayTanServiceEmployees));

    userRepository.saveAll(users);
    serviceRepository.saveAll(services);
  }
}
