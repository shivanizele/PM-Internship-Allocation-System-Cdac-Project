package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CompanyDashboardResponse;
import com.app.dto.CompanyProfileRequest;
import com.app.dto.CompanyResponse;
import com.app.dto.InternshipResponse;
import com.app.entity.Company;
import com.app.entity.Internship;
import com.app.entity.Skill;
import com.app.repository.AllocationRepository;
import com.app.repository.ApplicationRepository;
import com.app.repository.CompanyRepository;
import com.app.repository.InternshipRepository;

@Service
public class CompanyService {

	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private InternshipRepository internshipRepository;
	@Autowired
	private ApplicationRepository applicationRepository;

	@Autowired
	private AllocationRepository allocationRepository;

	// get company
	public CompanyResponse getCompany(Long id) {

		Company company = companyRepository.findById(id).orElseThrow(() -> new RuntimeException("Company not found"));

		return new CompanyResponse(company.getId(), company.getCompanyName(), company.getIndustry(),
				company.getAddress(), company.getWebsite(), company.getUser().getEmail());
	}

	// update comany

	public CompanyResponse updateCompany(Long id, CompanyProfileRequest request) {

		Company company = companyRepository.findById(id).orElseThrow(() -> new RuntimeException("Company not found"));

		company.setCompanyName(request.getCompanyName());
		company.setIndustry(request.getIndustry());
		company.setAddress(request.getAddress());
		company.setWebsite(request.getWebsite());

		companyRepository.save(company);

		return getCompany(id);
	}

	// getcompany internships
	public List<InternshipResponse> getCompanyInternships(Long companyId) {

		List<Internship> internships = internshipRepository.findByCompanyId(companyId);

		return internships.stream()
				.map(i -> new InternshipResponse(i.getId(), i.getTitle(), i.getDescription(),
						i.getRequiredSkills().stream().map(Skill::getSkillName).collect(Collectors.toSet()),
						i.getLocation(), i.getStipend(), i.getMinimumCgpa(), i.getDurationMonths(),
						i.getAvailableSeats(), i.getCompany().getCompanyName()))
				.collect(Collectors.toList());
	}
	
	

	// get companyBy userID
	public CompanyResponse getCompanyByUserId(Long userId) {

		Company company = companyRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Company not found"));

		return getCompany(company.getId());
	}
	
	public List<CompanyResponse> getAllCompanies() {

	    return companyRepository.findAll()
	            .stream()
	            .map(company ->

	                new CompanyResponse(

	                    company.getId(),
	                    company.getCompanyName(),
	                    company.getIndustry(),
	                    company.getAddress(),
	                    company.getWebsite(),
	                    company.getUser().getEmail()

	                )

	            )
	            .toList();
	}
	
	public void deleteCompany(Long id) {

	    companyRepository.deleteById(id);
	}
	

	public CompanyDashboardResponse getDashboard(Long companyId) {

	    long internships =
	            internshipRepository.countByCompanyId(companyId);

	    long applications =
	            applicationRepository.countByCompanyId(companyId);

	    long selected =
	            allocationRepository.countByCompanyId(companyId);

	    long availableSeats =
	            internshipRepository.findByCompanyId(companyId)
	                    .stream()
	                    .mapToLong(Internship::getAvailableSeats)
	                    .sum();

	    return new CompanyDashboardResponse(

	            internships,

	            applications,

	            selected,

	            availableSeats

	    );
	}
	
	

	
}
