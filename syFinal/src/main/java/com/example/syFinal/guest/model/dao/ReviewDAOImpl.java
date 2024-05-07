package com.example.syFinal.guest.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.guest.model.dto.ReviewDTO;
import com.example.syFinal.host.model.dto.ReplyDTO;

public class ReviewDAOImpl implements ReviewDAO {

	@Override
	public List<Map<String, Object>> myReviewList(int g_idx) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String insertReview(ReviewDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ReplyDTO detailReview(int rv_idx) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void editReview(ReviewDTO dto) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(Map<String, Object> map) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(int rv_idx) {
		// TODO Auto-generated method stub

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
