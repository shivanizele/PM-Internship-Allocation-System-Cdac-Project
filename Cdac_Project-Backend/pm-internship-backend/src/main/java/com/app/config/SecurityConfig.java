package com.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.security.JwtFilter;

@Configuration
public class SecurityConfig {

	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

		return config.getAuthenticationManager();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())

				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				.authorizeHttpRequests(auth -> auth

						// Public APIs
						.requestMatchers("/api/auth/**", "/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**")
						.permitAll()

						// Student APIs
						.requestMatchers("/api/student/**").hasRole("STUDENT")

						// Company APIs
						.requestMatchers("/api/company/**").hasRole("COMPANY")

						// Admin APIs
						.requestMatchers("/api/admin/**").hasRole("ADMIN")

						// Recommendation APIs
						.requestMatchers("/api/recommend/**").hasAnyRole("STUDENT", "ADMIN")

						// Application APIs
						.requestMatchers("/api/applications/**").hasRole("STUDENT")

						// Internship APIs
						.requestMatchers("/api/internships/**").hasAnyRole("COMPANY", "ADMIN")

						// Allocation APIs
						.requestMatchers("/api/allocation/**").hasRole("ADMIN")

						.anyRequest().authenticated()

				);
		http.addFilterBefore(jwtFilter,
		        UsernamePasswordAuthenticationFilter.class);
		

		return http.build();
	}
}