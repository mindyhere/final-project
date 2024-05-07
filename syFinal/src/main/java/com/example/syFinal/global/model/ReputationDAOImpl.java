package com.example.syFinal.global.model;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.ReviewDTO;
import com.example.syFinal.host.model.dto.ReplyDTO;

@Repository
public class ReputationDAOImpl implements ReputationDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public ReviewDTO reviewDetail(int rv_idx) {
		// 리뷰글 상세 가져오기
		return sqlSession.selectOne("reputation.detailReview", rv_idx);
	}

	@Override
	public ReplyDTO replyDetail(Map<String, Object> map) {
		// 리뷰글 상세페이지 → 답글 가져오기
		return sqlSession.selectOne("reputation.replyDetail", map);
	}

	@Override
	public List<ReviewDTO> getHotelReviews(int ho_idx) {
		// hotel 별 리뷰글 목록
		return sqlSession.selectList("reputation.getHotelReviews", ho_idx);
	}

	@Override
	public List<ReplyDTO> getHotelReplys(int ho_idx) {
		// hotel 리뷰 별 답글 목록
		return sqlSession.selectList("reputation.getHotelReplys", ho_idx);
	}

	@Override
	public double calcRate(int ho_idx) {
		// 호텔별 평점계산
		return sqlSession.selectOne("reply.detail", ho_idx);
	}

}
