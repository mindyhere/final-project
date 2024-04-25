package com.example.syFinal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
//	@Bean
//	protected SecurityFilterChain confingure(HttpSecurity http) throws Exception {
//		http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(
//				request -> request.requestMatchers("/admin/**").hasAnyRole("ADMIN").requestMatchers("/**").permitAll())
//				.formLogin(form -> form.loginPage("/host/login").loginProcessingUrl("/host/loginCheck")
//						.usernameParameter("h_email").passwordParameter("h_passwd").successHandler(new SuccessHandler())
//						.failureHandler(new FailureHandler()));
//		return http.build();
//	}

//	@Bean
//	PasswordEncoder pwdEncoder() {
//		return new BCryptPasswordEncoder();
//	}
}
