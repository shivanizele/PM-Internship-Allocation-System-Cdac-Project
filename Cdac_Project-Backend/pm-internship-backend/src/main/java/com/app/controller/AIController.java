package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.MatchResponse;
import com.app.service.AIRecommendationService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("http://localhost:3000")
public class AIController {

    @Autowired
    private AIRecommendationService aiService;

    @GetMapping("/recommend/{studentId}")
    public List<MatchResponse> recommend(
            @PathVariable Long studentId) {

        return aiService.recommendInternships(studentId);
    }
}