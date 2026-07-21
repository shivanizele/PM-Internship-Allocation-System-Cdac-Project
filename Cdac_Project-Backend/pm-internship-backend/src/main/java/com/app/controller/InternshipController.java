package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.InternshipRequest;
import com.app.dto.InternshipResponse;
import com.app.service.InternshipService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin("http://localhost:3000")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

//    @PostMapping
//    public InternshipResponse createInternship(
//            @RequestBody InternshipRequest request) {
//
//        return internshipService.createInternship(request);
//    }
    @PostMapping
    public InternshipResponse createInternship(
            @RequestBody InternshipRequest request,
            HttpServletRequest httpRequest) {

        return internshipService.createInternship(request, httpRequest);
    }

    @GetMapping("/{id}")
    public InternshipResponse getInternship(
            @PathVariable Long id) {

        return internshipService.getInternship(id);
    }

    @GetMapping
    public List<InternshipResponse> getAllInternships() {

        return internshipService.getAllInternships();
    }

    @PutMapping("/{id}")
    public InternshipResponse updateInternship(
            @PathVariable Long id,
            @RequestBody InternshipRequest request) {

        return internshipService.updateInternship(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteInternship(
            @PathVariable Long id) {
        System.out.println("DELETE Controller called. Internship ID = " + id);

        return internshipService.deleteInternship(id);
    }
}