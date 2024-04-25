package com.example.syFinal.guest.model.dao;

public interface LoginDAO {
	String chkPw(String g_passwd); //복호화
	
	String login(String g_email, String g_passwd); //로그인

	String searchEmail(String g_name, String g_phone); // 이메일 찾기

	String searchPw(String g_email); //이메일로 비밀번호 발송

	// String searchPwTel(String g_phone, String g_email);
}
