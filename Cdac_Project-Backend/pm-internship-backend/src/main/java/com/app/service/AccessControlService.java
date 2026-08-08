package com.app.service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.entity.Company;
import com.app.entity.Student;
import com.app.entity.User;
import com.app.repository.CompanyRepository;
import com.app.repository.StudentRepository;
import com.app.repository.UserRepository;

@Service
public class AccessControlService {

	private final UserRepository userRepository;
	private final StudentRepository studentRepository;
	private final CompanyRepository companyRepository;

	public AccessControlService(UserRepository userRepository, StudentRepository studentRepository,
			CompanyRepository companyRepository) {
		this.userRepository = userRepository;
		this.studentRepository = studentRepository;
		this.companyRepository = companyRepository;
	}

	public User currentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || authentication.getName() == null
				|| authentication.getName().equals("anonymousUser")) {
			throw new AccessDeniedException("Authentication is required");
		}

		return userRepository.findByEmail(authentication.getName())
				.orElseThrow(() -> new AccessDeniedException("Authenticated user was not found"));
	}

	public boolean isAdmin() {
		return currentUser().getRole().name().equals("ADMIN");
	}

	public Student requireStudent(Long studentId) {
		Student student = studentRepository.findById(studentId)
				.orElseThrow(() -> new AccessDeniedException("Student profile was not found"));
		if (!isAdmin() && !student.getUser().getId().equals(currentUser().getId())) {
			throw new AccessDeniedException("You can only access your own student profile");
		}
		return student;
	}

	public Company requireCompany(Long companyId) {
		Company company = companyRepository.findById(companyId)
				.orElseThrow(() -> new AccessDeniedException("Company profile was not found"));
		if (!isAdmin() && !company.getUser().getId().equals(currentUser().getId())) {
			throw new AccessDeniedException("You can only access your own company profile");
		}
		return company;
	}

	public Student currentStudent() {
		User user = currentUser();
		return studentRepository.findByUserId(user.getId())
				.orElseThrow(() -> new AccessDeniedException("Student profile was not found"));
	}

	public Company currentCompany() {
		User user = currentUser();
		return companyRepository.findByUserId(user.getId())
				.orElseThrow(() -> new AccessDeniedException("Company profile was not found"));
	}
}
