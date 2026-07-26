package com.app.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.dto.InternshipRecommendationDTO;
import com.app.dto.ResumeAnalysisResponse;
import com.app.entity.Internship;
import com.app.entity.Skill;
import com.app.entity.Student;
import com.app.entity.User;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.InternshipRepository;
import com.app.repository.StudentRepository;
import com.app.repository.UserRepository;

@Service
public class RecommendationService {

    private static final Map<String, String> SKILL_ALIASES = createSkillAliases();
    private static final Set<String> STOP_WORDS = Set.of(
            "and", "the", "for", "with", "from", "using", "into", "your", "you", "are", "was", "were", "that",
            "this", "have", "has", "had", "will", "shall", "can", "may", "not", "but", "our", "their", "its",
            "system", "project", "projects", "developer", "development", "experience", "intern", "internship");

    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;
    private final UserRepository userRepository;
    private final ResumeTextExtractorService resumeTextExtractorService;
    private final ResumeAnalysisService resumeAnalysisService;

    public RecommendationService(StudentRepository studentRepository, InternshipRepository internshipRepository,
            UserRepository userRepository, ResumeTextExtractorService resumeTextExtractorService,
            ResumeAnalysisService resumeAnalysisService) {
        this.studentRepository = studentRepository;
        this.internshipRepository = internshipRepository;
        this.userRepository = userRepository;
        this.resumeTextExtractorService = resumeTextExtractorService;
        this.resumeAnalysisService = resumeAnalysisService;
    }

    public List<InternshipRecommendationDTO> recommendInternships(Long studentId) {

        authorizeStudentAccess(studentId);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        String resumeText = resumeTextExtractorService.extractTextForStudent(student);
        ResumeAnalysisResponse analysis = resumeAnalysisService.analyzeResume(resumeText);

        List<Internship> internships = internshipRepository.findAll();

        if (internships.isEmpty()) {
            throw new ResourceNotFoundException("No internships available");
        }

        Set<String> profileSkills = student.getSkills().stream()
                .map(Skill::getSkillName)
                .collect(Collectors.toCollection(LinkedHashSet::new));

        Set<String> allStudentSkills = mergeStudentSkills(profileSkills, analysis);
        Double effectiveCgpa = student.getCgpa() != null ? student.getCgpa() : analysis.getCgpa();
        String preferredLocation = hasText(student.getLocation()) ? student.getLocation() : analysis.getPreferredLocation();

        return internships.stream()
                .map(internship -> buildRecommendation(internship, allStudentSkills, effectiveCgpa, preferredLocation,
                        analysis))
                .sorted(Comparator.comparing(InternshipRecommendationDTO::getMatchScore).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

    public InternshipRecommendationDTO scoreStudentForInternship(Student student, Internship internship) {
        String resumeText = resumeTextExtractorService.extractTextForStudent(student);
        ResumeAnalysisResponse analysis = resumeAnalysisService.analyzeResume(resumeText);
        Set<String> profileSkills = student.getSkills().stream()
                .map(Skill::getSkillName)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        Set<String> allStudentSkills = mergeStudentSkills(profileSkills, analysis);
        Double effectiveCgpa = student.getCgpa() != null ? student.getCgpa() : analysis.getCgpa();
        String preferredLocation = hasText(student.getLocation()) ? student.getLocation() : analysis.getPreferredLocation();
        return buildRecommendation(internship, allStudentSkills, effectiveCgpa, preferredLocation, analysis);
    }

    private InternshipRecommendationDTO buildRecommendation(Internship internship, Set<String> studentSkills,
            Double studentCgpa, String preferredLocation, ResumeAnalysisResponse analysis) {

        List<String> requiredSkills = internship.getRequiredSkills().stream()
                .map(Skill::getSkillName)
                .sorted(String.CASE_INSENSITIVE_ORDER)
                .toList();

        List<String> matchedSkills = requiredSkills.stream()
                .filter(requiredSkill -> containsSkill(studentSkills, requiredSkill))
                .toList();

        List<String> missingSkills = requiredSkills.stream()
                .filter(requiredSkill -> !containsSkill(studentSkills, requiredSkill))
                .toList();

        double skillMatchScore = requiredSkills.isEmpty()
                ? 0.0
                : ((double) matchedSkills.size() / requiredSkills.size()) * 100.0;

        double cgpaScore = calculateCgpaScore(studentCgpa, internship.getMinimumCgpa());
        double locationScore = calculateLocationScore(preferredLocation, internship.getLocation());
        double projectExperienceScore = calculateProjectExperienceScore(internship, analysis);

        /*
         * Final score stays in Java and never comes from Gemini.
         * Exact weighting:
         * - skill match contributes 50%
         * - CGPA contributes 20%
         * - location contributes 15%
         * - project/experience relevance contributes 15%
         */
        double overallScore = roundToTwoDecimals(
                (skillMatchScore * 0.50)
                        + (cgpaScore * 0.20)
                        + (locationScore * 0.15)
                        + (projectExperienceScore * 0.15));

        return new InternshipRecommendationDTO(
                internship.getId(),
                internship.getTitle(),
                internship.getCompany().getCompanyName(),
                overallScore,
                new ArrayList<>(matchedSkills),
                new ArrayList<>(missingSkills),
                buildReason(matchedSkills, missingSkills, cgpaScore, locationScore, projectExperienceScore));
    }

    private Set<String> mergeStudentSkills(Set<String> profileSkills, ResumeAnalysisResponse analysis) {

        Set<String> mergedSkills = new LinkedHashSet<>();
        mergedSkills.addAll(profileSkills);
        mergedSkills.addAll(safeCollection(analysis.getSkills()));
        mergedSkills.addAll(safeCollection(analysis.getProgrammingLanguages()));
        mergedSkills.addAll(safeCollection(analysis.getTechnologies()));
        mergedSkills.addAll(safeCollection(analysis.getFrameworks()));
        return mergedSkills;
    }

    private double calculateCgpaScore(Double studentCgpa, Double internshipMinimumCgpa) {

        if (studentCgpa == null) {
            return 0.0;
        }

        if (internshipMinimumCgpa == null || internshipMinimumCgpa <= 0) {
            return 100.0;
        }

        if (studentCgpa >= internshipMinimumCgpa) {
            return 100.0;
        }

        return Math.max(0.0, (studentCgpa / internshipMinimumCgpa) * 100.0);
    }

    private double calculateLocationScore(String studentLocation, String internshipLocation) {

        if (!hasText(studentLocation) || !hasText(internshipLocation)) {
            return 0.0;
        }

        return normalizeSkill(studentLocation).equals(normalizeSkill(internshipLocation)) ? 100.0 : 0.0;
    }

    private double calculateProjectExperienceScore(Internship internship, ResumeAnalysisResponse analysis) {

        Set<String> internshipKeywords = new LinkedHashSet<>();
        internshipKeywords.addAll(tokenize(internship.getTitle()));
        internshipKeywords.addAll(tokenize(internship.getDescription()));

        for (Skill skill : internship.getRequiredSkills()) {
            internshipKeywords.add(normalizeSkill(skill.getSkillName()));
        }

        Set<String> evidenceKeywords = new LinkedHashSet<>();
        for (String project : safeCollection(analysis.getProjects())) {
            evidenceKeywords.addAll(tokenize(project));
        }
        for (String experience : safeCollection(analysis.getExperience())) {
            evidenceKeywords.addAll(tokenize(experience));
        }

        if (internshipKeywords.isEmpty() || evidenceKeywords.isEmpty()) {
            return 0.0;
        }

        long matches = internshipKeywords.stream().filter(evidenceKeywords::contains).count();
        return Math.min(100.0, ((double) matches / internshipKeywords.size()) * 100.0);
    }

    private String buildReason(List<String> matchedSkills, List<String> missingSkills, double cgpaScore,
            double locationScore, double projectExperienceScore) {

        List<String> reasons = new ArrayList<>();

        if (!matchedSkills.isEmpty()) {
            reasons.add("Strong skill overlap in " + String.join(", ", matchedSkills));
        }

        if (cgpaScore >= 100.0) {
            reasons.add("CGPA meets the internship requirement");
        }

        if (locationScore >= 100.0) {
            reasons.add("Preferred location matches the internship location");
        }

        if (projectExperienceScore > 0.0) {
            reasons.add("Projects or prior experience align with the internship profile");
        }

        if (reasons.isEmpty() && !missingSkills.isEmpty()) {
            reasons.add("Partial fit today; strongest gap is " + String.join(", ", missingSkills));
        }

        if (reasons.isEmpty()) {
            reasons.add("Recommendation generated from available profile and resume information");
        }

        return String.join(". ", reasons) + ".";
    }

    private boolean containsSkill(Set<String> studentSkills, String requiredSkill) {
        String normalizedRequiredSkill = normalizeSkill(requiredSkill);
        return studentSkills.stream().map(this::normalizeSkill).anyMatch(normalizedRequiredSkill::equals);
    }

    private String normalizeSkill(String value) {

        if (value == null) {
            return "";
        }

        String normalized = value.trim().toLowerCase(Locale.ROOT)
                .replace(".", "")
                .replace("-", " ")
                .replace("_", " ")
                .replaceAll("\\s+", " ");

        return SKILL_ALIASES.getOrDefault(normalized, normalized);
    }

    private Set<String> tokenize(String value) {

        Set<String> tokens = new LinkedHashSet<>();

        if (!hasText(value)) {
            return tokens;
        }

        Arrays.stream(value.toLowerCase(Locale.ROOT).split("[^a-z0-9+#]+"))
                .map(String::trim)
                .filter(token -> token.length() > 1)
                .filter(token -> !STOP_WORDS.contains(token))
                .map(this::normalizeSkill)
                .forEach(tokens::add);

        return tokens;
    }

    private Collection<String> safeCollection(Collection<String> values) {
        return values == null ? List.of() : values;
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }

    private double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    private void authorizeStudentAccess(Long requestedStudentId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new AccessDeniedException("Authenticated user not found");
        }

        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch("ROLE_ADMIN"::equals);

        if (isAdmin) {
            return;
        }

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new AccessDeniedException("Authenticated user not found"));

        Student currentStudent = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new AccessDeniedException("Student profile not found"));

        if (!currentStudent.getId().equals(requestedStudentId)) {
            throw new AccessDeniedException("You can only request recommendations for your own student profile");
        }
    }

    private static Map<String, String> createSkillAliases() {

        Map<String, String> aliases = new HashMap<>();
        aliases.put("spring boot", "spring");
        aliases.put("spring framework", "spring");
        aliases.put("javascript", "javascript");
        aliases.put("js", "javascript");
        aliases.put("reactjs", "react");
        aliases.put("react js", "react");
        aliases.put("reactjs library", "react");
        aliases.put("reactjs framework", "react");
        aliases.put("mysql", "mysql");
        aliases.put("structured query language", "sql");
        return aliases;
    }
}
