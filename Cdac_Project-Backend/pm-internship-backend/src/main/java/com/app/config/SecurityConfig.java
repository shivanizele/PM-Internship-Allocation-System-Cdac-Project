package com.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                    // Public APIs
                    .requestMatchers(
                            "/api/auth/**",
                            "/api/resume/**",
                            "/api/student/**",
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**")
                    .permitAll()

                    // Recommendation
                    .requestMatchers("/api/ai/**")
                    .hasAnyRole("STUDENT", "ADMIN")

                    .requestMatchers("/api/recommend/**")
                    .hasAnyRole("STUDENT", "ADMIN")

                    // Applications
                    .requestMatchers("/api/applications/**")
                    .hasAnyRole("STUDENT", "COMPANY", "ADMIN")

                    // Internship APIs
                    .requestMatchers(HttpMethod.GET, "/api/internships/**")
                    .hasAnyRole("STUDENT", "COMPANY", "ADMIN")

                    .requestMatchers("/api/internships/**")
                    .hasAnyRole("COMPANY", "ADMIN")

                    // Company
                    .requestMatchers("/api/company/**")
                    .hasRole("COMPANY")

                    // Admin
                    .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")
                    
                    .requestMatchers("/api/test/**").permitAll()

                    // Allocation
                    .requestMatchers("/api/allocation/**")
                    .hasRole("ADMIN")
                    

                    .anyRequest()
                    .authenticated()
            )

            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
//    @Bean
//    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//    	http
//        .cors(cors -> {})
//        .csrf(csrf -> csrf.disable())
//
//            .sessionManagement(session ->
//                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//
//            .authorizeHttpRequests(auth -> auth
//
//                // Public APIs
//                .requestMatchers(
//                        "/api/auth/**",
//                        "/swagger-ui/**",
//                        "/swagger-ui.html",
//                        "/v3/api-docs/**")
//                .permitAll()
//
//                // Student APIs
//                .requestMatchers("/api/student/**")
//                .permitAll() // Change to hasRole("STUDENT") later
//
//                // Company APIs
//                .requestMatchers("/api/company/**")
//                .hasRole("COMPANY")
//
//                // Admin APIs
//                .requestMatchers("/api/admin/**")
//                .hasRole("ADMIN")
//
//                // Recommendation APIs
//                .requestMatchers("/api/recommend/**")
//                .hasAnyRole("STUDENT", "ADMIN")
//
//                // Application APIs
//                .requestMatchers("/api/applications/**")
//                .hasAnyRole("STUDENT", "COMPANY", "ADMIN")
//
//                // Internship APIs
////                .requestMatchers("/api/internships/**")
////                .hasAnyRole("COMPANY", "ADMIN")
//                .requestMatchers(HttpMethod.GET, "/api/internships/**")
//                .hasAnyRole("STUDENT", "COMPANY", "ADMIN")
//
//                .requestMatchers("/api/internships/**")
//                .hasAnyRole("COMPANY", "ADMIN")
//                
//                .requestMatchers(
//                        "/api/auth/**",
//                        "/swagger-ui/**",
//                        "/swagger-ui.html",
//                        "/v3/api-docs/**")
//                .permitAll()
//
//                .requestMatchers("/api/resume/**")
//                .permitAll()
//
//                .requestMatchers("/api/student/**")
//                .permitAll()
//
//                // Allocation APIs
//                .requestMatchers("/api/allocation/**")
//                .hasRole("ADMIN")
//
//                .anyRequest()
//                .authenticated()
//            );
//
//        http.addFilterBefore(
//                jwtFilter,
//                UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:3000"));

        configuration.setAllowedMethods(
                List.of("GET","POST","PUT","DELETE","OPTIONS"));

        configuration.setAllowedHeaders(
                List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
    
    
}
