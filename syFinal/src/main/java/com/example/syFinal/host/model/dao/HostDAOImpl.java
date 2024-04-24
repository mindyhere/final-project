package com.example.syFinal.host.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.syFinal.host.model.dto.HostDTO;

public class HostDAOImpl implements HostDAO {
	@Autowired
	SqlSession sqlSession;

	@Override // Host(사업자) 회원가입
	public void join(HostDTO dto) {
		sqlSession.insert("host.join", dto);
	}

	@Override
	public void editInfo(HostDTO dto) {

	}

	@Override // 아이디 중복체크
	public int isDuplicated(String h_email, String h_passwd) {
		return sqlSession.selectOne("account.checkId", h_email);
	}

	@Override
	public void deleteAccount(String h_email, String h_passwd) {
		sqlSession.delete("accoutn.deleteAccount", h_passwd);
	}

}
