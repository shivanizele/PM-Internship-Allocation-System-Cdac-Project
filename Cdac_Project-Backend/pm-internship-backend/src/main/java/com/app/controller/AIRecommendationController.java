package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.InternshipRecommendationDTO;
import com.app.service.AIRecommendationService;

@RestController
@RequestMapping("/api/recommend")
@CrossOrigin("http://localhost:3000")
public class AIRecommendationController {

    @Autowired
    private AIRecommendationService aiService;

    @GetMapping("/{studentId}")
    public List<InternshipRecommendationDTO> recommend(
            @PathVariable Long studentId) {

        return aiService.recommendInternships(studentId);
    }
}
