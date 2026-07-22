package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.entity.Student;
import com.app.repository.StudentRepository;
import org.springframework.http.MediaType;

@Service
public class ResumeService {

    @Autowired
    private StudentRepository studentRepository;

    private final String UPLOAD_DIR = "uploads/";

    // Upload Resume
    public String uploadResume(Long studentId, MultipartFile file) {

        try {

            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            // Create uploads folder if not exists
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String fileName = studentId + "_" + file.getOriginalFilename();

            Files.copy(
                    file.getInputStream(),
                    uploadPath.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING);

            // Save filename in database
            student.setResume(fileName);

            studentRepository.save(student);

            return "Resume uploaded successfully";

        } catch (IOException e) {
            throw new RuntimeException("Could not upload file", e);
        }
    }

    // Download/View Resume
    public ResponseEntity<Resource> downloadResume(String fileName) {

        try {

            Path path = Paths.get(UPLOAD_DIR).resolve(fileName);

            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                throw new RuntimeException("Resume not found");
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}