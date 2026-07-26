package com.app.dto;

import java.util.Set;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class InternshipRequest {

    @NotBlank(message = "Internship title is required")
    private String title;
    @NotBlank(message = "Internship description is required")
    private String description;
    @NotEmpty(message = "At least one required skill is required")
    private Set<String> requiredSkills;
    @NotBlank(message = "Location is required")
    private String location;
    @DecimalMin(value = "0.0", inclusive = true, message = "Stipend cannot be negative")
    private Double stipend;
    @Min(value = 1, message = "Duration must be at least one month")
    private Integer durationMonths;
	//private Long companyId;
    @DecimalMin(value = "0.0", inclusive = true, message = "Minimum CGPA cannot be negative")
    private Double minimumCgpa;
    @Min(value = 1, message = "Available seats must be at least one")
    private Integer availableSeats;
    
    

    public Double getMinimumCgpa() {
		return minimumCgpa;
	}

	public void setMinimumCgpa(Double minimumCgpa) {
		this.minimumCgpa = minimumCgpa;
	}

	public InternshipRequest() {
    }

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<String> getRequiredSkills() {
		return requiredSkills;
	}

	public void setRequiredSkills(Set<String> requiredSkills) {
		this.requiredSkills = requiredSkills;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Double getStipend() {
		return stipend;
	}

	public void setStipend(Double stipend) {
		this.stipend = stipend;
	}

    public Integer getDurationMonths() {
		return durationMonths;
	}

	public void setDurationMonths(Integer durationMonths) {
		this.durationMonths = durationMonths;
	}
	

//	public Long getCompanyId() {
//		return companyId;
//	}
//
//	public void setCompanyId(Long companyId) {
//		this.companyId = companyId;
//	}

	public Integer getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(Integer availableSeats) {
		this.availableSeats = availableSeats;
	}
    
    

}
