package com.app.dto;

import java.time.LocalDateTime;

import com.app.entity.ApplicationStatus;

public class ApplicationResponse {

    private Long id;
    private String studentName;
    private String internshipTitle;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private String resume;
    private Long internshipId;

    public ApplicationResponse() {
    }

    public ApplicationResponse(
            Long id,
            Long internshipId,
            String studentName,
            String internshipTitle,
            ApplicationStatus status,
            LocalDateTime appliedAt,
            String resume) {

        this.id = id;
        this.internshipId = internshipId;
        this.studentName = studentName;
        this.internshipTitle = internshipTitle;
        this.status = status;
        this.appliedAt = appliedAt;
        this.resume = resume;
    }

    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getInternshipTitle() {
        return internshipTitle;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

	public void setId(Long id) {
		this.id = id;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public void setInternshipTitle(String internshipTitle) {
		this.internshipTitle = internshipTitle;
	}

	public void setStatus(ApplicationStatus status) {
		this.status = status;
	}

	public void setAppliedAt(LocalDateTime appliedAt) {
		this.appliedAt = appliedAt;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public Long getInternshipId() {
		return internshipId;
	}

	public void setInternshipId(Long internshipId) {
		this.internshipId = internshipId;
	}
    
	
}