package com.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.app.entity.Internship;


public interface InternshipRepository extends JpaRepository<Internship, Long> {
	List<Internship> findByLocation(String location);

	List<Internship> findByCompanyId(Long companyId);
	long countByCompanyId(Long companyId);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Internship i WHERE i.company.id = :companyId")
	void deleteByCompanyId(Long companyId);
}