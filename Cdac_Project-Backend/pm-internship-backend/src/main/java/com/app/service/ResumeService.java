package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import com.app.entity.Application;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.entity.Student;
import com.app.entity.User;
import com.app.exception.ResourceNotFoundException;
import com.app.exception.ResumeProcessingException;
import com.app.repository.ApplicationRepository;
import com.app.repository.StudentRepository;
import org.springframework.http.MediaType;

@Service
public class ResumeService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private AccessControlService accessControlService;

    @Value("${app.resume.upload-dir:uploads}")
    private String uploadDir;

    // Upload Resume
    public String uploadResume(Long studentId, MultipartFile file) {

        try {

            Student student = accessControlService.requireStudent(studentId);
            validateFile(file);

            // Create uploads folder if not exists
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalName = Paths.get(file.getOriginalFilename()).getFileName().toString();
            String fileName = studentId + "_" + System.currentTimeMillis() + "_" + originalName;

            Files.copy(
                    file.getInputStream(),
                    uploadPath.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING);

            // Save filename in database
            student.setResume(fileName);
            studentRepository.save(student);

            // Update all previous applications with the latest resume
            List<Application> applications = applicationRepository.findByStudentId(studentId);

            for (Application application : applications) {
                application.setResume(fileName);
            }

            applicationRepository.saveAll(applications);

            return "Resume uploaded successfully";

        } catch (IOException e) {
            throw new ResumeProcessingException("Could not upload resume", e);
        }
    }

    // Download/View Resume
    public ResponseEntity<Resource> downloadResume(String fileName) {

        try {

            if (fileName == null || !fileName.equals(Paths.get(fileName).getFileName().toString())) {
                throw new ResumeProcessingException("Invalid resume file reference");
            }

            authorizeDownload(fileName);

            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Path path = uploadPath.resolve(fileName).normalize();
            System.out.println("Upload Directory : " + uploadPath);
            System.out.println("Requested File   : " + fileName);
            System.out.println("Full Path        : " + path);
            System.out.println("File Exists      : " + Files.exists(path));
            if (!path.startsWith(uploadPath)) {
                throw new ResumeProcessingException("Invalid resume file reference");
            }

            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                throw new ResourceNotFoundException("Resume not found");
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (ResourceNotFoundException | ResumeProcessingException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();   // Print the real error in the console
            throw new ResumeProcessingException("Could not load resume", e);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResumeProcessingException("Please select a non-empty PDF resume");
        }
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new ResumeProcessingException("Resume must be 10 MB or smaller");
        }
        String originalName = file.getOriginalFilename();
        if (originalName == null || !originalName.toLowerCase().endsWith(".pdf")) {
            throw new ResumeProcessingException("Only PDF resumes are accepted");
        }
    }

    private void authorizeDownload(String fileName) {
        User user = accessControlService.currentUser();
        if (user.getRole().name().equals("ADMIN")) {
            return;
        }

        List<Application> applications = applicationRepository.findAllByResume(fileName);

        if (applications.isEmpty()) {
            throw new ResourceNotFoundException("Resume not found");
        }

        Application application = applications.get(0);

        if (user.getRole().name().equals("STUDENT")
                && application.getStudent().getUser().getId().equals(user.getId())) {
            return;
        }
        if (user.getRole().name().equals("COMPANY")) {
            return;
        }
        throw new org.springframework.security.access.AccessDeniedException("You are not allowed to view this resume");
    }
}
