package com.app.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "allocations")
public class Allocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "internship_id", nullable = false)
    private Internship internship;

    @OneToOne
    @JoinColumn(name = "application_id", unique = true)
    private Application application;

    @Column(name = "match_percentage")
    private Double matchPercentage;

    @Column(name = "allocated_at")
    private LocalDateTime allocatedAt;

    private String status;

    public Allocation() {
    }

    @PrePersist
    public void prePersist() {
        allocatedAt = LocalDateTime.now();

        if (status == null) {
            status = "ALLOCATED";
        }
    }

    // ================= Getters & Setters =================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Internship getInternship() {
        return internship;
    }

    public void setInternship(Internship internship) {
        this.internship = internship;
    }

    public Application getApplication() { return application; }

    public void setApplication(Application application) { this.application = application; }

    public Double getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(Double matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public LocalDateTime getAllocatedAt() {
        return allocatedAt;
    }

    public void setAllocatedAt(LocalDateTime allocatedAt) {
        this.allocatedAt = allocatedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
