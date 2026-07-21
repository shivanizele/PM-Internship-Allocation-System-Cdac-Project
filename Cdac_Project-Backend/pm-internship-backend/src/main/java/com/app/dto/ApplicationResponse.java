package com.app.dto;

import java.time.LocalDateTime;

import com.app.entity.ApplicationStatus;

public class ApplicationResponse {

    private Long id;
    private String studentName;
    private String internshipTitle;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;

    public ApplicationResponse() {
    }

    public ApplicationResponse(
            Long id,
            String studentName,
            String internshipTitle,
            ApplicationStatus status,
            LocalDateTime appliedAt) {

        this.id = id;
        this.studentName = studentName;
        this.internshipTitle = internshipTitle;
        this.status = status;
        this.appliedAt = appliedAt;
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
    
}