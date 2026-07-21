package com.app.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CustomUserDetailsService userService;
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		String header = request.getHeader("Authorization");

		String token = null;
		String email = null;

		if (header != null && header.startsWith("Bearer ")) {

			token = header.substring(7);
			email = jwtUtil.extractEmail(token);
			System.out.println("===== JWT FILTER =====");
			System.out.println("Header: " + header);
			System.out.println("Email: " + email);
		}

		if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UserDetails userDetails = userService.loadUserByUsername(email);
			System.out.println("Authorities: " + userDetails.getAuthorities());
			System.out.println("Authentication: " + SecurityContextHolder.getContext().getAuthentication());

			if (jwtUtil.validateToken(token, userDetails.getUsername())) {

				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null,
						userDetails.getAuthorities());

				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(auth);
				System.out.println("Authenticated Successfully");
				System.out.println(SecurityContextHolder.getContext().getAuthentication());
			}
		}

		chain.doFilter(request, response);
	}
}