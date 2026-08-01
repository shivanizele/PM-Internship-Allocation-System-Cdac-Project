package com.app.controller;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.app.dto.StudentProfileRequest;
import com.app.dto.StudentResponse;
import com.app.service.StudentService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

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
	
	@PutMapping(
		    value = "/profile/{id}/photo",
		    consumes = "multipart/form-data"
		)
		public StudentResponse uploadProfilePhoto(
		        @PathVariable Long id,
		        @RequestParam("profilePhoto") MultipartFile file) {

		    return studentService.uploadProfilePhoto(id, file);
		}
	
//	@GetMapping("/resume/{fileName}")
//	public ResponseEntity<Resource> viewResume(@PathVariable String fileName) throws IOException {
//
//	    Path filePath = Paths.get("uploads").resolve(fileName).normalize();
//
//	    Resource resource = new UrlResource(filePath.toUri());
//
//	    if (!resource.exists()) {
//	        return ResponseEntity.notFound().build();
//	    }
//
//	    return ResponseEntity.ok()
//	            .contentType(MediaType.APPLICATION_PDF)
//	            .header(
//	                HttpHeaders.CONTENT_DISPOSITION,
//	                "inline; filename=\"" + resource.getFilename() + "\""
//	            )
//	            .body(resource);
//	}
	
	@GetMapping("/resume/{fileName:.+}")
	public ResponseEntity<Resource> viewResume(
	        @PathVariable String fileName) throws IOException {

	    Path filePath = Paths.get("uploads").resolve(fileName).normalize();

	    Resource resource = new UrlResource(filePath.toUri());

	    if (!resource.exists() || !resource.isReadable()) {
	        return ResponseEntity.notFound().build();
	    }

	    return ResponseEntity.ok()
	            .contentType(MediaType.APPLICATION_PDF)
	            .header(
	                    HttpHeaders.CONTENT_DISPOSITION,
	                    "inline; filename=\"" + resource.getFilename() + "\""
	            )
	            .body(resource);
	}
//	@PostMapping
//	public StudentResponse addStudent(
//	        @RequestBody StudentProfileRequest request) {
//
//	    return studentService.addStudent(request);
//	}
}


