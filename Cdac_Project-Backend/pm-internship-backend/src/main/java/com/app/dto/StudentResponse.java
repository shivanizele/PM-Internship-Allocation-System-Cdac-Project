package com.app.dto;

import java.util.Set;

public class StudentResponse {

	private Long id;
	private String fullName;
	private String email;
	private String collegeName;
	private String branch;
	private Double cgpa;
	private String location;
	private Set<String> skills;

	public StudentResponse() {
	}

	public StudentResponse(Long id, String fullName, String email, String collegeName, String branch, Double cgpa,
			String location, Set<String> skills) {

		this.id = id;
		this.fullName = fullName;
		this.email = email;
		this.collegeName = collegeName;
		this.branch = branch;
		this.cgpa = cgpa;
		this.location = location;
		this.skills = skills;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCollegeName() {
		return collegeName;
	}

	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public Double getCgpa() {
		return cgpa;
	}

	public void setCgpa(Double cgpa) {
		this.cgpa = cgpa;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Set<String> getSkills() {
		return skills;
	}

	public void setSkills(Set<String> skills) {
		this.skills = skills;
	}

	// Generate Getters and Setters
}