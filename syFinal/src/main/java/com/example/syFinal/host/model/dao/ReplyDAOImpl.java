package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReplyDAOImpl implements ReplyDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public void insertReply(Map<String, Object> map) {
		sqlSession.insert("reply.insertReply", map);
	}

	@Override
	public void editReply(Map<String, Object> map) {
		sqlSession.update("reply.editReply", map);
	}

	@Override
	public void delete(int rp_idx) {
		sqlSession.delete("reply.delete", rp_idx);
	}

	@Override
	public List<Map<String, Object>> searchReviews(Map<String, Object> map) {
		System.out.println("==> impl? " + map);
		List<Map<String, Object>> list = null;
		try {
			list = sqlSession.selectList("reply.searchReviews", map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
}
