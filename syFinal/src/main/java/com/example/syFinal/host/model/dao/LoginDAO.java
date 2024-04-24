package com.example.syFinal.host.model.dao;

public interface LoginDAO {

	// Host 계정 로그인
	String login(String h_email, String h_passwd);

	// 비밀번호 복호화?
	String checkPwd(String h_email);

	// 아이디 찾기(이메일)
	void findId(String email, String h_name, int b_business);

	// 비밀번호 찾기(이메일)
	String findPwd(String h_email, String h_name, int b_business);

	// 임시비밀번호 발급
	void setTempPwd(String tempPwd, String h_email, int b_business);
}
