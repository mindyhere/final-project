package com.example.syFinal.host.model.dao;

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

//	@Override
//	public List<Map<String, Object>> search(Map<String, Object> map) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public List<Map<String, Object>> searchAll(String keyword) {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
