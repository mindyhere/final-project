package com.example.syFinal.guest.model.dao;

import java.util.Map;

import com.example.syFinal.guest.model.dto.ReviewDTO;

public interface ReviewDAO {
	// guest 회원 1명 당 작성한 리뷰글 목록
//	List<ReviewDTO> myReviewList(int g_idx);

	// 리뷰 작성
	void insertReview(Map<String, Object> map);

	// guest → 작성한 리뷰 수정
	void editReview(ReviewDTO dto);

	// guest → 작성한 리뷰 삭제
	void delete(Map<String, Object> map);

	void delete(int rv_idx);

	// 작성한 글 검색
//	List<Map<String, Object>> search(Map<String, Object> map);
//
//	List<Map<String, Object>> searchAll(String keyword);
}
