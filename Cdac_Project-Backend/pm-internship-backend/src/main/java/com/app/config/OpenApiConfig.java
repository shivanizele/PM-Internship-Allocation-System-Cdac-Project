package com.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {

	@Bean
	public OpenAPI pmInternshipOpenAPI() {

		return new OpenAPI()

				.info(new Info().title("PM Internship Smart Allocation API")
						.description("AI-Based Smart Allocation Engine APIs").version("1.0")
						.contact(new Contact().name("Shivani Zele")))

				.addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))

				.components(new io.swagger.v3.oas.models.Components().addSecuritySchemes("Bearer Authentication",
						new SecurityScheme().name("Bearer Authentication").type(SecurityScheme.Type.HTTP)
								.scheme("bearer").bearerFormat("JWT")));
	}
}
