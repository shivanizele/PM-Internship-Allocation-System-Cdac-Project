package com.app.dto;

public class CompanyResponse {

    private Long id;
    private String companyName;
    private String industry;
    private String address;
    private String website;
    private String email;

    public CompanyResponse() {
    }

    public CompanyResponse(Long id,
                           String companyName,
                           String industry,
                           String address,
                           String website,
                           String email) {

        this.id = id;
        this.companyName = companyName;
        this.industry = industry;
        this.address = address;
        this.website = website;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}