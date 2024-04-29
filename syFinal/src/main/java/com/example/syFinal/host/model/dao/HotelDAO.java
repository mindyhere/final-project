package com.example.syFinal.host.model.dao;

import com.example.syFinal.host.model.dto.HotelDTO;

public interface HotelDAO {

	/* 호텔 상세 정보 가져오기 */
	HotelDTO hoteLlist(int ho_idx);
	
	/* 호스트 정보 가져오기 */
	
}
