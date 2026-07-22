package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.app.service.ResumeService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("http://localhost:3000")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping(value = "/upload/{studentId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadResume(
            @PathVariable Long studentId,
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                resumeService.uploadResume(studentId, file));
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable String fileName) {

        return resumeService.downloadResume(fileName);
    }

}