package com.example.syFinal.guest.model.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LoginDAOImpl implements LoginDAO {
	@Autowired
	SqlSession sqlSession;

	
	@Override
	public String chkPw(String g_email) {
		String passwd = sqlSession.selectOne("login.chkPw", g_email);
		return passwd;
	}

	@Override
	public String login(String g_email, String g_passwd) {
		Map<String, String> map = new HashMap<>();
		map.put("g_email", g_email);
		map.put("g_passwd", g_passwd);
		String name = sqlSession.selectOne("login.login", map);
		return name;
	}

	@Override
	public String searchEmail(String g_name, String g_phone) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String searchPw(String g_email) {
		// TODO Auto-generated method stub
		return null;
	}

}
