package com.example.syFinal.config;

//@Configuration
//@EnableWebSecurity
public class SecurityConfig {

//	@Bean
//	PasswordEncoder pwdEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Bean
//	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
//
//		/*
//		 * http.csrf(AbstractHttpConfigurer::disable); http.formLogin(form ->
//		 * form.loginPage("/api/host/login").loginProcessingUrl("/api/host/loginCheck")
//		 * .usernameParameter("userId") .passwordParameter("pwd") .successHandler(new
//		 * SuccessHandler()) .failureHandler(new FailureHandler()));
//		 * 
//		 * return http.build();
//		 */
//		http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(
//				request -> request.requestMatchers("/admin/**").hasAnyRole("ADMIN").requestMatchers("/**").permitAll())
//				.formLogin(form -> form.loginPage("/test/login.do").loginProcessingUrl("/api/host/loginCheck")
//						.usernameParameter("userId").passwordParameter("passwd").successHandler(new SuccessHandler())
//						.failureHandler(new FailureHandler()));
//		return http.build();
//	}

//	public void configure(WebSecurity web) throws Exception {
//		web.httpFirewall(defaultHttpFirewall());
//	}

//	@Bean
//	HttpFirewall defaultHttpFirewall() {
//		return new DefaultHttpFirewall();
//	}

//	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
//		System.out.println("*** SecurityConfig");
//
//		http.csrf(AbstractHttpConfigurer::disable) // 일반 사용자에 대해 Session을 저장하지 않으므로 csrf을 disable 처리함.
//
//				.authorizeHttpRequests(request -> request
//						// .requestMatchers("/admin/**").hasAnyRole("ADMIN")
//						.requestMatchers("/api/**").permitAll())
//
//				.formLogin(form -> form.loginPage("/api/host/login").loginProcessingUrl("/api/host/loginCheck")
//						.usernameParameter("userId").passwordParameter("pwd").successHandler(new SuccessHandler())
//						.failureHandler(new FailureHandler()));
//
//		return http.build();
//	}

}
