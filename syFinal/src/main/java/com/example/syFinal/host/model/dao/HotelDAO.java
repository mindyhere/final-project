package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.host.model.dto.HotelAmenityDTO;
import com.example.syFinal.host.model.dto.HotelDTO;
import com.example.syFinal.host.model.dto.HotelDetailDTO;

public interface HotelDAO {

	/* 호텔 상세 정보 */
	HotelDTO hoteLlist(int ho_idx);
	
	/* 호텔 객실 정보 */
	List<HotelDetailDTO> hotelRooms(int ho_idx);
	
	/* 호텔 편의시설 */
	List<HotelAmenityDTO> hotelAmenity(int ho_idx);
	
	/* 호스트 정보 */
	Map<String, Object> hostInfo(int ho_idx);
	
	/* 호텔 이용규칙 */
	Map<String, Object> hotelRule(int ho_idx);
}