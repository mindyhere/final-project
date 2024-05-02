package com.example.syFinal.host.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.host.model.dao.HotelDAO;
import com.example.syFinal.host.model.dto.HotelDTO;
import com.example.syFinal.host.model.dto.HotelDetailDTO;

@RestController
public class HotelController {

	@Autowired
	HotelDAO hotelDao;

	/* 호텔 상세 정보 */
	@GetMapping("/host/hotel/hotelDetail/{hoIdx}")
	public HotelDTO hotelList(@PathVariable(name = "hoIdx") int ho_idx) {
		HotelDTO hotelList = hotelDao.hoteLlist(ho_idx);
		return hotelList;
	}
	
	/* 호텔 객실 정보 */
	@GetMapping("/host/hotel/hotelRooms/{hoIdx}")
	public List<Map<String, Object>> hotelRooms(@PathVariable(name = "hoIdx") int ho_idx) {
		List<HotelDetailDTO> list = hotelDao.hotelRooms(ho_idx);
		List<Map<String, Object>> hotelRooms = new ArrayList<>();
		for(int i = 0; i<list.size();i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("DIdx", list.get(i).getD_idx());
			map.put("DRoomType", list.get(i).getD_room_type());
			map.put("DImg1", list.get(i).getD_img1());
			hotelRooms.add(map);
		}
		return hotelRooms;
	}
	
	/* 호텔 호스트 정보 */
	@GetMapping("/host/hotel/hostInfo/{hoIdx}")
	public Map<String, Object> hostInfo(@PathVariable(name = "hoIdx") int ho_idx) {
		Map<String, Object> hostInfo = new HashMap<>();
		hostInfo = hotelDao.hostInfo(ho_idx);
		return hostInfo;
	}
	
	/* 호텔 이용규칙 */
	@GetMapping("/host/hotel/hotelRule/{hoIdx}")
	public Map<String, Object> hotelRule(@PathVariable(name = "hoIdx") int ho_idx){
		Map<String, Object> hotelRule = new HashMap<>();
		hotelRule = hotelDao.hotelRule(ho_idx);
		return hotelRule;
	}
}