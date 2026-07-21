package com.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Internship;


public interface InternshipRepository extends JpaRepository<Internship, Long> {
	List<Internship> findByLocation(String location);

	List<Internship> findByCompanyId(Long companyId);
	long countByCompanyId(Long companyId);
}