package com.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Resume;


public interface ResumeRepository extends JpaRepository<Resume, Long> {
	List<Resume> findByStudentId(Long studentId);
}