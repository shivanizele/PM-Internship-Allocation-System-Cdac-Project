package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dto.AuthResponse;
import com.app.dto.LoginRequest;
import com.app.dto.RegisterRequest;
import com.app.entity.Company;
import com.app.entity.Role;
import com.app.entity.Student;
import com.app.entity.User;
import com.app.repository.CompanyRepository;
import com.app.repository.StudentRepository;
import com.app.repository.UserRepository;
import com.app.security.JwtUtil;

@Service
public class AuthService {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public String register(RegisterRequest request) {

		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already exists");
		}

		User user = new User();

		user.setFullName(request.getFullName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));

		//user.setRole(Role.valueOf(request.getRole().toUpperCase()));
		user.setRole(request.getRole());

		User savedUser = userRepository.save(user);

		// Create Student Profile
		if (savedUser.getRole() == Role.STUDENT) {

			Student student = new Student();

		student.setUser(savedUser);
//			student.setCollegeName("");
//			student.setBranch("");
//			student.setLocation("");
//			student.setCgpa(0.0);
			student.setCollegeName(request.getCollegeName());
			student.setBranch(request.getBranch());
			student.setLocation(request.getLocation());
			student.setCgpa(request.getCgpa());

			studentRepository.save(student);
		}

		// Create Company Profile
		if (savedUser.getRole() == Role.COMPANY) {

			Company company = new Company();

			company.setUser(savedUser);
//			company.setCompanyName("");
//			company.setIndustry("");
//			company.setAddress("");
//			company.setWebsite("");
			company.setCompanyName(request.getCompanyName());
			company.setIndustry(request.getIndustry());
			company.setAddress(request.getAddress());
			company.setWebsite(request.getWebsite());

			companyRepository.save(company);
		}

		return "User registered successfully";
	}

	/*
	 * public AuthResponse login(LoginRequest request) {
	 * 
	 * User user = userRepository.findByEmail(request.getEmail()) .orElseThrow(() ->
	 * new RuntimeException("Invalid email or password"));
	 * 
	 * if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	 * 
	 * throw new RuntimeException("Invalid email or password"); }
	 * 
	 * String token = jwtUtil.generateToken(user.getEmail());
	 * 
	 * AuthResponse response = new AuthResponse();
	 * 
	 * response.setId(user.getId()); response.setToken(token);
	 * response.setEmail(user.getEmail()); response.setRole(user.getRole().name());
	 * 
	 * return response; }
	 */
	
	public AuthResponse login(LoginRequest request) {

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

	    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	        throw new RuntimeException("Invalid email or password");
	    }

	    String token = jwtUtil.generateToken(user.getEmail());

	    AuthResponse response = new AuthResponse();

	    response.setId(user.getId());
	    response.setToken(token);
	    response.setEmail(user.getEmail());
	    response.setRole(user.getRole().name());
	    response.setFullName(user.getFullName());

	    // NEW
	    if (user.getRole() == Role.COMPANY) {

	        Company company = companyRepository.findByUserId(user.getId())
	                .orElseThrow(() -> new RuntimeException("Company not found"));

	        response.setCompanyId(company.getId());
	    }
	    if (user.getRole() == Role.STUDENT) {

	        Student student = studentRepository.findByUserId(user.getId())
	                .orElseThrow(() -> new RuntimeException("Student not found"));

	        response.setStudentId(student.getId());
	    }

	    return response;
	}
}