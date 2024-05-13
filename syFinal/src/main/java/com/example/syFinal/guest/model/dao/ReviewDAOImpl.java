package com.example.syFinal.guest.model.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewDAOImpl implements ReviewDAO {
	@Autowired
	SqlSession sqlSession;

//	@Override
//	public List<ReviewDTO> myReviewList(int g_idx) {
//		// guest 회원 1명 당 작성한 리뷰글 목록
//		return sqlSession.selectList("review.myList", g_idx);
//	}

	@Override
	public void insertReview(Map<String, Object> map) {
		sqlSession.insert("review.insert", map);
	}

	@Override
	public void editReview(Map<String, Object> map) {
		sqlSession.update("review.editReview", map);
	}

	@Override
	public void updateDeleted(int rv_idx) {
		sqlSession.update("review.updateDeleted", rv_idx);
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
