package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.ReplyDTO;

@Repository
public class ReplyDAOImpl implements ReplyDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<ReplyDTO> myReplyList(int h_idx) {
		// host 회원 1명 당 작성한 답글 목록
		return sqlSession.selectList("reply.myList", h_idx);
	}

	@Override
	public void insertReply(ReplyDTO dto) {
		sqlSession.insert("reply.insert", dto);
	}

//	@Override
//	public ReplyDTO detailReply(ReplyDTO dto) {
//		return sqlSession.selectOne("reply.detail", dto);
//	}

	@Override
	public void editReply(ReplyDTO dto) {
		sqlSession.update("review.editReply", dto);
	}

	@Override
	public void delete(Map<String, Object> map) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(int rp_idx) {
		sqlSession.delete("review.delete", rp_idx);
	}

	@Override
	public List<Map<String, Object>> search(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchAll(String keyword) {
		// TODO Auto-generated method stub
		return null;
	}

}
