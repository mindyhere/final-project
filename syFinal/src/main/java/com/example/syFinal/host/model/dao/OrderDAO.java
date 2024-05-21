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

	// 변경 업데이트 전, 동일 룸타입의 예약현황 확인
	boolean countOrders(Map<String, Object> params);

	// 예약 변경요청 거부 처리
	void requestReject(int o_idx);

	// 체크인, 체크아웃 스케쥴
	List<Map<String, Object>> schedule(int h_idx, String column);
}