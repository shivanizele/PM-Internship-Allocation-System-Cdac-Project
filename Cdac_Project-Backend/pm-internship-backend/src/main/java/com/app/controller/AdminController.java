package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.AdminDashboardResponse;
import com.app.dto.AllocationResponse;
import com.app.dto.CompanyResponse;
import com.app.dto.InternshipResponse;
import com.app.dto.StudentResponse;
import com.app.service.AdminService;
import com.app.service.AllocationService;
import com.app.service.CompanyService;
import com.app.service.InternshipService;
import com.app.service.StudentService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private CompanyService companyService;
    
    @Autowired
    private InternshipService internshipService;

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {
        return adminService.getDashboard();
    }
    
    @GetMapping("/students")
    public List<StudentResponse> getAllStudents() {

        return studentService.getAllStudents();
    }

    @DeleteMapping("/students/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully";
    }
    
    @GetMapping("/companies")
    public List<CompanyResponse> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @DeleteMapping("/companies/{id}")
    public String deleteCompany(@PathVariable Long id) {

        companyService.deleteCompany(id);

        return "Company deleted successfully";
    }
    

    @GetMapping("/internships")
    public List<InternshipResponse> getAllInternships() {

        return internshipService.getAllInternships();
    }

    @DeleteMapping("/internships/{id}")
    public String deleteInternship(@PathVariable Long id) {

        internshipService.deleteInternship(id);

        return "Internship deleted successfully";
    }
    
   
    @Autowired
    private AllocationService allocationService;

    @GetMapping("/allocations")
    public List<AllocationResponse> getAllAllocations() {

        return allocationService.getAllAllocations();
    }

    @DeleteMapping("/allocations/{id}")
    public String deleteAllocation(@PathVariable Long id) {

        allocationService.deleteAllocation(id);

        return "Allocation deleted successfully";
    }
  
    
    @PostMapping("/allocate")
    public String runAllocation() {
        return "Use GET /api/allocation/preview to review recommendations, then POST /api/allocation/confirm.";

    }
   


   

}
