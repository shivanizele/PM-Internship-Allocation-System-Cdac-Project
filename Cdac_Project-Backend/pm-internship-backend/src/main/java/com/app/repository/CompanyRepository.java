package com.app.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Company;


public interface CompanyRepository extends JpaRepository<Company, Long> {
	Optional<Company> findByUserId(Long userId);
}