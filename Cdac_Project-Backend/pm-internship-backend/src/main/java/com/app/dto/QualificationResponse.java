package com.app.dto;

public class QualificationResponse {

    private String highestQualification;
    private String degree;
    private String specialization;
    private String collegeOrUniversity;
    private Integer passingYear;
    private String percentageOrCgpa;
    private String tenthPercentage;
    private String twelfthOrDiplomaPercentage;
    private String certifications;

    public QualificationResponse() {
    }

    public QualificationResponse(String highestQualification, String degree, String specialization,
            String collegeOrUniversity, Integer passingYear, String percentageOrCgpa, String tenthPercentage,
            String twelfthOrDiplomaPercentage, String certifications) {
        this.highestQualification = highestQualification;
        this.degree = degree;
        this.specialization = specialization;
        this.collegeOrUniversity = collegeOrUniversity;
        this.passingYear = passingYear;
        this.percentageOrCgpa = percentageOrCgpa;
        this.tenthPercentage = tenthPercentage;
        this.twelfthOrDiplomaPercentage = twelfthOrDiplomaPercentage;
        this.certifications = certifications;
    }

    public String getHighestQualification() {
        return highestQualification;
    }

    public void setHighestQualification(String highestQualification) {
        this.highestQualification = highestQualification;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getCollegeOrUniversity() {
        return collegeOrUniversity;
    }

    public void setCollegeOrUniversity(String collegeOrUniversity) {
        this.collegeOrUniversity = collegeOrUniversity;
    }

    public Integer getPassingYear() {
        return passingYear;
    }

    public void setPassingYear(Integer passingYear) {
        this.passingYear = passingYear;
    }

    public String getPercentageOrCgpa() {
        return percentageOrCgpa;
    }

    public void setPercentageOrCgpa(String percentageOrCgpa) {
        this.percentageOrCgpa = percentageOrCgpa;
    }

    public String getTenthPercentage() {
        return tenthPercentage;
    }

    public void setTenthPercentage(String tenthPercentage) {
        this.tenthPercentage = tenthPercentage;
    }

    public String getTwelfthOrDiplomaPercentage() {
        return twelfthOrDiplomaPercentage;
    }

    public void setTwelfthOrDiplomaPercentage(String twelfthOrDiplomaPercentage) {
        this.twelfthOrDiplomaPercentage = twelfthOrDiplomaPercentage;
    }

    public String getCertifications() {
        return certifications;
    }

    public void setCertifications(String certifications) {
        this.certifications = certifications;
    }
}
