package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApplicationRequest;
import com.app.dto.ApplicationResponse;
import com.app.entity.Application;
import com.app.entity.ApplicationStatus;
import com.app.entity.Internship;
import com.app.entity.Student;
import com.app.repository.ApplicationRepository;
import com.app.repository.InternshipRepository;
import com.app.repository.StudentRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private EmailService emailService;

    // Apply Internship
    public ApplicationResponse apply(ApplicationRequest request) {

        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Internship internship = internshipRepository.findById(request.getInternshipId())
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        if (applicationRepository.existsByStudentAndInternship(student, internship)) {
            throw new RuntimeException("You have already applied for this internship");
        }

        Application application = new Application();

        application.setStudent(student);
        application.setInternship(internship);
        application.setStatus(ApplicationStatus.APPLIED); 

        // Save student's current resume
        application.setResume(student.getResume());

        applicationRepository.save(application);

        return new ApplicationResponse(
        		   application.getId(),
        	        internship.getId(),
        	        student.getUser().getFullName(),
        	        internship.getTitle(),
        	        application.getStatus(),
        	        application.getAppliedAt(),
        	        application.getResume()
        );
    }

    // Common Response Method
    private ApplicationResponse convertToResponse(Application application) {

        return new ApplicationResponse(
        		application.getId(),
                application.getInternship().getId(),
                application.getStudent().getUser().getFullName(),
                application.getInternship().getTitle(),
                application.getStatus(),
                application.getAppliedAt(),
                application.getResume()
        );
    }

    // Company Applications
    public List<ApplicationResponse> getCompanyApplications(Long companyId) {

        return applicationRepository
                .findByInternshipCompanyId(companyId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Applications by Company
    public List<ApplicationResponse> getApplicationsByCompany(Long companyId) {

        return applicationRepository
                .findByInternshipCompanyId(companyId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Applications by Internship
    public List<ApplicationResponse> getApplicationsByInternship(Long internshipId) {

        return applicationRepository
                .findByInternshipId(internshipId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Student Applications
    public List<ApplicationResponse> getStudentApplications(Long studentId) {

        return applicationRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Duplicate API (if used)
    public List<ApplicationResponse> getApplicationsByStudent(Long studentId) {

        return applicationRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Update Status (Enum)
    public String updateApplicationStatus(Long applicationId, ApplicationStatus status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);

        applicationRepository.save(application);

        return "Application status updated successfully";
    }

    // Accept / Reject
    public String updateStatus(Long applicationId, String status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        ApplicationStatus currentStatus = application.getStatus();
        ApplicationStatus newStatus = ApplicationStatus.valueOf(status.toUpperCase());

        if (currentStatus == newStatus) {
            return "Application status is already " + newStatus.name();
        }

        if (currentStatus == ApplicationStatus.SELECTED) {
            return "Already Selected";
        }

        application.setStatus(newStatus);

        if (newStatus == ApplicationStatus.SELECTED) {

            Internship internship = application.getInternship();

            if (internship.getAvailableSeats() == 0) {
                throw new RuntimeException("No seats available");
            }

            internship.setAvailableSeats(
                    internship.getAvailableSeats() - 1);

            internshipRepository.save(internship);
        }

        applicationRepository.save(application);

        if (newStatus == ApplicationStatus.SELECTED) {
            emailService.sendSelectionEmail(application);
        } else if (newStatus == ApplicationStatus.REJECTED) {
            emailService.sendRejectionEmail(application);
        }

        return "Updated Successfully";
    }

}
