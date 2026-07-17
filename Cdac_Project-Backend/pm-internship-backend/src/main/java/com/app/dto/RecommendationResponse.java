package com.app.dto;

public class RecommendationResponse {

	private Long internshipId;
	private String title;
	private String companyName;
	private Double score;

	public RecommendationResponse() {
	}

	public RecommendationResponse(Long internshipId, String title, String companyName, Double score) {

		this.internshipId = internshipId;
		this.title = title;
		this.companyName = companyName;
		this.score = score;
	}

	public Long getInternshipId() {
		return internshipId;
	}

	public void setInternshipId(Long internshipId) {
		this.internshipId = internshipId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Double getScore() {
		return score;
	}

	public void setScore(Double score) {
		this.score = score;
	}
}