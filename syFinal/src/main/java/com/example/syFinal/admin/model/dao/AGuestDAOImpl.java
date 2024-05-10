package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.admin.model.dto.AGuestDTO;

@Repository
public class AGuestDAOImpl implements AGuestDAO {

	@Autowired
	SqlSession sqlSession;

	// 회원목록
	@Override
	public List<AGuestDTO> list(String searchkey, String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("search", search);
		map.put("searchkey", searchkey);
		System.out.println("DATIMPL : " + searchkey);
		return sqlSession.selectList("admin.ag_list", map);
	}

	// 회원 상세
	@Override
	public Map<String, Object> detail(int g_idx) {
		return sqlSession.selectOne("admin.ag_detail", g_idx);
	}

	@Override
	public void delete(int g_idx) {
		sqlSession.selectOne("admin.ag_delete", g_idx);

	}

	@Override
	public void update(Map<String, Object> map) {
		sqlSession.selectOne("admin.ag_update", map);

	}
}
