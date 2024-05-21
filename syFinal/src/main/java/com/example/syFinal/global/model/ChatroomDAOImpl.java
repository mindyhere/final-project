package com.example.syFinal.global.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChatroomDAOImpl implements ChatroomDAO {
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<MessageDTO> g_list(int g_idx) {
		return sqlSession.selectList("message.g_list", g_idx);
	}
	
	@Override
	public List<MessageDTO> h_list(int h_idx) {
		return sqlSession.selectList("message.h_list", h_idx);
	}


	@Override
	public String create(String room, int g_idx, int h_idx, String message) {
		String result = "";
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("g_idx", g_idx);
		map.put("room", room);
		map.put("message", message);
		try {
			sqlSession.insert("message.create", map);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}

	@Override
	public List<MessageDTO> entrance(int g_idx, int h_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("g_idx", g_idx);
		return sqlSession.selectList("message.entrance", map);
	}

}
