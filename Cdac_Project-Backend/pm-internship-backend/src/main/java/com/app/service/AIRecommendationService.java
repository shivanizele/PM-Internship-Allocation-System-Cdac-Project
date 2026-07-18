package com.app.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.MatchResponse;
import com.app.entity.Internship;
import com.app.entity.Skill;
import com.app.entity.Student;
import com.app.repository.InternshipRepository;
import com.app.repository.StudentRepository;

@Service
public class AIRecommendationService {

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private InternshipRepository internshipRepository;

	public List<MatchResponse> recommendInternships(Long studentId) {

		Student student = studentRepository.findById(studentId)
				.orElseThrow(() -> new RuntimeException("Student not found"));

		// Set<String> studentSkills =
		// student.getSkills().stream().map(Skill::getSkillName).collect(Collectors.toSet());
		Set<String> studentSkills = student.getSkills().stream().map(s -> s.getSkillName().trim().toLowerCase())
				.collect(Collectors.toSet());

		List<MatchResponse> recommendations = new ArrayList<>();

		for (Internship internship : internshipRepository.findAll()) {

			double score = 0;

			// -------------------------
			// 1. Skill Matching (70%)
			// -------------------------
//			Set<String> requiredSkills = internship.getRequiredSkills().stream().map(Skill::getSkillName)
//					.collect(Collectors.toSet());

			Set<String> requiredSkills = internship.getRequiredSkills().stream()
					.map(s -> s.getSkillName().trim().toLowerCase()).collect(Collectors.toSet());

			long matchedSkills = requiredSkills.stream().filter(studentSkills::contains).count();

			if (!requiredSkills.isEmpty()) {
				score += ((double) matchedSkills / requiredSkills.size()) * 70;
			}

			// -------------------------
			// 2. CGPA Matching (20%)
			// -------------------------
			if (internship.getMinimumCgpa() != null && student.getCgpa() >= internship.getMinimumCgpa()) {

				score += 20;
			}

			// -------------------------
			// 3. Location Matching (10%)
			// -------------------------
			if (student.getLocation() != null && internship.getLocation() != null
					&& student.getLocation().equalsIgnoreCase(internship.getLocation())) {

				score += 10;
			}

			recommendations.add(new MatchResponse(internship.getId(), internship.getTitle(),
					internship.getCompany().getCompanyName(), score));
		}

		recommendations.sort(Comparator.comparing(MatchResponse::getMatchPercentage).reversed());

		return recommendations;
	}
}