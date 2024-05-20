package com.example.syFinal.host.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.checkerframework.checker.units.qual.h;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HotelDetailDTO;

import jakarta.servlet.ServletContext;

@Repository
public class HotelDAOImpl implements HotelDAO {

	@Autowired
	SqlSession sqlSession;

	/* 호텔 상세 정보 */
	public Map<String, Object> hoteList(Map<String, Object> map) {
		return sqlSession.selectOne("hotel.getHotelList", map);
	}
	
	/* 호텔 이미지 정보 */
	public List<HotelDetailDTO> hotelImg(int ho_idx) {
		return sqlSession.selectList("hotel.getHotelList", ho_idx);
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

	/* 호스트의 호텔 현황 */
	@Override
	public Map<String, Object> hotelStatus(int h_idx) {
		return sqlSession.selectOne("hotel.getHotelStatus", h_idx);
	}	
	
	/* 호스트의 호텔 목록 */
	@Override
	public List<Map<String, Object>> hostAllHotel(int h_idx) {
		return sqlSession.selectList("hotel.getHostAllHotel", h_idx);
	}	
	
	@Override
	public List<HotelDetailDTO> imp_date(int ho_idx, int d_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("d_idx", d_idx);
		return sqlSession.selectList("hotel.imp_date", map);
	}
	
	/* 호텔 상세 정보 조회 */
	@Override
	public List<Map<String, Object>> detailMyHotel(int ho_idx) {
		return sqlSession.selectList("hotel.getDetailMyHotel", ho_idx);
	}

	/* 호텔 대표 이미지 조회 */
	@Override
	public Map<String, Object> getHotelImg(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelImg", ho_idx);
	}

	/* 호텔 기본 정보 수정 */
	@Override
	public void editHotelDefaultInfo(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelDefaultInfo", map);
	}
	
	/* 호텔 편의시설 수정 */
	@Override
	public void editAmenity(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelAmenity", map);
	}
	
	/* 호텔 객실 정보 수정 */
	@Override
	public void editHotelRoomInfo(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelRoomInfo", map);
	}
	
	/* 호텔 영업 중지 신청 */
	@Override
	public void closeHotel(int ho_idx) {
		sqlSession.update("hotel.closeHotel", ho_idx);
	}
	
	@Override
	public int room_count(int ho_idx, int d_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("d_idx", d_idx);
		return sqlSession.selectOne("hotel.roomCount", map);
	}
}