package com.app.service;

import com.app.entity.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;

    @Value("${app.mail.from:${spring.mail.username:no-reply@example.com}}")
    private String fromAddress;

    public EmailService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    public void sendSelectionEmail(Application application) {
        String subject = "Internship Application Selected";
        String body = """
                Dear %s,

                Congratulations. Your internship application has been updated.

                Student Name: %s
                Company Name: %s
                Internship Title: %s
                Status: Selected

                Next Steps:
                - Check your dashboard for the latest application status.
                - Prepare the required onboarding or interview documents.
                - Reach out to the company if they request additional information.

                Contact Information:
                - Company Email: %s
                - Company Website: %s

                Regards,
                PM Internship Allocation System
                """.formatted(
                application.getStudent().getUser().getFullName(),
                application.getStudent().getUser().getFullName(),
                application.getInternship().getCompany().getCompanyName(),
                application.getInternship().getTitle(),
                application.getInternship().getCompany().getUser().getEmail(),
                defaultValue(application.getInternship().getCompany().getWebsite(), "Not provided"));

        sendEmail(application.getStudent().getUser().getEmail(), subject, body);
    }

    public void sendRejectionEmail(Application application) {
        String subject = "Internship Application Update";
        String body = """
                Dear %s,

                Your internship application has been updated.

                Student Name: %s
                Company Name: %s
                Internship Title: %s
                Status: Rejected

                Thank you for applying. Please continue exploring other internship opportunities on the platform.

                Regards,
                PM Internship Allocation System
                """.formatted(
                application.getStudent().getUser().getFullName(),
                application.getStudent().getUser().getFullName(),
                application.getInternship().getCompany().getCompanyName(),
                application.getInternship().getTitle());

        sendEmail(application.getStudent().getUser().getEmail(), subject, body);
    }

    public void sendEmail(String to, String subject, String body) {
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            LOGGER.warn("Email not sent because JavaMailSender is not configured. Recipient: {}", to);
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception ex) {
            LOGGER.error("Failed to send email to {}", to, ex);
        }
    }

    private String defaultValue(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }
}
