package com.app.dto;

import java.util.Set;

public class InternshipResponse {

    private Long id;
    private String title;
    private String description;
    private Set<String> requiredSkills;
    private String location;
    private Double stipend;
    private Integer durationMonths;
    private String companyName;

    public InternshipResponse() {
    }

    public InternshipResponse(Long id,
                              String title,
                              String description,
                              Set<String> requiredSkills,
                              String location,
                              Double stipend,
                              String companyName) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.requiredSkills = requiredSkills;
        this.location = location;
        this.stipend = stipend;
        this.companyName = companyName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<String> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(Set<String> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getStipend() {
        return stipend;
    }

    public void setStipend(Double stipend) {
        this.stipend = stipend;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

	public Integer getDurationMonths() {
		return durationMonths;
	}

	public void setDurationMonths(Integer durationMonths) {
		this.durationMonths = durationMonths;
	}
    
}