package com.app.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Application;
import com.app.entity.Company;
import com.app.entity.User;


public interface CompanyRepository extends JpaRepository<Company, Long> {
	 Optional<Company> findByUser(User user);
	Optional<Company> findByUserId(Long userId);
//	List<Application> findByInternshipCompanyId(Long companyId);
	
	
}