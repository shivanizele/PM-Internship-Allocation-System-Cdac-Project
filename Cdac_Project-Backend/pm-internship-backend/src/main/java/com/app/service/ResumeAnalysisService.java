package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.dto.ResumeAnalysisResponse;
import com.app.exception.AIIntegrationException;

@Service
public class ResumeAnalysisService {

    private static final Logger log = LoggerFactory.getLogger(ResumeAnalysisService.class);

    private final ChatClient chatClient;
    private final String apiKey;

    public ResumeAnalysisService(ChatClient chatClient,
            @Value("${spring.ai.google.genai.api-key:}") String apiKey) {
        this.chatClient = chatClient;
        this.apiKey = apiKey;
    }

    public ResumeAnalysisResponse analyzeResume(String resumeText) {

        if (resumeText == null || resumeText.isBlank()) {
            throw new AIIntegrationException("Resume text is empty and cannot be analyzed");
        }

        if (apiKey == null || apiKey.isBlank()) {
            throw new AIIntegrationException("Gemini API key is not configured");
        }

        String prompt = buildPrompt(truncate(resumeText, 15000));

        try {
            ResumeAnalysisResponse response = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .entity(ResumeAnalysisResponse.class);

            return sanitize(response);
        } catch (AIIntegrationException ex) {
            // Preserve validation errors produced by sanitize() instead of masking them
            // as a provider failure.
            throw ex;
        } catch (Exception ex) {
            // The HTTP status and Gemini error are intentionally kept in server logs.
            // They are needed to distinguish a bad key, quota limit, unavailable model,
            // or malformed provider response without exposing provider details to the UI.
            log.error("Gemini resume analysis failed: {}", ex.getMessage(), ex);
            throw new AIIntegrationException("Failed to analyze resume with Gemini", ex);
        }
    }

    private String buildPrompt(String resumeText) {
        return """
                Analyze the following student resume text and extract structured information.
                Return only valid JSON that maps exactly to the target object fields.
                Do not include markdown, explanations, or inferred facts that are not supported by the resume.
                Use empty arrays when information is missing. Use null for cgpa if it is not present.

                Required fields:
                - skills
                - programmingLanguages
                - technologies
                - frameworks
                - projects
                - experience
                - education
                - cgpa
                - preferredLocation

                Resume text:
                %s
                """.formatted(resumeText);
    }

    private ResumeAnalysisResponse sanitize(ResumeAnalysisResponse response) {

        if (response == null) {
            throw new AIIntegrationException("Gemini returned an empty response");
        }

        response.setSkills(safeList(response.getSkills()));
        response.setProgrammingLanguages(safeList(response.getProgrammingLanguages()));
        response.setTechnologies(safeList(response.getTechnologies()));
        response.setFrameworks(safeList(response.getFrameworks()));
        response.setProjects(safeList(response.getProjects()));
        response.setExperience(safeList(response.getExperience()));
        response.setEducation(safeList(response.getEducation()));

        boolean noStructuredData = response.getSkills().isEmpty()
                && response.getProgrammingLanguages().isEmpty()
                && response.getTechnologies().isEmpty()
                && response.getFrameworks().isEmpty()
                && response.getProjects().isEmpty()
                && response.getExperience().isEmpty()
                && response.getEducation().isEmpty()
                && response.getCgpa() == null
                && (response.getPreferredLocation() == null || response.getPreferredLocation().isBlank());

        if (noStructuredData) {
            throw new AIIntegrationException("Gemini returned an invalid resume analysis response");
        }

        return response;
    }

    private List<String> safeList(List<String> values) {

        List<String> sanitized = new ArrayList<>();

        if (values == null) {
            return sanitized;
        }

        for (String value : values) {
            if (value != null) {
                String trimmed = value.trim();
                if (!trimmed.isEmpty()) {
                    sanitized.add(trimmed);
                }
            }
        }

        return sanitized;
    }

    private String truncate(String value, int maxLength) {
        if (value.length() <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength);
    }
}
