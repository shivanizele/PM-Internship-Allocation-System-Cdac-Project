package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CompanyProfileRequest;
import com.app.dto.CompanyResponse;
import com.app.entity.Company;
import com.app.repository.CompanyRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public CompanyResponse getCompany(Long id) {

        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        return new CompanyResponse(
                company.getId(),
                company.getCompanyName(),
                company.getIndustry(),
                company.getAddress(),
                company.getWebsite(),
                company.getUser().getEmail()
        );
    }

    public CompanyResponse updateCompany(Long id,
                                         CompanyProfileRequest request) {

        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setCompanyName(request.getCompanyName());
        company.setIndustry(request.getIndustry());
        company.setAddress(request.getAddress());
        company.setWebsite(request.getWebsite());

        companyRepository.save(company);

        return getCompany(id);
    }
}