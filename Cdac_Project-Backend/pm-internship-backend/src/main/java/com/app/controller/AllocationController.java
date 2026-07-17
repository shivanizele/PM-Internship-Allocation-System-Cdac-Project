package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.AllocationResponse;
import com.app.service.AllocationService;

@RestController
@RequestMapping("/api/allocation")
@CrossOrigin("http://localhost:3000")
public class AllocationController {

    @Autowired
    private AllocationService allocationService;

    @PostMapping("/run")
    public String runAllocation() {

        return allocationService.runAllocation();
    }

    @GetMapping
    public List<AllocationResponse> getAllAllocations() {

        return allocationService.getAllAllocations();
    }
}