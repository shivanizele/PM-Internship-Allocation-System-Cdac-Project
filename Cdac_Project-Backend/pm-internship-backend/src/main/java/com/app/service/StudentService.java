package com.app.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.StudentProfileRequest;
import com.app.dto.StudentResponse;
import com.app.entity.Skill;
import com.app.entity.Student;
import com.app.repository.SkillRepository;
import com.app.repository.StudentRepository;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

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

			Student student = studentRepository.findById(id)
					.orElseThrow(() -> new RuntimeException("Student not found"));

			student.setCollegeName(request.getCollegeName());

			student.setBranch(request.getBranch());

			student.setCgpa(request.getCgpa());

			student.setLocation(request.getLocation());

			if (request.getSkills() != null) {

				Set<Skill> skills = new HashSet<>();

				for (String skillName : request.getSkills()) {

					Skill skill = skillRepository.findBySkillName(skillName).orElseGet(() -> {

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
		} catch (Exception e) {
			e.printStackTrace();
		}
		return getStudent(id);
	}

	// gete student by id
	public StudentResponse getStudentByUserId(Long userId) {

		Student student = studentRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Student not found"));

		return getStudent(student.getId());
	}

	public List<StudentResponse> getAllStudents() {

		return studentRepository.findAll().stream().map(student -> {

			Set<String> skills = student.getSkills().stream().map(Skill::getSkillName).collect(Collectors.toSet());

			return new StudentResponse(

					student.getId(),

					student.getUser().getFullName(),

					student.getUser().getEmail(),

					student.getCollegeName(),

					student.getBranch(),

					student.getCgpa(),

					student.getLocation(),

					skills);
		}).collect(Collectors.toList());
	}

	public void deleteStudent(Long id) {

		studentRepository.deleteById(id);
	}

	public StudentResponse uploadResume(Long id, MultipartFile file) {

		Student student = studentRepository.findById(id).orElseThrow();

		String fileName = file.getOriginalFilename();

		try {

			Path path = Paths.get("uploads");

			if (!Files.exists(path))
				Files.createDirectories(path);

			Files.copy(file.getInputStream(), path.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

		} catch (Exception e) {

			throw new RuntimeException(e);

		}

		student.setResume(fileName);

		studentRepository.save(student);

		return getStudent(id);
	}

}