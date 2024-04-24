package com.example.syFinal.host.model.dao;

import com.example.syFinal.host.model.dto.HostDTO;

public interface HostDAO {

	// Host(사업자) 회원가입
	void join(HostDTO dto);

	// Host 로그인

	// 아이디 중복 체크
	int isDuplicated(String h_email, String h_passwd);

	// Host 정보 수정
	void editInfo(HostDTO dto);

	// Host 회원탈퇴
	void deleteAccount(String h_email, String h_passwd);

}
