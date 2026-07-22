package com.app.dto;

public class CompanyDashboardResponse {

    private long totalInternships;
    private long totalApplications;
    private long selectedStudents;
    private long availableSeats;

    public CompanyDashboardResponse() {
    }

    public CompanyDashboardResponse(
            long totalInternships,
            long totalApplications,
            long selectedStudents,
            long availableSeats) {

        this.totalInternships = totalInternships;
        this.totalApplications = totalApplications;
        this.selectedStudents = selectedStudents;
        this.availableSeats = availableSeats;
    }

    public long getTotalInternships() {
        return totalInternships;
    }

    public void setTotalInternships(long totalInternships) {
        this.totalInternships = totalInternships;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public long getSelectedStudents() {
        return selectedStudents;
    }

    public void setSelectedStudents(long selectedStudents) {
        this.selectedStudents = selectedStudents;
    }

    public long getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(long availableSeats) {
        this.availableSeats = availableSeats;
    }
}