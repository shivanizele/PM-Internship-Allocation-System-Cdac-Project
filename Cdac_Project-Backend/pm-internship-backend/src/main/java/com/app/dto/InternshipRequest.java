package com.app.dto;

import java.util.Set;

public class InternshipRequest {

    private String title;
    private String description;
    private Set<String> requiredSkills;
    private String location;
    private Double stipend;
    private Integer durationMonths;
	private Long companyId;
    private Double minimumCgpa;
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
	

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Integer getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(Integer availableSeats) {
		this.availableSeats = availableSeats;
	}
    
    

}