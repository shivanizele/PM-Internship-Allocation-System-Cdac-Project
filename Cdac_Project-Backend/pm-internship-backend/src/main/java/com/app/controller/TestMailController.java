package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.service.EmailService;

@RestController
@RequestMapping("/api/test")
@CrossOrigin("http://localhost:3000")
public class TestMailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send-mail")
    public String sendTestMail(
            @RequestParam String email) {

        try {

            emailService.sendEmail(
                    email,
                    "Test Email - Internship Allocation System",
                    "Hello! This is a test email from your AI-Based Internship Allocation System."
            );

            return "Email sent successfully to: " + email;

        } catch (Exception e) {

            e.printStackTrace();

            return "Email sending failed: " + e.getMessage();
        }
    }
}