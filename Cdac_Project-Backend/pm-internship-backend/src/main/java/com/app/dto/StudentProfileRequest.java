package com.app.dto;

import java.util.Set;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

public class StudentProfileRequest {

	private String collegeName;
	private String branch;

    @DecimalMin(value = "0.0", inclusive = false, message = "CGPA must be greater than 0")
    @DecimalMax(value = "10.0", inclusive = true, message = "CGPA must be at most 10")
	private Double cgpa;
	private String location;
	private Set<String> skills;
    @Valid
    private QualificationRequest qualification;

	public StudentProfileRequest() {
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

    public QualificationRequest getQualification() {
        return qualification;
    }

    public void setQualification(QualificationRequest qualification) {
        this.qualification = qualification;
    }
}
