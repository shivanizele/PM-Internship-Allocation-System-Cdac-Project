package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.CompanyProfileRequest;
import com.app.dto.CompanyResponse;
import com.app.service.CompanyService;

@RestController
@RequestMapping("/api/company")
@CrossOrigin("http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/{id}")
    public CompanyResponse getCompany(@PathVariable Long id) {

        return companyService.getCompany(id);
    }

    @PutMapping("/{id}")
    public CompanyResponse updateCompany(
            @PathVariable Long id,
            @RequestBody CompanyProfileRequest request) {

        return companyService.updateCompany(id, request);
    }
}