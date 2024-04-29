package com.example.syFinal.host.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public Map<String, Object> hotelList(@RequestParam(name = "ho_idx", defaultValue = "1") int ho_idx) {
		// int hoIdx = '1';
		List<HotelDTO> list = hotelDao.hoteLlist(48);
		System.out.println("1. Controller list : " + list);
		Map<String, Object> hotelList = new HashMap<>();
		for (int i = 0; i < list.size(); i++) {
			hotelList.put("ho_name", list.get(i).getHo_name());
			hotelList.put("ho_address", list.get(i).getHo_address());
			hotelList.put("ho_level", list.get(i).getHo_level());
			hotelList.put("ho_floor", list.get(i).getHo_floor());
			hotelList.put("ho_single", list.get(i).getHo_single());
			hotelList.put("ho_double", list.get(i).getHo_double());
			hotelList.put("ho_family", list.get(i).getHo_family());
			hotelList.put("ho_suite", list.get(i).getHo_suite());
		}
		System.out.println("2. Controller hotelList : " + hotelList);
		List list2 = new ArrayList();
		// list2.add(hotelList);
		hotelList.put("count", list2.size());
		hotelList.put("list", list2);
		return hotelList;
	}
}
