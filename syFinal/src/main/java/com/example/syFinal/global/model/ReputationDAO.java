package com.example.syFinal.global.model;

import java.util.List;
import java.util.Map;

import com.example.syFinal.guest.model.dto.ReviewDTO;
import com.example.syFinal.host.model.dto.ReplyDTO;

public interface ReputationDAO {
	// 리뷰글 상세 가져오기(리뷰글 + 답글)
	ReviewDTO reviewDetail(int rv_idx);

	ReplyDTO replyDetail(Map<String, Object> map);

	// hotel 별 리뷰글 목록
	List<Map<String, Object>> getHotelReviews(int ho_idx);

	// hotel 리뷰 별 답글 목록
	Map<String, Object> getReply(int rv_idx);

	// 평점/개수 요약
	double calcAvgRate(int ho_idx);

}
