package com.app.dto;

import java.util.List;

public class AllocationPreviewResponse {
    private Long internshipId;
    private String internshipTitle;
    private String companyName;
    private int availableSeats;
    private long applicantCount;
    private List<ApplicantRankingResponse> recommendedStudents;

    public AllocationPreviewResponse(Long internshipId, String internshipTitle, String companyName, int availableSeats,
            long applicantCount, List<ApplicantRankingResponse> recommendedStudents) {
        this.internshipId = internshipId;
        this.internshipTitle = internshipTitle;
        this.companyName = companyName;
        this.availableSeats = availableSeats;
        this.applicantCount = applicantCount;
        this.recommendedStudents = recommendedStudents;
    }

    public Long getInternshipId() { return internshipId; }
    public String getInternshipTitle() { return internshipTitle; }
    public String getCompanyName() { return companyName; }
    public int getAvailableSeats() { return availableSeats; }
    public long getApplicantCount() { return applicantCount; }
    public List<ApplicantRankingResponse> getRecommendedStudents() { return recommendedStudents; }
}
