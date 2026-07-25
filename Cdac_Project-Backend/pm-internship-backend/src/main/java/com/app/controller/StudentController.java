package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.StudentProfileRequest;
import com.app.dto.StudentResponse;
import com.app.service.StudentService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/student")
@CrossOrigin("http://localhost:3000")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@Operation(summary = "Get student profile")
	@GetMapping("/profile/{id}")
	public StudentResponse getStudent(@PathVariable Long id) {

		return studentService.getStudent(id);
	}

	@Operation(summary = "Update student profile")
	@PutMapping("/profile/{id}")
	public StudentResponse updateStudent(@PathVariable Long id, @Valid @RequestBody StudentProfileRequest request) {

		return studentService.updateProfile(id, request);
	}

	@GetMapping("/user/{userId}")
	public StudentResponse getStudentByUserId(@PathVariable Long userId) {

		return studentService.getStudentByUserId(userId);
	}
	
	@PostMapping("/uploadResume/{id}")
	public StudentResponse uploadResume(
	        @PathVariable Long id,
	        @RequestParam MultipartFile file) {

	    return studentService.uploadResume(id, file);
	}

//	@PostMapping
//	public StudentResponse addStudent(
//	        @RequestBody StudentProfileRequest request) {
//
//	    return studentService.addStudent(request);
//	}
}
