package com.app.entity;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String skillName;
	@ManyToMany(mappedBy = "skills")
	private Set<Student> students = new HashSet<>();
	@ManyToMany(mappedBy = "requiredSkills")
	private Set<Internship> internships = new HashSet<>();

	public Skill() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSkillName() {
		return skillName;
	}

	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}

	public Set<Student> getStudents() {
		return students;
	}

	public void setStudents(Set<Student> students) {
		this.students = students;
	}

	public Set<Internship> getInternships() {
		return internships;
	}

	public void setInternships(Set<Internship> internships) {
		this.internships = internships;
	}
}