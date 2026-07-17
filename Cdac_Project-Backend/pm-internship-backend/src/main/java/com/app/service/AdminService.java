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

        long students = studentRepository.count();
        long companies = companyRepository.count();
        long internships = internshipRepository.count();
        long applications = applicationRepository.count();
        long allocations = allocationRepository.count();

        double placement = 0.0;

        if (students > 0) {
            placement = (allocations * 100.0) / students;
        }

        return new AdminDashboardResponse(
                students,
                companies,
                internships,
                applications,
                allocations,
                placement
        );
    }
}