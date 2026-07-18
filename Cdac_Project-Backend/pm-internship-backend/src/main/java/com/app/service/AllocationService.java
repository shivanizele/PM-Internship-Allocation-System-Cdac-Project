package com.app.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AllocationResponse;
import com.app.dto.MatchResponse;
import com.app.entity.Allocation;
import com.app.entity.Application;
import com.app.entity.Internship;
import com.app.entity.Student;
import com.app.repository.AllocationRepository;
import com.app.repository.ApplicationRepository;
import com.app.repository.InternshipRepository;
import com.app.repository.StudentRepository;

@Service
public class AllocationService {

	@Autowired
	private AllocationRepository allocationRepository;

	@Autowired
	private ApplicationRepository applicationRepository;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private InternshipRepository internshipRepository;

	@Autowired
	private AIRecommendationService aiService;

	public String runAllocation() {

		List<Student> students = studentRepository.findAll();

		int allocatedCount = 0;

		for (Student student : students) {

			if (allocationRepository.findByStudentId(student.getId()).isPresent()) {
				continue;
			}

			List<Application> applications = applicationRepository.findByStudentId(student.getId());
			System.out.println("--------------------------------");
			System.out.println("Student ID: " + student.getId());
			System.out.println("Applications Count: " + applications.size());

			applications.forEach(a ->
			    System.out.println("Applied Internship: " + a.getInternship().getId()));

			if (applications.isEmpty()) {
				continue;
			}

			List<MatchResponse> matches = aiService.recommendInternships(student.getId());
			System.out.println("Recommendations:");

			matches.forEach(m ->
			    System.out.println(
			        m.getInternshipId() + " -> " + m.getMatchPercentage()));
			

			MatchResponse bestMatch = matches.stream().filter(m -> m.getMatchPercentage() >= 20).filter(
					m -> applications.stream().anyMatch(a -> a.getInternship().getId().equals(m.getInternshipId())))
					.max(Comparator.comparing(MatchResponse::getMatchPercentage)).orElse(null);

			if (bestMatch == null) {
				 System.out.println("Best Match = NULL");
				continue;
			}

			Internship internship =
			        internshipRepository
			                .findById(bestMatch.getInternshipId())
			                .orElseThrow();

			// Check vacancy
			if (internship.getAvailableSeats() <= 0) {
			    continue;
			}

			// Reduce available seats
			internship.setAvailableSeats(
			        internship.getAvailableSeats() - 1);

			internshipRepository.save(internship);

			// Create allocation
			Allocation allocation = new Allocation();

			allocation.setStudent(student);
			allocation.setInternship(internship);
			allocation.setMatchPercentage(
			        bestMatch.getMatchPercentage());
			System.out.println("Allocation Saved");

			allocationRepository.save(allocation);

			allocatedCount++;
		}

		return allocatedCount + " students allocated successfully";
	}

	public List<AllocationResponse> getAllAllocations() {

		List<AllocationResponse> responses = new ArrayList<>();

		for (Allocation a : allocationRepository.findAll()) {

			responses.add(new AllocationResponse(a.getId(), a.getStudent().getUser().getFullName(),

					a.getInternship().getTitle(),

					a.getInternship().getCompany().getCompanyName(),

					a.getMatchPercentage(),

					a.getAllocatedAt()));
		}

		return responses;
	}
}