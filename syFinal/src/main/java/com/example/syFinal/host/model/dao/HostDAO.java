package com.example.syFinal.host.model.dao;

import java.util.Map;

import com.example.syFinal.host.model.dto.HostDTO;

public interface HostDAO {

	// Host(사업자) 회원가입
	void insert(Map<String, Object> map);

	// 아이디 중복 체크
	int idCheck(String userEmail);

	// Host 로그인
	String login(Map<String, Object> params);

	// 암호화된 h_passwd
	String pwdCheck(String userEmail);

	// 로그인 성공 시 계정정보(쿠키) 가져오기
	HostDTO makeCookie(String userEmail);

	// host 회원정보 가져오기
	Map<String, Object> getAccount(int h_idx);

	// host 계정아이디 찾기
	String findId(Map<String, Object> map);

	// 비밀번호 찾기(이메일)
	int findPwd(Map<String, Object> map);

	// 임시비밀번호 발급(String tempPwd, String h_email, int b_business)
	void setTempPwd(Map<String, Object> map);

	// Host 정보 수정
	void updateInfo(Map<String, Object> map);

	// Host 회원탈퇴
	void deleteAccount(int h_idx);

	String getfile(int h_idx, String type);

}
