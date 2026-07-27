package com.app.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.app.dto.InternshipRecommendationDTO;

@Service
public class AIRecommendationService {

	private final RecommendationService recommendationService;

	public AIRecommendationService(RecommendationService recommendationService) {
		this.recommendationService = recommendationService;
	}

	public List<InternshipRecommendationDTO> recommendInternships(Long studentId) {
		return recommendationService.recommendInternships(studentId);
	}
}
