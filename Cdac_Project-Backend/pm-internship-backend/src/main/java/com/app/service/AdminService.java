package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AdminDashboardResponse;
import com.app.repository.AllocationRepository;
import com.app.repository.ApplicationRepository;
import com.app.repository.CompanyRepository;
import com.app.repository.InternshipRepository;
import com.app.repository.StudentRepository;

@Service
public class AdminService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private AllocationRepository allocationRepository;

    public AdminDashboardResponse getDashboard() {

        long totalStudents = studentRepository.count();
        long totalCompanies = companyRepository.count();
        long totalInternships = internshipRepository.count();
        long totalApplications = applicationRepository.count();
        long totalAllocations = allocationRepository.count();

        double placementPercentage = 0;

        if (totalStudents > 0) {
            placementPercentage =
                    (totalAllocations * 100.0) / totalStudents;
        }

        return new AdminDashboardResponse(
                totalStudents,
                totalCompanies,
                totalInternships,
                totalApplications,
                totalAllocations,
                placementPercentage
        );
    }
}