package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.*;
import com.app.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:3000")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public String register(@RequestBody RegisterRequest request) {

		return authService.register(request);
	}

	@PostMapping("/login")
	public AuthResponse login(@RequestBody LoginRequest request) {

		return authService.login(request);
	}
}