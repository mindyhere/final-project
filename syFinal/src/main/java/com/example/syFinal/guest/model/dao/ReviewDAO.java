package com.example.syFinal.guest.model.dao;

import java.util.Map;

public interface ReviewDAO {
	// guest 회원 1명 당 작성한 리뷰글 목록
//	List<ReviewDTO> myReviewList(int g_idx);

	// 리뷰 작성
	void insertReview(Map<String, Object> map);

	// guest → 작성한 리뷰 수정
	void editReview(Map<String, Object> map);

	// guest → 작성한 리뷰 삭제
	void updateDeleted(int rv_idx);

	// 작성한 글 검색
//	List<Map<String, Object>> search(Map<String, Object> map);
//
//	List<Map<String, Object>> searchAll(String keyword);
}
