package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HotelAmenityDTO;
import com.example.syFinal.host.model.dto.HotelDTO;
import com.example.syFinal.host.model.dto.HotelDetailDTO;

@Repository
public class HotelDAOImpl implements HotelDAO {

	@Autowired
	SqlSession sqlSession;

	/* 호텔 상세 정보 */
	public HotelDTO hoteLlist(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelList", ho_idx);
	}

	/* 호텔 객실 정보 */
	@Override
	public List<HotelDetailDTO> hotelRooms(int ho_idx) {
		return sqlSession.selectList("hotel.getHotelRooms", ho_idx);
	}

	/* 호텔 편의시설 */
	@Override
	public Map<String, Object> hotelAmenity(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelAmenity", ho_idx);
	}

	/* 호텔 호스트 정보 */
	@Override
	public Map<String, Object> hostInfo(int ho_idx) {
		return sqlSession.selectOne("hotel.getHostInfo", ho_idx);
	}

	/* 호텔 이용규칙 */
	@Override
	public Map<String, Object> hotelRule(int ho_idx){
		return sqlSession.selectOne("hotel.getHotelRule", ho_idx);
	}

	/* 호텔 예약(1박 가격) */
	@Override
	public Map<String, Object> hotelPrice(int ho_idx) {
		return sqlSession.selectOne("hotel.getPrice", ho_idx);
	}

	/* 호스트 상세페이지(게스트용) */
	@Override
	public Map<String, Object> hostPage(int h_idx) {
		return sqlSession.selectOne("hotel.getHostPage", h_idx);
	}

	/* 호스트의 호텔 리스트 */
	@Override
	public Map<String, Object> hotelSummary(int h_idx) {
		return sqlSession.selectOne("hotel.getHotelSummary", h_idx);
	}

	/* 호스트의 모든 호텔 리뷰 */
	@Override
	public List<Map<String, Object>> allReviews(int h_idx) {
		return sqlSession.selectList("hotel.getAllReviews", h_idx);
	}
}