package com.example.syFinal.guest.model.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.ReviewDTO;

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
	public void insertReview(ReviewDTO dto) {
		// 숙박번호, 호텔번호 유효검사? -> insert
		sqlSession.insert("review.insert", dto);
	}

	@Override
	public void editReview(ReviewDTO dto) {
		sqlSession.update("review.editReview", dto);
	}

	@Override
	public void delete(Map<String, Object> map) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(int rv_idx) {
		sqlSession.delete("review.delete", rv_idx);
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
