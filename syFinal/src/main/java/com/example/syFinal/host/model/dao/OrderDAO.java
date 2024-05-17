package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import com.example.syFinal.guest.model.dto.GuestDTO;

public interface OrderDAO {
	// 예약 확정(예약 업데이트 및 호스트 레벨 체크 프로시저 호출)
	void confirm(Map<String, Object> param);

	// orders 목록 가져오기
	List<Map<String, Object>> getList(Map<String, Object> map);

	// host의 hotel 목록 가져오기
	List<Map<String, Object>> getHotelList(int h_idx);

	// hotel 예약건수 - 페이지나누기
	int countRecord(Map<String, Object> map);

	GuestDTO getGuestInfo(int g_idx);

	// 예약 확정 시 게스트 레벨 업데이트
	int guestLevelUpate(Map<String, Object> param);

	// 게스트가 예약 변경 요청한 목록 가져오기
	List<Map<String, Object>> requestList(int h_idx);

	// 예약 변경사항 업데이트
	void modify(Map<String, Object> params);

}