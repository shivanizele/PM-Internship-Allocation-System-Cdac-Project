package com.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "student_qualifications")
public class Qualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String highestQualification;

    private String degree;

    private String specialization;

    private String collegeOrUniversity;

    private Integer passingYear;

    private String percentageOrCgpa;

    private String tenthPercentage;

    private String twelfthOrDiplomaPercentage;

    @Column(length = 1000)
    private String certifications;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
