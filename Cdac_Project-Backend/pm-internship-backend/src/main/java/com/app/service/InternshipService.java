package com.app.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.InternshipRequest;
import com.app.dto.InternshipResponse;
import com.app.entity.Company;
import com.app.entity.Internship;
import com.app.entity.Skill;
import com.app.repository.CompanyRepository;
import com.app.repository.InternshipRepository;
import com.app.repository.SkillRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class InternshipService {

	@Autowired
	private InternshipRepository internshipRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private SkillRepository skillRepository;

	@Autowired
	private AccessControlService accessControlService;

//create internship 
	public InternshipResponse createInternship(InternshipRequest request, HttpServletRequest httpRequest) {

		Company company = accessControlService.currentCompany();

		Internship internship = new Internship();

		internship.setTitle(request.getTitle());
		internship.setDescription(request.getDescription());
		internship.setLocation(request.getLocation());
		internship.setStipend(request.getStipend());
		internship.setMinimumCgpa(request.getMinimumCgpa());
		internship.setDurationMonths(request.getDurationMonths());
		internship.setAvailableSeats(request.getAvailableSeats());

		Set<Skill> skills = new HashSet<>();

		for (String skillName : request.getRequiredSkills()) {

			Skill skill = skillRepository.findBySkillName(skillName).orElseGet(() -> {

				Skill s = new Skill();
				s.setSkillName(skillName);

				return skillRepository.save(s);
			});

			skills.add(skill);
		}

		internship.setRequiredSkills(skills);

		// Automatically assign the logged-in company
		internship.setCompany(company);

		internshipRepository.save(internship);

		return getInternship(internship.getId());
	}

	// get internship by id
	public InternshipResponse getInternship(Long id) {

		Internship internship = internshipRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Internship not found"));

		accessControlService.requireCompany(internship.getCompany().getId());

		Set<String> skills = internship.getRequiredSkills().stream().map(Skill::getSkillName)
				.collect(Collectors.toSet());

		return new InternshipResponse(internship.getId(), internship.getTitle(), internship.getDescription(), skills,
				internship.getLocation(), internship.getStipend(), internship.getMinimumCgpa(),
				internship.getDurationMonths(), internship.getAvailableSeats(),
				internship.getCompany().getCompanyName());
	}

	public List<InternshipResponse> getAllInternships() {

		return internshipRepository.findAll().stream().map(i -> {

			Set<String> skills = i.getRequiredSkills().stream().map(Skill::getSkillName).collect(Collectors.toSet());

			return new InternshipResponse(i.getId(), i.getTitle(), i.getDescription(), skills, i.getLocation(),
					i.getStipend(), i.getMinimumCgpa(), i.getDurationMonths(), i.getAvailableSeats(),
					i.getCompany().getCompanyName());
		}).collect(Collectors.toList());
	}

	// update internship

	public InternshipResponse updateInternship(Long id, InternshipRequest request) {

		Internship internship = internshipRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Internship not found"));

		accessControlService.requireCompany(internship.getCompany().getId());

		internship.setTitle(request.getTitle());
		internship.setDescription(request.getDescription());
		internship.setLocation(request.getLocation());
		internship.setStipend(request.getStipend());
		internship.setMinimumCgpa(request.getMinimumCgpa());
		internship.setDurationMonths(request.getDurationMonths());
		internship.setAvailableSeats(request.getAvailableSeats());
//        Company company = companyRepository.findById(request.getCompanyId())
//                .orElseThrow(() -> new RuntimeException("Company not found"));
//
//        internship.setCompany(company);

		Set<Skill> skills = new HashSet<>();

		for (String skillName : request.getRequiredSkills()) {

			Skill skill = skillRepository.findBySkillName(skillName).orElseGet(() -> {

				Skill s = new Skill();
				s.setSkillName(skillName);

				return skillRepository.save(s);
			});

			skills.add(skill);
		}

		internship.setRequiredSkills(skills);

		internshipRepository.save(internship);

		return getInternship(id);
	}

	@Transactional
	public void deleteInternship(Long id) {

		Internship internship = internshipRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Internship not found"));

		internshipRepository.delete(internship);
	}

}
