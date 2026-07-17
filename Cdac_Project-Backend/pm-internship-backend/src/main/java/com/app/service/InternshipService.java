package com.app.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.InternshipRequest;
import com.app.dto.InternshipResponse;
import com.app.entity.Company;
import com.app.entity.Internship;
import com.app.entity.Skill;
import com.app.repository.CompanyRepository;
import com.app.repository.InternshipRepository;
import com.app.repository.SkillRepository;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private SkillRepository skillRepository;

    public InternshipResponse createInternship(InternshipRequest request) {

        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() ->
                        new RuntimeException("Company not found"));

        Internship internship = new Internship();

        internship.setTitle(request.getTitle());
        internship.setDescription(request.getDescription());
        internship.setLocation(request.getLocation());
        internship.setStipend(request.getStipend());
        internship.setCompany(company);
        internship.setMinimumCgpa(request.getMinimumCgpa());
        internship.setDurationMonths(request.getDurationMonths());
        Set<Skill> skills = new HashSet<>();

        for (String skillName : request.getRequiredSkills()) {

            Skill skill = skillRepository
                    .findBySkillName(skillName)
                    .orElseGet(() -> {

                        Skill s = new Skill();
                        s.setSkillName(skillName);

                        return skillRepository.save(s);
                    });

            skills.add(skill);
        }

        internship.setRequiredSkills(skills);

        internshipRepository.save(internship);

        return getInternship(internship.getId());
    }

    public InternshipResponse getInternship(Long id) {

        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Internship not found"));

        Set<String> skills = internship.getRequiredSkills()
                .stream()
                .map(Skill::getSkillName)
                .collect(Collectors.toSet());

        return new InternshipResponse(
                internship.getId(),
                internship.getTitle(),
                internship.getDescription(),
                skills,
                internship.getLocation(),
                internship.getStipend(),
                internship.getCompany().getCompanyName()
        );
    }

    public List<InternshipResponse> getAllInternships() {

        return internshipRepository.findAll()
                .stream()
                .map(i -> {

                    Set<String> skills = i.getRequiredSkills()
                            .stream()
                            .map(Skill::getSkillName)
                            .collect(Collectors.toSet());

                    return new InternshipResponse(
                            i.getId(),
                            i.getTitle(),
                            i.getDescription(),
                            skills,
                            i.getLocation(),
                            i.getStipend(),
                            
                            i.getCompany().getCompanyName()
                    );
                })
                .collect(Collectors.toList());
    }

    public InternshipResponse updateInternship(
            Long id,
            InternshipRequest request) {

        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Internship not found"));

        internship.setTitle(request.getTitle());
        internship.setDescription(request.getDescription());
        internship.setLocation(request.getLocation());
        internship.setStipend(request.getStipend());

        Set<Skill> skills = new HashSet<>();

        for (String skillName : request.getRequiredSkills()) {

            Skill skill = skillRepository
                    .findBySkillName(skillName)
                    .orElseGet(() -> {

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

    public String deleteInternship(Long id) {

        internshipRepository.deleteById(id);

        return "Internship deleted successfully";
    }
}