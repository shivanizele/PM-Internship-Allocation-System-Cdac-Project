package com.app.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "allocations")
public class Allocation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Double matchScore;
	private LocalDateTime allocationDate;
	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student student;
	@ManyToOne
	@JoinColumn(name = "internship_id")
	private Internship internship;
	
	private Double matchPercentage;

    private LocalDateTime allocatedAt;

	@PrePersist
	public void prePersist() {
		allocationDate = LocalDateTime.now();
	}

	public Allocation() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getMatchScore() {
		return matchScore;
	}

	public void setMatchScore(Double matchScore) {
		this.matchScore = matchScore;
	}

	public LocalDateTime getAllocationDate() {
		return allocationDate;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Internship getInternship() {
		return internship;
	}

	public void setInternship(Internship internship) {
		this.internship = internship;
	}

	public Double getMatchPercentage() {
		return matchPercentage;
	}

	public void setMatchPercentage(Double matchPercentage) {
		this.matchPercentage = matchPercentage;
	}

	public LocalDateTime getAllocatedAt() {
		return allocatedAt;
	}

	public void setAllocatedAt(LocalDateTime allocatedAt) {
		this.allocatedAt = allocatedAt;
	}

//	public void setAllocationDate(LocalDateTime allocationDate) {
//		this.allocationDate = allocationDate;
//	}
//	
}