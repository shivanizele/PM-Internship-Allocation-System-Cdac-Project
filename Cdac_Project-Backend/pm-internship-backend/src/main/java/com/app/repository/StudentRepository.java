package com.app.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Student;
import com.app.entity.User;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

    Optional<Student> findByUser(User user);

}