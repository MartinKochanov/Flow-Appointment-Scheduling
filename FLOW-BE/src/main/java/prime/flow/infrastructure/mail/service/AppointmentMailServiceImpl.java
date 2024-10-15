package prime.flow.infrastructure.mail.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDate;
import java.time.LocalTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import prime.flow.infrastructure.exceptions.CancelAppointmentMailException;
import prime.flow.infrastructure.exceptions.ScheduleAppointmentMailException;

@Service
public class AppointmentMailServiceImpl implements AppointmentMailService {

  private final TemplateEngine templateEngine;
  private final JavaMailSender javaMailSender;
  private final String myEmail;

  public AppointmentMailServiceImpl(
      TemplateEngine templateEngine,
      JavaMailSender javaMailSender,
      @Value("${spring.mail.username}") String myEmail) {
    this.templateEngine = templateEngine;
    this.javaMailSender = javaMailSender;
    this.myEmail = myEmail;
  }

  @Override
  public void sendAppointmentScheduledMail(
      String serviceName, String clientName,
      String employeeName, LocalDate appointmentDate,
      LocalTime appointmentTime, String clientEmail
  ) {

    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

    try {
      mimeMessageHelper.setTo(clientEmail);
      mimeMessageHelper.setFrom(myEmail);
      mimeMessageHelper.setReplyTo(myEmail);
      mimeMessageHelper.setSubject("Appointment scheduled");
      mimeMessageHelper.setText(generateAppointmentScheduledBody(
          serviceName, clientName,
          employeeName, appointmentDate,
          appointmentTime, clientEmail
      ), true);

      javaMailSender.send(mimeMessageHelper.getMimeMessage());
    } catch (MessagingException e) {
      throw new ScheduleAppointmentMailException("Email for scheduling appointment failed to deliver.");
    }
  }

  @Override
  public void sendAppointmentCancelMail(
      String serviceName, String clientName,
      String employeeName, String clientEmail
  ) {

    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

    try {
      mimeMessageHelper.setTo(clientEmail);
      mimeMessageHelper.setFrom(myEmail);
      mimeMessageHelper.setReplyTo(myEmail);
      mimeMessageHelper.setSubject("Appointment canceled");
      mimeMessageHelper.setText(generateAppointmentCanceledBody(
          serviceName, clientName,
          employeeName, clientEmail
      ), true);

      javaMailSender.send(mimeMessageHelper.getMimeMessage());
    } catch (MessagingException e) {
      throw new CancelAppointmentMailException("Email for cancelling appointment failed to deliver.");
    }
  }

  private String generateAppointmentScheduledBody(
      String serviceName, String clientName,
      String employeeName, LocalDate appointmentDate,
      LocalTime appointmentTime, String clientEmail
  ) {

    Context context = new Context();
    context.setVariable("serviceName", serviceName);
    context.setVariable("clientName", clientName);
    context.setVariable("employeeName", employeeName);
    context.setVariable("appointmentDate", appointmentDate);
    context.setVariable("appointmentTime", appointmentTime);
    context.setVariable("clientEmail", clientEmail);

    return templateEngine.process("email/appointment-scheduled-mail", context);
  }

  private String generateAppointmentCanceledBody(
      String serviceName, String clientName,
      String employeeName, String contactEmail
  ) {
    Context context = new Context();
    context.setVariable("serviceName", serviceName);
    context.setVariable("clientName", clientName);
    context.setVariable("employeeName", employeeName);
    context.setVariable("contactEmail", contactEmail);

    return templateEngine.process("email/appointment-canceled-mail", context);
  }

}
