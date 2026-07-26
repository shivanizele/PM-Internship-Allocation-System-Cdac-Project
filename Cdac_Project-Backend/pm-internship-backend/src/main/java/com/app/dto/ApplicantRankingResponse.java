package com.app.dto;

import java.util.List;

import com.app.entity.ApplicationStatus;

public class ApplicantRankingResponse {
    private Long applicationId;
    private Long studentId;
    private String studentName;
    private String email;
    private String collegeName;
    private String branch;
    private Double cgpa;
    private List<String> skills;
    private String resume;
    private ApplicationStatus status;
    private Double matchScore;
    private List<String> matchedSkills;
    private List<String> missingSkills;

    public ApplicantRankingResponse(Long applicationId, Long studentId, String studentName, String email,
            String collegeName, String branch, Double cgpa, List<String> skills, String resume,
            ApplicationStatus status, InternshipRecommendationDTO recommendation) {
        this.applicationId = applicationId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.email = email;
        this.collegeName = collegeName;
        this.branch = branch;
        this.cgpa = cgpa;
        this.skills = skills;
        this.resume = resume;
        this.status = status;
        this.matchScore = recommendation.getMatchScore();
        this.matchedSkills = recommendation.getMatchedSkills();
        this.missingSkills = recommendation.getMissingSkills();
    }

    public Long getApplicationId() { return applicationId; }
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getEmail() { return email; }
    public String getCollegeName() { return collegeName; }
    public String getBranch() { return branch; }
    public Double getCgpa() { return cgpa; }
    public List<String> getSkills() { return skills; }
    public String getResume() { return resume; }
    public ApplicationStatus getStatus() { return status; }
    public Double getMatchScore() { return matchScore; }
    public List<String> getMatchedSkills() { return matchedSkills; }
    public List<String> getMissingSkills() { return missingSkills; }
}
