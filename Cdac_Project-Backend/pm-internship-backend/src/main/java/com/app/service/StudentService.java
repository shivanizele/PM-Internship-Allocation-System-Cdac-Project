package com.app.service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.StudentProfileRequest;
import com.app.dto.StudentResponse;
import com.app.entity.Skill;
import com.app.entity.Student;
import com.app.repository.SkillRepository;
import com.app.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private SkillRepository skillRepository;

	public StudentResponse getStudent(Long id) {

		Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));

		Set<String> skills = student.getSkills().stream().map(Skill::getSkillName).collect(Collectors.toSet());

		return new StudentResponse(student.getId(), student.getUser().getFullName(), student.getUser().getEmail(),
				student.getCollegeName(), student.getBranch(), student.getCgpa(), student.getLocation(), skills);
	}

	public StudentResponse updateProfile(Long id, StudentProfileRequest request) {
		try {

		Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));

		student.setCollegeName(request.getCollegeName());

		student.setBranch(request.getBranch());

		student.setCgpa(request.getCgpa());

		student.setLocation(request.getLocation());
		
		if (request.getSkills() != null) {

		    Set<Skill> skills = new HashSet<>();

		    for (String skillName : request.getSkills()) {

		        Skill skill = skillRepository
		                .findBySkillName(skillName)
		                .orElseGet(() -> {

		                    Skill s = new Skill();
		                    s.setSkillName(skillName);

		                    return skillRepository.save(s);
		                });

		        skills.add(skill);
		    }

		    student.setSkills(skills);
		}

		studentRepository.save(student);

		return getStudent(id);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return getStudent(id);
	}

	//gete student by id
	public StudentResponse getStudentByUserId(Long userId) {

	    Student student = studentRepository.findByUserId(userId)
	            .orElseThrow(() -> new RuntimeException("Student not found"));

	    return getStudent(student.getId());
	}
}