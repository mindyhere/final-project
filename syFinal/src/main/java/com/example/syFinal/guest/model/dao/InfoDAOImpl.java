package com.example.syFinal.guest.model.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InfoDAOImpl implements InfoDAO {
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public int checkId(String g_email) {
		int count = sqlSession.selectOne("info.checkId", g_email);
		return count;
	}
	
	@Override
	public String join(String g_email, String g_passwd, String g_name, String g_phone) {
		String result = "";
		Map<String, Object> map = new HashMap<>();
		map.put("g_email", g_email);
		map.put("g_passwd", g_passwd);
		map.put("g_name", g_name);
		map.put("g_phone", g_phone);
		try {
			sqlSession.insert("info.join", map);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		
		return result;
	}
}
