package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.StudentProfileRequest;
import com.app.dto.StudentResponse;
import com.app.service.StudentService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/student")
@CrossOrigin("http://localhost:3000")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@Operation(summary = "Get student profile")
	@GetMapping("/{id}")
	public StudentResponse getStudent(@PathVariable Long id) {

		return studentService.getStudent(id);
	}

	@Operation(summary = "Update student profile")
	@PutMapping("/{id}")
	public StudentResponse updateStudent(@PathVariable Long id, @RequestBody StudentProfileRequest request) {

		return studentService.updateProfile(id, request);
	}
	
//	@PostMapping
//	public StudentResponse addStudent(
//	        @RequestBody StudentProfileRequest request) {
//
//	    return studentService.addStudent(request);
//	}
}