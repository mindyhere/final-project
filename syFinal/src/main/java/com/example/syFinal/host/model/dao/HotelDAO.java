package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.host.model.dto.HotelDTO;
import com.example.syFinal.host.model.dto.HotelDetailDTO;

public interface HotelDAO {

	/* 호텔 상세 정보 */
	HotelDTO hoteLlist(int ho_idx);
	
	/* 호텔 객실 정보 */
	List<HotelDetailDTO> hotelRooms(int ho_idx);
	
	/* 호텔 편의시설 */
	Map<String, Object> hotelAmenity(int ho_idx);
	
	/* 호스트 정보 */
	Map<String, Object> hostInfo(int ho_idx);
	
	/* 호텔 이용규칙 */
	Map<String, Object> hotelRule(int ho_idx);
	
	/* 호텔 예약(1박 가격) */
	Map<String, Object> hotelPrice(int ho_idx);
	
	/* 호스트 상세페이지(게스트용) */
	Map<String, Object> hostPage(int h_idx);
	
	/* 호스트의 호텔 리스트 */
	Map<String, Object> hotelSummary(int h_idx);
	
	/* 호스트의 모든 호텔 리뷰 */
	List<Map<String, Object>> allReviews(int h_idx);
}