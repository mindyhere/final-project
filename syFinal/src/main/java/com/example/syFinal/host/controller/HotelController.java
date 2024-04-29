package com.example.syFinal.host.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.host.model.dao.HotelDAO;
import com.example.syFinal.host.model.dto.HotelDTO;

@RestController
//@RequestMapping("/host/hotel/*")
public class HotelController {

	@Autowired
	HotelDAO hotelDao;

	/* 호텔 상세 정보 가져오기 */
	@GetMapping("/host/hotel/hotelDetail")
	public HotelDTO hotelList(@RequestParam(name = "ho_idx", defaultValue = "1") int ho_idx) {
		// 호텔 정보
		// int hoIdx = '1';
		HotelDTO hotelList = hotelDao.hoteLlist(48);
		
		// 호스트 정보
		
		// 후기 정보
		return hotelList;
	}
}
