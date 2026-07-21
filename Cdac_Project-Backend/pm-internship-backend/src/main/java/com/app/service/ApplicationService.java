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

		applicationRepository.save(application);

		return new ApplicationResponse(application.getId(), student.getUser().getFullName(), internship.getTitle(),
				application.getStatus(), application.getAppliedAt());
	}

	// get Comapnay applications
	public List<ApplicationResponse> getCompanyApplications(Long companyId) {

		return applicationRepository.findByInternshipCompanyId(companyId).stream()
				.map(a -> new ApplicationResponse(a.getId(), a.getStudent().getUser().getFullName(),
						a.getInternship().getTitle(), a.getStatus(), a.getAppliedAt()))
				.toList();
	}

	
	// update application status

	public String updateApplicationStatus(Long applicationId, ApplicationStatus status) {

		Application application = applicationRepository.findById(applicationId)
				.orElseThrow(() -> new RuntimeException("Application not found"));

		application.setStatus(status);

		applicationRepository.save(application);

		return "Application status updated successfully";
	}

	private ApplicationResponse convertToResponse(Application application) {

		ApplicationResponse response = new ApplicationResponse();

		return new ApplicationResponse(application.getId(), application.getStudent().getUser().getFullName(),
				application.getInternship().getTitle(), application.getStatus(), application.getAppliedAt());
	}

	public List<ApplicationResponse> getApplicationsByCompany(Long companyId) {

		return applicationRepository.findByInternshipCompanyId(companyId).stream().map(this::convertToResponse)
				.toList();
	}
	
	
	public List<ApplicationResponse> getApplicationsByInternship(Long internshipId){

	    List<Application> list =
	            applicationRepository.findByInternshipId(internshipId);

	    return list.stream().map(a -> {

	        ApplicationResponse response =
	                new ApplicationResponse();

	        response.setId(a.getId());
	        response.setStudentName(
	                a.getStudent().getUser().getFullName());

	        response.setInternshipTitle(
	                a.getInternship().getTitle());

	        response.setStatus(a.getStatus());

	        response.setAppliedAt(a.getAppliedAt());

	        return response;

	    }).toList();
	}
	
	
}