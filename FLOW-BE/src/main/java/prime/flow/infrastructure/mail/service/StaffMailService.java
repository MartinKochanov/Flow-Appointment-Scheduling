package prime.flow.infrastructure.mail.service;

public interface StaffMailService {
  void sendCreatedStaffMail(String firstName,String userEmail, String password);
}
