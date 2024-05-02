package com.example.syFinal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@CrossOrigin(origins = "*")
@Configuration
public class WebConfig implements WebMvcConfigurer {
	public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

	@Override
	public void addCorsMappings(final CorsRegistry registry) {
		// registry.addMapping("/**").allowedMethods(ALLOWED_METHOD_NAMES.split(","));
		// registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST");
		registry.addMapping("/**").allowedOriginPatterns("*").allowedMethods(ALLOWED_METHOD_NAMES.split(","))
				.allowCredentials(true) // 이 부분 추가
				.allowedHeaders("*");
	}
}