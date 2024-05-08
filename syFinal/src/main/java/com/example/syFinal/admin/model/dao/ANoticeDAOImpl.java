package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ANoticeDAOImpl implements ANoticeDAO {

	@Autowired
	SqlSession sqlSession;

	public List<Map<String, Object>> list(String searchkey, String search) {
		if (searchkey.equals("title_contents")) {
			return sqlSession.selectList("notice.list_all", "%" + search + "%");
		} else {
			Map<String, Object> map = new HashMap<>();
			map.put("searchkey", searchkey);
			map.put("search", "%" + search + "%");
			return sqlSession.selectList("notice.list", map);
		}
	}

	public void insert(Map<String, Object> map) {
		sqlSession.insert("notice.insert", map);
	}

	public Map<String, Object> detail(int n_idx) {
		return sqlSession.selectOne("notice.detail", n_idx);
	}

	public Map<String, Object> ncheck(int n_idx, String n_writer) {
		Map<String, Object> map = new HashMap<>();
		map.put("n_writer", n_writer);
		return sqlSession.selectOne("notice.n_check", map);
	}

	public void update(Map<String, Object> map) {
		sqlSession.update("notice.update", map);
	}

	public void delete(int n_idx) {
		sqlSession.delete("notice.delete", n_idx);
	}
}