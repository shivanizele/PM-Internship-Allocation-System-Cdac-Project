package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApplicationRequest;
import com.app.dto.ApplicationResponse;
import com.app.entity.Application;
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
}