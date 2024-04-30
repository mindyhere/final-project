package com.example.syFinal.host.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.host.model.dao.HotelDAO;
import com.example.syFinal.host.model.dto.HotelDTO;

@RestController
//@RequestMapping("/host/hotel/*")
public class HotelController {

	@Autowired
	HotelDAO hotelDao;

	/* 호텔 상세 정보 가져오기 */
	@GetMapping("/host/hotel/hotelDetail/{hoIdx}")
	public HotelDTO hotelList(@PathVariable(name = "hoIdx") int ho_idx) {
		// 호텔 정보
		// int hoIdx = '1';
		System.out.println("hotelNo  : " + ho_idx);
		HotelDTO hotelList = hotelDao.hoteLlist(ho_idx);
		
		// 호스트 정보
		
		// 후기 정보
		return hotelList;
	}
}
