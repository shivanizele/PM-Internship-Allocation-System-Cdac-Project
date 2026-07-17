package com.app.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "resumes")
public class Resume {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String fileName;
	private String filePath;
	private LocalDateTime uploadedAt;
	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student student;

	@PrePersist
	public void prePersist() {
		uploadedAt = LocalDateTime.now();
	}

	public Resume() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}
}
