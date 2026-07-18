package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.CompanyProfileRequest;
import com.app.dto.CompanyResponse;
import com.app.dto.InternshipResponse;
import com.app.service.CompanyService;

@RestController
@RequestMapping("/api/company")
@CrossOrigin("http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/profile/{id}")
    public CompanyResponse getCompany(@PathVariable Long id) {
        return companyService.getCompany(id);
    }

    @PutMapping("/profile/{id}")
    public CompanyResponse updateCompany(@PathVariable Long id,
                                         @RequestBody CompanyProfileRequest request) {

        return companyService.updateCompany(id, request);
    }
    
    @GetMapping("/{companyId}/internships")
    public List<InternshipResponse> getCompanyInternships(
            @PathVariable Long companyId) {

        return companyService.getCompanyInternships(companyId);
    }
    
    @GetMapping("/user/{userId}")
    public CompanyResponse getCompanyByUserId(@PathVariable Long userId) {

        return companyService.getCompanyByUserId(userId);
    }

}