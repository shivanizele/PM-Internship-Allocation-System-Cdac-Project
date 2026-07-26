package com.app.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.AllocationPreviewResponse;
import com.app.dto.AllocationResponse;
import com.app.dto.ApplicantRankingResponse;
import com.app.dto.InternshipRecommendationDTO;
import com.app.entity.Allocation;
import com.app.entity.Application;
import com.app.entity.ApplicationStatus;
import com.app.entity.Internship;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.AllocationRepository;
import com.app.repository.ApplicationRepository;
import com.app.repository.InternshipRepository;

@Service
public class AllocationService {

    private final AllocationRepository allocationRepository;
    private final ApplicationRepository applicationRepository;
    private final InternshipRepository internshipRepository;
    private final RecommendationService recommendationService;
    private final EmailService emailService;
    private final AccessControlService accessControlService;

    public AllocationService(AllocationRepository allocationRepository, ApplicationRepository applicationRepository,
            InternshipRepository internshipRepository, RecommendationService recommendationService,
            EmailService emailService, AccessControlService accessControlService) {
        this.allocationRepository = allocationRepository;
        this.applicationRepository = applicationRepository;
        this.internshipRepository = internshipRepository;
        this.recommendationService = recommendationService;
        this.emailService = emailService;
        this.accessControlService = accessControlService;
    }

    public List<AllocationPreviewResponse> previewAllocation() {
        List<Candidate> candidates = applicationRepository.findAll().stream()
                .filter(application -> application.getStatus() == ApplicationStatus.APPLIED
                        || application.getStatus() == ApplicationStatus.SHORTLISTED)
                .filter(application -> application.getResume() != null)
                .filter(application -> !allocationRepository.existsByApplicationId(application.getId()))
                .map(this::scoreCandidate)
                .sorted(Comparator.comparing(Candidate::score).reversed()
                        .thenComparing(candidate -> safeCgpa(candidate.application().getStudent().getCgpa()),
                                Comparator.reverseOrder()))
                .toList();

        Set<Long> allocatedStudents = allocationRepository.findAll().stream()
                .map(allocation -> allocation.getStudent().getId()).collect(Collectors.toSet());
        Set<Long> selectedStudents = new HashSet<>(allocatedStudents);
        Map<Long, Integer> remainingSeats = internshipRepository.findAll().stream()
                .collect(Collectors.toMap(Internship::getId,
                        internship -> Math.max(0, internship.getAvailableSeats() == null ? 0 : internship.getAvailableSeats())));
        List<Candidate> selected = new ArrayList<>();

        for (Candidate candidate : candidates) {
            Long studentId = candidate.application().getStudent().getId();
            Long internshipId = candidate.application().getInternship().getId();
            if (!selectedStudents.contains(studentId) && remainingSeats.getOrDefault(internshipId, 0) > 0) {
                selected.add(candidate);
                selectedStudents.add(studentId);
                remainingSeats.put(internshipId, remainingSeats.get(internshipId) - 1);
            }
        }

        Map<Long, List<Candidate>> selectedByInternship = selected.stream()
                .collect(Collectors.groupingBy(candidate -> candidate.application().getInternship().getId()));
        return internshipRepository.findAll().stream()
                .filter(internship -> applicationRepository.findByInternshipId(internship.getId()).stream()
                        .anyMatch(application -> application.getStatus() == ApplicationStatus.APPLIED
                                || application.getStatus() == ApplicationStatus.SHORTLISTED))
                .map(internship -> new AllocationPreviewResponse(internship.getId(), internship.getTitle(),
                        internship.getCompany().getCompanyName(),
                        Math.max(0, internship.getAvailableSeats() == null ? 0 : internship.getAvailableSeats()),
                        applicationRepository.findByInternshipId(internship.getId()).size(),
                        selectedByInternship.getOrDefault(internship.getId(), List.of()).stream()
                                .map(this::toRanking).collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

    @Transactional
    public String confirmAllocation() {
        List<Candidate> selected = selectedCandidates();
        for (Candidate candidate : selected) {
            Application application = candidate.application();
            if (allocationRepository.existsByApplicationId(application.getId())) {
                continue;
            }
            Internship internship = application.getInternship();
            if (internship.getAvailableSeats() == null || internship.getAvailableSeats() <= 0) {
                continue;
            }

            Allocation allocation = new Allocation();
            allocation.setStudent(application.getStudent());
            allocation.setInternship(internship);
            allocation.setApplication(application);
            allocation.setMatchPercentage(candidate.score());
            allocationRepository.save(allocation);

            internship.setAvailableSeats(internship.getAvailableSeats() - 1);
            application.setStatus(ApplicationStatus.SELECTED);
            applicationRepository.save(application);
            internshipRepository.save(internship);
            emailService.sendSelectionEmail(application);
        }
        return selected.size() + " allocation recommendation(s) confirmed";
    }

    public List<AllocationResponse> getAllAllocations() {
        return allocationRepository.findAll().stream().map(allocation -> new AllocationResponse(allocation.getId(),
                allocation.getStudent().getUser().getFullName(), allocation.getInternship().getTitle(),
                allocation.getInternship().getCompany().getCompanyName(), allocation.getMatchPercentage(),
                allocation.getAllocatedAt())).collect(Collectors.toList());
    }

    public List<AllocationResponse> getStudentAllocations(Long studentId) {
        accessControlService.requireStudent(studentId);
        return allocationRepository.findAll().stream()
                .filter(allocation -> allocation.getStudent().getId().equals(studentId))
                .map(this::toResponse).collect(Collectors.toList());
    }

    public List<AllocationResponse> getCompanyAllocations(Long companyId) {
        accessControlService.requireCompany(companyId);
        return allocationRepository.findAll().stream()
                .filter(allocation -> allocation.getInternship().getCompany().getId().equals(companyId))
                .map(this::toResponse).collect(Collectors.toList());
    }

    public void deleteAllocation(Long id) {
        Allocation allocation = allocationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allocation not found"));
        allocationRepository.delete(allocation);
    }

    private List<Candidate> selectedCandidates() {
        List<Candidate> allCandidates = applicationRepository.findAll().stream()
                .filter(application -> application.getStatus() == ApplicationStatus.APPLIED
                        || application.getStatus() == ApplicationStatus.SHORTLISTED)
                .filter(application -> application.getResume() != null)
                .filter(application -> !allocationRepository.existsByApplicationId(application.getId()))
                .map(this::scoreCandidate)
                .sorted(Comparator.comparing(Candidate::score).reversed()).toList();
        Set<Long> usedStudents = allocationRepository.findAll().stream().map(a -> a.getStudent().getId())
                .collect(Collectors.toSet());
        Map<Long, Integer> remainingSeats = internshipRepository.findAll().stream().collect(Collectors.toMap(
                Internship::getId, internship -> Math.max(0, internship.getAvailableSeats() == null ? 0 : internship.getAvailableSeats())));
        List<Candidate> selected = new ArrayList<>();
        for (Candidate candidate : allCandidates) {
            Long studentId = candidate.application().getStudent().getId();
            Long internshipId = candidate.application().getInternship().getId();
            if (!usedStudents.contains(studentId) && remainingSeats.getOrDefault(internshipId, 0) > 0) {
                selected.add(candidate);
                usedStudents.add(studentId);
                remainingSeats.put(internshipId, remainingSeats.get(internshipId) - 1);
            }
        }
        return selected;
    }

    private Candidate scoreCandidate(Application application) {
        InternshipRecommendationDTO recommendation = recommendationService
                .scoreStudentForInternship(application.getStudent(), application.getInternship());
        return new Candidate(application, recommendation);
    }

    private ApplicantRankingResponse toRanking(Candidate candidate) {
        Application application = candidate.application();
        return new ApplicantRankingResponse(application.getId(), application.getStudent().getId(),
                application.getStudent().getUser().getFullName(), application.getStudent().getUser().getEmail(),
                application.getStudent().getCollegeName(), application.getStudent().getBranch(),
                application.getStudent().getCgpa(), application.getStudent().getSkills().stream()
                        .map(skill -> skill.getSkillName()).sorted().collect(Collectors.toList()),
                application.getResume(), application.getStatus(), candidate.recommendation());
    }

    private Double safeCgpa(Double cgpa) { return cgpa == null ? 0.0 : cgpa; }

    private AllocationResponse toResponse(Allocation allocation) {
        return new AllocationResponse(allocation.getId(), allocation.getStudent().getUser().getFullName(),
                allocation.getInternship().getTitle(), allocation.getInternship().getCompany().getCompanyName(),
                allocation.getMatchPercentage(), allocation.getAllocatedAt());
    }

    private record Candidate(Application application, InternshipRecommendationDTO recommendation) {
        private Double score() { return recommendation.getMatchScore(); }
    }
}
