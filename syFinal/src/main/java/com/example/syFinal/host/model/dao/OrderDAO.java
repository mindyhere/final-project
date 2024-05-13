package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

public interface OrderDAO {
	// 예약 확정(호스트 레벨 체크 프로시저 구현)
	int confirm(Map<String, Object> map);

	// orders 목록 가져오기
	List<Map<String, Object>> getList(int h_idx);
}
