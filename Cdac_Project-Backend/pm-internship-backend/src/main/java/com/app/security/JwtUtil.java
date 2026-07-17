package com.app.security;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private long expiration;

	private SecretKey getKey() {
		return Keys.hmacShaKeyFor(secret.getBytes());
	}

	public String generateToken(String email) {

		return Jwts.builder().subject(email).issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + expiration)).signWith(getKey()).compact();
	}

	public String extractEmail(String token) {

		Claims claims = Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();

		return claims.getSubject();
	}

	public boolean validateToken(String token, String email) {

		return extractEmail(token).equals(email);
	}
}
