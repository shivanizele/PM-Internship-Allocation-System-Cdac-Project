package com.app.service;

import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApplicationRequest;
import com.app.dto.ApplicationResponse;
import com.app.dto.ApplicantRankingResponse;
import com.app.dto.InternshipRecommendationDTO;
import com.app.entity.Application;
import com.app.entity.ApplicationStatus;
import com.app.entity.Internship;
import com.app.entity.Student;
import com.app.exception.ConflictException;
import com.app.exception.ResourceNotFoundException;
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

    @Autowired
    private AccessControlService accessControlService;

    @Autowired
    private RecommendationService recommendationService;

    // Apply Internship
    public ApplicationResponse apply(ApplicationRequest request) {

        Student student = accessControlService.currentStudent();
        if (request.getStudentId() != null && !request.getStudentId().equals(student.getId())) {
            throw new org.springframework.security.access.AccessDeniedException(
                    "You can only apply using your own student profile");
        }

        Internship internship = internshipRepository.findById(request.getInternshipId())
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));

        if (internship.getAvailableSeats() == null || internship.getAvailableSeats() <= 0) {
            throw new ConflictException("This internship has no available seats");
        }

        if (applicationRepository.existsByStudentAndInternship(student, internship)) {
            throw new ConflictException("You have already applied for this internship");
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

        accessControlService.requireCompany(companyId);

        return applicationRepository
                .findByInternshipCompanyId(companyId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Applications by Company
    public List<ApplicationResponse> getApplicationsByCompany(Long companyId) {

        accessControlService.requireCompany(companyId);

        return applicationRepository
                .findByInternshipCompanyId(companyId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Applications by Internship
    public List<ApplicationResponse> getApplicationsByInternship(Long internshipId) {

        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));
        accessControlService.requireCompany(internship.getCompany().getId());

        return applicationRepository
                .findByInternshipId(internshipId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public List<ApplicantRankingResponse> getRankedApplicants(Long internshipId) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));
        accessControlService.requireCompany(internship.getCompany().getId());

        return applicationRepository.findByInternshipId(internshipId).stream()
                .filter(application -> application.getStudent().getResume() != null)
                .map(application -> toRanking(application, recommendationService
                        .scoreStudentForInternship(application.getStudent(), internship)))
                .sorted(Comparator.comparing(ApplicantRankingResponse::getMatchScore).reversed())
                .collect(Collectors.toList());
    }

    // Student Applications
    public List<ApplicationResponse> getStudentApplications(Long studentId) {

        accessControlService.requireStudent(studentId);

        return applicationRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Duplicate API (if used)
    public List<ApplicationResponse> getApplicationsByStudent(Long studentId) {

        accessControlService.requireStudent(studentId);

        return applicationRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Update Status (Enum)
    public String updateApplicationStatus(Long applicationId, ApplicationStatus status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        accessControlService.requireCompany(application.getInternship().getCompany().getId());

        application.setStatus(status);

        applicationRepository.save(application);

        return "Application status updated successfully";
    }

    // Accept / Reject
    public String updateStatus(Long applicationId, String status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        accessControlService.requireCompany(application.getInternship().getCompany().getId());

        ApplicationStatus currentStatus = application.getStatus();
        ApplicationStatus newStatus = ApplicationStatus.valueOf(status.toUpperCase());

        if (currentStatus == newStatus) {
            return "Application status is already " + newStatus.name();
        }

        if (newStatus == ApplicationStatus.SELECTED) {
            throw new ConflictException("Final selection is managed through admin allocation confirmation");
        }

        application.setStatus(newStatus);

        applicationRepository.save(application);

        if (newStatus == ApplicationStatus.REJECTED) {
            emailService.sendRejectionEmail(application);
        }

        return "Updated Successfully";
    }

    private ApplicantRankingResponse toRanking(Application application, InternshipRecommendationDTO recommendation) {
        Student student = application.getStudent();
        return new ApplicantRankingResponse(application.getId(), student.getId(), student.getUser().getFullName(),
                student.getUser().getEmail(), student.getCollegeName(), student.getBranch(), student.getCgpa(),
                student.getSkills().stream().map(skill -> skill.getSkillName()).sorted().collect(Collectors.toList()),
                application.getResume(), application.getStatus(), recommendation);
    }

}
