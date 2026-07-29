package com.app.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.StudentProfileRequest;
import com.app.dto.StudentResponse;
import com.app.dto.QualificationRequest;
import com.app.dto.QualificationResponse;
import com.app.entity.Qualification;
import com.app.entity.Skill;
import com.app.entity.Student;
import com.app.entity.User;
import com.app.repository.SkillRepository;
import com.app.repository.StudentRepository;
import com.app.repository.UserRepository;

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
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AccessControlService accessControlService;

	public StudentResponse getStudent(Long id) {
		accessControlService.requireStudent(id);

		Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));

		Set<String> skills = student.getSkills().stream().map(Skill::getSkillName).collect(Collectors.toSet());

		return new StudentResponse(
			    student.getId(),
			    student.getUser().getFullName(),
			    student.getUser().getEmail(),
			    student.getCollegeName(),
			    student.getBranch(),
			    student.getCgpa(),
			    student.getLocation(),
			    skills,
			    student.getResume(),
			    student.getProfilePhoto(),
			    mapQualification(student.getQualification()),
			    isProfileComplete(student)
			);
	}

	public StudentResponse updateProfile(Long id, StudentProfileRequest request) {
		try {
			accessControlService.requireStudent(id);

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

            if (request.getQualification() != null) {
                Qualification qualification = student.getQualification();
                if (qualification == null) {
                    qualification = new Qualification();
                    qualification.setStudent(student);
                }

                updateQualification(qualification, request.getQualification());
                student.setQualification(qualification);
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
		accessControlService.requireStudent(student.getId());

		return getStudent(student.getId());
	}

	public List<StudentResponse> getAllStudents() {

	    return studentRepository.findAll().stream().map(student -> {

	        Set<String> skills = student.getSkills()
	                .stream()
	                .map(Skill::getSkillName)
	                .collect(Collectors.toSet());

	        return new StudentResponse(
	                student.getId(),
	                student.getUser().getFullName(),
	                student.getUser().getEmail(),
	                student.getCollegeName(),
	                student.getBranch(),
	                student.getCgpa(),
	                student.getLocation(),
	                skills,
	                student.getResume(),
	                student.getProfilePhoto(),   // ADD THIS
	                mapQualification(student.getQualification()),
	                isProfileComplete(student)
	        );

	    }).collect(Collectors.toList());
	}

	@Transactional
	public void deleteStudent(Long id) {

		Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));

		User user = student.getUser();

		studentRepository.delete(student);

		userRepository.delete(user);
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
	
	public StudentResponse uploadProfilePhoto(Long id, MultipartFile file) {

	    accessControlService.requireStudent(id);

	    Student student = studentRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Student not found"));

	    if (file == null || file.isEmpty()) {
	        throw new RuntimeException("Please select a profile photo");
	    }

	    String originalFileName = file.getOriginalFilename();

	    if (originalFileName == null || originalFileName.isBlank()) {
	        throw new RuntimeException("Invalid file name");
	    }

	    String extension = "";

	    int lastDot = originalFileName.lastIndexOf(".");

	    if (lastDot >= 0) {
	        extension = originalFileName.substring(lastDot);
	    }

	    String fileName = id + "_profile" + extension;

	    try {

	        Path path = Paths.get("uploads/profile-photos");

	        if (!Files.exists(path)) {
	            Files.createDirectories(path);
	        }

	        Files.copy(
	                file.getInputStream(),
	                path.resolve(fileName),
	                StandardCopyOption.REPLACE_EXISTING
	        );

	    } catch (Exception e) {

	        throw new RuntimeException(
	                "Failed to upload profile photo", e
	        );
	    }

	    student.setProfilePhoto(fileName);

	    studentRepository.save(student);

	    return getStudent(id);
	}

    private QualificationResponse mapQualification(Qualification qualification) {
        if (qualification == null) {
            return null;
        }

        return new QualificationResponse(
                qualification.getHighestQualification(),
                qualification.getDegree(),
                qualification.getSpecialization(),
                qualification.getCollegeOrUniversity(),
                qualification.getPassingYear(),
                qualification.getPercentageOrCgpa(),
                qualification.getTenthPercentage(),
                qualification.getTwelfthOrDiplomaPercentage(),
                qualification.getCertifications());
    }

    private void updateQualification(Qualification qualification, QualificationRequest request) {
        qualification.setHighestQualification(trimToNull(request.getHighestQualification()));
        qualification.setDegree(trimToNull(request.getDegree()));
        qualification.setSpecialization(trimToNull(request.getSpecialization()));
        qualification.setCollegeOrUniversity(trimToNull(request.getCollegeOrUniversity()));
        qualification.setPassingYear(request.getPassingYear());
        qualification.setPercentageOrCgpa(trimToNull(request.getPercentageOrCgpa()));
        qualification.setTenthPercentage(trimToNull(request.getTenthPercentage()));
        qualification.setTwelfthOrDiplomaPercentage(trimToNull(request.getTwelfthOrDiplomaPercentage()));
        qualification.setCertifications(trimToNull(request.getCertifications()));
    }

    private boolean isProfileComplete(Student student) {
        Qualification qualification = student.getQualification();

        return hasText(student.getCollegeName())
                && hasText(student.getBranch())
                && student.getCgpa() != null
                && student.getCgpa() > 0
                && hasText(student.getLocation())
                && student.getSkills() != null
                && !student.getSkills().isEmpty()
                && qualification != null
                && hasText(qualification.getHighestQualification())
                && hasText(qualification.getDegree())
                && hasText(qualification.getSpecialization())
                && hasText(qualification.getCollegeOrUniversity())
                && qualification.getPassingYear() != null
                && hasText(qualification.getPercentageOrCgpa())
                && hasText(qualification.getTenthPercentage())
                && hasText(qualification.getTwelfthOrDiplomaPercentage());
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

}
