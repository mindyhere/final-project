package com.example.syFinal.global;

import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		// 세션 객체 확인
		HttpSession session = request.getSession();
		if (session.getAttribute("h_email") == null) {
			// 세션이 없으면 로그인 페이지 이동
			response.sendRedirect(request.getContextPath() + "/host/login?message=nologin");
			return false; // 메인 액션 실행 차단
		} else if (session.getAttribute("g_email") == null) {
			// response.sendRedirect(request.getContextPath()+"/host/login?message=nologin");
			return false;
		} else if (session.getAttribute("a_id") == null) {
			// response.sendRedirect(request.getContextPath()+"/host/login?message=nologin");
			return false;
		} else {
			return true;
		}
	}
}
