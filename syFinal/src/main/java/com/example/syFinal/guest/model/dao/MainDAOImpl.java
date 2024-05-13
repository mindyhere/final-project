package com.example.syFinal.guest.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.MainDTO;

@Repository
public class MainDAOImpl implements MainDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	
	@Override
	public List<MainDTO> list(String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("search", search);
		return sqlSession.selectList("main.mainList",search);
	}
}
