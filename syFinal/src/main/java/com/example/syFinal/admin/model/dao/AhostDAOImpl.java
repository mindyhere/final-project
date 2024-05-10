package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.admin.model.dto.AHostDTO;

@Repository
public class AhostDAOImpl implements AhostDAO {

	@Autowired
	SqlSession sqlSession;

	@Override
	public List<AHostDTO> list(String searchkey, String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("search", search);
		map.put("searchkey", searchkey);
		return sqlSession.selectList("admin.ah_list", map);
	}

	@Override
	public void delete(int h_idx) {
		sqlSession.selectOne("admin.ah_delete", h_idx);
	}
}