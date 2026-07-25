package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.app.dto.*;
import com.app.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:3000")
@Validated
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public String register(@Valid @RequestBody RegisterRequest request) {

		return authService.register(request);
	}

	@PostMapping("/login")
	public AuthResponse login(@RequestBody LoginRequest request) {

		return authService.login(request);
	}

    @PutMapping("/change-password")
    public String changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        return authService.changePassword(request);
    }
}
