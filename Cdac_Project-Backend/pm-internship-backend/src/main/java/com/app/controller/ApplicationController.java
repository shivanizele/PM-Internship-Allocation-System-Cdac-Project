package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.ApplicationRequest;
import com.app.dto.ApplicationResponse;
import com.app.dto.UpdateApplicationStatusRequest;
import com.app.service.ApplicationService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("http://localhost:3000")
public class ApplicationController {

	@Autowired
	private ApplicationService applicationService;

	@Operation(summary = "Apply for an internship")
	@PostMapping
	public ApplicationResponse apply(@RequestBody ApplicationRequest request) {

		return applicationService.apply(request);
	}

	@GetMapping("/company/{companyId}")
	public List<ApplicationResponse> getCompanyApplications(@PathVariable Long companyId) {

		return applicationService.getCompanyApplications(companyId);
	}
	
	
	@PutMapping("/{applicationId}/status")
	public String updateStatus(
	        @PathVariable Long applicationId,
	        @RequestBody UpdateApplicationStatusRequest request) {

	    return applicationService.updateApplicationStatus(
	            applicationId,
	            request.getStatus());
	}
	@GetMapping("/internship/{id}")
	public List<ApplicationResponse> getApplications(
	        @PathVariable Long id) {

	    return applicationService.getApplicationsByInternship(id);
	}
	
}