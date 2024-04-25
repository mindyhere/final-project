package com.example.syFinal.host.model.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HostDTO;

@Repository
public class HostDAOImpl implements HostDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public String insert(Map<String, Object> map) {
		sqlSession.insert("host.insert", map);
		return "success";
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
