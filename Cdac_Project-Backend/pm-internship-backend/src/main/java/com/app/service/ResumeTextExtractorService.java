package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.app.entity.Student;
import com.app.exception.ResourceNotFoundException;
import com.app.exception.ResumeProcessingException;

@Service
public class ResumeTextExtractorService {

    private final Path uploadRoot;

    public ResumeTextExtractorService(@Value("${app.resume.upload-dir:uploads}") String uploadDir) {
        this.uploadRoot = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public String extractTextForStudent(Student student) {

        if (student == null) {
            throw new ResourceNotFoundException("Student not found");
        }

        if (student.getResume() == null || student.getResume().isBlank()) {
            throw new ResourceNotFoundException("Resume not found for this student");
        }

        Path resumePath = uploadRoot.resolve(student.getResume()).normalize();

        if (!resumePath.startsWith(uploadRoot)) {
            throw new ResumeProcessingException("Invalid resume file reference");
        }

        if (!Files.exists(resumePath) || !Files.isRegularFile(resumePath)) {
            throw new ResourceNotFoundException("Uploaded resume file was not found");
        }

        if (!student.getResume().toLowerCase().endsWith(".pdf")) {
            throw new ResumeProcessingException("Uploaded resume is not a PDF file");
        }

        try (PDDocument document = Loader.loadPDF(resumePath.toFile())) {

            String extractedText = new PDFTextStripper().getText(document);

            if (extractedText == null || extractedText.isBlank()) {
                throw new ResumeProcessingException(
                        "Resume PDF contains no extractable text. Please upload a text-based PDF.");
            }

            return extractedText.trim();
        } catch (IOException ex) {
            throw new ResumeProcessingException("Unable to read the uploaded resume PDF", ex);
        }
    }
}
