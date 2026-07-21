package com.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Application;
import com.app.entity.Internship;
import com.app.entity.Student;


public interface ApplicationRepository extends JpaRepository<Application, Long> {
	List<Application> findByStudentId(Long studentId);

	List<Application> findByInternshipId(Long internshipId);

	boolean existsByStudentAndInternship(Student student, Internship internship);
	List<Application> findByInternshipCompanyId(Long companyId);
	
	@Query("""
	SELECT COUNT(a)
	FROM Application a
	WHERE a.internship.company.id = :companyId
	""")
	long countByCompanyId(Long companyId);
	
	List<Application> findByInternship_Company_Id(Long companyId);

}