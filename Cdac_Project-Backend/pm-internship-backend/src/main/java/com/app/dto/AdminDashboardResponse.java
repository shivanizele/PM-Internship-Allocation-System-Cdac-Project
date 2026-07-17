package com.app.dto;

public class AdminDashboardResponse {

    private Long totalStudents;
    private Long totalCompanies;
    private Long totalInternships;
    private Long totalApplications;
    private Long totalAllocations;
    private Double placementPercentage;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(
            Long totalStudents,
            Long totalCompanies,
            Long totalInternships,
            Long totalApplications,
            Long totalAllocations,
            Double placementPercentage) {

        this.totalStudents = totalStudents;
        this.totalCompanies = totalCompanies;
        this.totalInternships = totalInternships;
        this.totalApplications = totalApplications;
        this.totalAllocations = totalAllocations;
        this.placementPercentage = placementPercentage;
    }

    public Long getTotalStudents() {
        return totalStudents;
    }

    public Long getTotalCompanies() {
        return totalCompanies;
    }

    public Long getTotalInternships() {
        return totalInternships;
    }

    public Long getTotalApplications() {
        return totalApplications;
    }

    public Long getTotalAllocations() {
        return totalAllocations;
    }

    public Double getPlacementPercentage() {
        return placementPercentage;
    }
}