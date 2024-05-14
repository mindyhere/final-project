package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

public interface OrderDAO {
	// 예약 확정(호스트 레벨 체크 프로시저 구현)
	int confirm(Map<String, Object> map);

	// orders 목록 가져오기
	List<Map<String, Object>> getList(Map<String, Object> map);

	// host의 hotel 목록 가져오기
	List<Map<String, Object>> getHotelList(int h_idx);

	// hotel 예약건수 - 페이지나누기
	int countRecord(Map<String, Object> map);
}
