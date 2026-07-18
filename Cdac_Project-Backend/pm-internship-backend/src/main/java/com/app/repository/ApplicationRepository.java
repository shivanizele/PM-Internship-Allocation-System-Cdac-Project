package com.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Application;
import com.app.entity.Internship;
import com.app.entity.Student;


public interface ApplicationRepository extends JpaRepository<Application, Long> {
	List<Application> findByStudentId(Long studentId);

	List<Application> findByInternshipId(Long internshipId);

	boolean existsByStudentAndInternship(Student student, Internship internship);
	List<Application> findByInternshipCompanyId(Long companyId);
}