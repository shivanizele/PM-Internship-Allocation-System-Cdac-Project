package com.app.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class QualificationRequest {

    @Size(max = 100, message = "Highest qualification must be at most 100 characters")
    private String highestQualification;

    @Size(max = 150, message = "Degree must be at most 150 characters")
    private String degree;

    @Size(max = 150, message = "Specialization must be at most 150 characters")
    private String specialization;

    @Size(max = 200, message = "College/University must be at most 200 characters")
    private String collegeOrUniversity;

    @Min(value = 1900, message = "Passing year must be valid")
    @Max(value = 2100, message = "Passing year must be valid")
    private Integer passingYear;

    @Size(max = 50, message = "Percentage/CGPA must be at most 50 characters")
    private String percentageOrCgpa;

    @Size(max = 50, message = "10th percentage must be at most 50 characters")
    private String tenthPercentage;

    @Size(max = 50, message = "12th/Diploma percentage must be at most 50 characters")
    private String twelfthOrDiplomaPercentage;

    @Size(max = 500, message = "Certifications must be at most 500 characters")
    private String certifications;

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
