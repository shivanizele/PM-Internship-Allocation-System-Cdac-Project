package com.app.dto;

import java.time.LocalDateTime;

public class AllocationResponse {

	private Long allocationId;
	private String studentName;
	private String internshipTitle;
	private String companyName;
	private Double matchPercentage;
	private LocalDateTime allocatedAt;

	public AllocationResponse() {
	}

	public AllocationResponse(Long allocationId, String studentName, String internshipTitle, String companyName,
			Double matchPercentage, LocalDateTime allocatedAt) {

		this.allocationId = allocationId;
		this.studentName = studentName;
		this.internshipTitle = internshipTitle;
		this.companyName = companyName;
		this.matchPercentage = matchPercentage;
		this.allocatedAt = allocatedAt;
	}

	public Long getAllocationId() {
		return allocationId;
	}

	public String getStudentName() {
		return studentName;
	}

	public String getInternshipTitle() {
		return internshipTitle;
	}

	public String getCompanyName() {
		return companyName;
	}

	public Double getMatchPercentage() {
		return matchPercentage;
	}

	public LocalDateTime getAllocatedAt() {
		return allocatedAt;
	}
}