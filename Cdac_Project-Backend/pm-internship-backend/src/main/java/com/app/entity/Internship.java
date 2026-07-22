package com.app.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import jakarta.persistence.*;

@Entity
@Table(name = "internships")
public class Internship {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	@Column(columnDefinition = "TEXT")
	private String description;
	private String location;
	private Double stipend;
	private Integer durationMonths;
	private Double minimumCgpa;
	private LocalDateTime createdAt;
	private Integer availableSeats;
	
	
	@ManyToOne
	@JoinColumn(name = "company_id")
	private Company company;
	@ManyToMany
	@JoinTable(name = "internship_skills", joinColumns = @JoinColumn(name = "internship_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
	private Set<Skill> requiredSkills = new HashSet<>();
//	@OneToMany(mappedBy = "internship")
//	private List<Application> applications = new ArrayList<>();
//	@OneToMany(mappedBy = "internship")
//	private List<Allocation> allocations = new ArrayList<>();
	@OneToMany(
		    mappedBy = "internship",
		    cascade = CascadeType.ALL,
		    orphanRemoval = true
		)
		private List<Application> applications = new ArrayList<>();

		@OneToMany(
		    mappedBy = "internship",
		    cascade = CascadeType.ALL,
		    orphanRemoval = true
		)
		private List<Allocation> allocations = new ArrayList<>();

	
	@PrePersist
	public void prePersist() {
		createdAt = LocalDateTime.now();
	}

	public Internship() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Double getMinimumCgpa() {
		return minimumCgpa;
	}

	public void setMinimumCgpa(Double minimumCgpa) {
		this.minimumCgpa = minimumCgpa;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Set<Skill> getRequiredSkills() {
		return requiredSkills;
	}

	public void setRequiredSkills(Set<Skill> requiredSkills) {
		this.requiredSkills = requiredSkills;
	}

	public List<Application> getApplications() {
		return applications;
	}

	public void setApplications(List<Application> applications) {
		this.applications = applications;
	}

	public List<Allocation> getAllocations() {
		return allocations;
	}

	public void setAllocations(List<Allocation> allocations) {
		this.allocations = allocations;
	}
	public Integer getAvailableSeats() {
	    return availableSeats;
	}

	public void setAvailableSeats(Integer availableSeats) {
	    this.availableSeats = availableSeats;
	}
}