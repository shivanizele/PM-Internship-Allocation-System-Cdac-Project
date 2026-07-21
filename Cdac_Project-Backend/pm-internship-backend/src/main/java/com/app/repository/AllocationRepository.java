package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Allocation;

public interface AllocationRepository
        extends JpaRepository<Allocation, Long> {

    Optional<Allocation> findByStudentId(Long studentId);

    List<Allocation> findByInternshipId(Long internshipId);
    
    @Query("""
    SELECT COUNT(a)
    FROM Allocation a
    WHERE a.internship.company.id = :companyId
    """)
    long countByCompanyId(Long companyId);
    

}