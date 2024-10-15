package prime.flow.infrastructure.mail.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class StaffMailServiceImpl implements
    StaffMailService {

  private final TemplateEngine templateEngine;
  private final JavaMailSender javaMailSender;
  private final String myEmail;

  public StaffMailServiceImpl(
      TemplateEngine templateEngine,
      JavaMailSender javaMailSender,
      @Value("${spring.mail.username}") String myEmail) {
    this.templateEngine = templateEngine;
    this.javaMailSender = javaMailSender;
    this.myEmail = myEmail;
  }

  @Override
  public void sendCreatedStaffMail(String firstName, String userEmail, String token) {
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

    try {
      mimeMessageHelper.setTo(userEmail);
      mimeMessageHelper.setFrom(myEmail);
      mimeMessageHelper.setReplyTo(myEmail);
      mimeMessageHelper.setSubject("Welcome to Flow");
      mimeMessageHelper.setText(generateCreatedStaffBody(firstName, userEmail, token), true);

      javaMailSender.send(mimeMessageHelper.getMimeMessage());
    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
  }

  private String generateCreatedStaffBody(String firstName, String userEmail,
      String password) {

    Context context = new Context();
    context.setVariable("firstName", firstName);
    context.setVariable("email", userEmail);
    context.setVariable("password", password);

    return templateEngine.process("email/employee-registered-email", context);
  }

}
