package com.example.syFinal.host.model.dao;

import java.util.List;

import com.example.syFinal.host.model.dto.HotelDTO;

public interface HotelDAO {

	/* 호텔 상세 정보 가져오기 */
	List<HotelDTO> hoteLlist(int ho_idx);
}
