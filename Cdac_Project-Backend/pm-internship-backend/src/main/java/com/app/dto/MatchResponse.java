package com.app.dto;

public class MatchResponse {

	private Long internshipId;
	private String internshipTitle;
	private String companyName;
	private double matchPercentage;

	public MatchResponse() {
	}

	public MatchResponse(Long internshipId, String internshipTitle, String companyName, double matchPercentage) {

		this.internshipId = internshipId;
		this.internshipTitle = internshipTitle;
		this.companyName = companyName;
		this.matchPercentage = matchPercentage;
	}

	public Long getInternshipId() {
		return internshipId;
	}

	public void setInternshipId(Long internshipId) {
		this.internshipId = internshipId;
	}

	public String getInternshipTitle() {
		return internshipTitle;
	}

	public void setInternshipTitle(String internshipTitle) {
		this.internshipTitle = internshipTitle;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public double getMatchPercentage() {
		return matchPercentage;
	}

	public void setMatchPercentage(double matchPercentage) {
		this.matchPercentage = matchPercentage;
	}
}