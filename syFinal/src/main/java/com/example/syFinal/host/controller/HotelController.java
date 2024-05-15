package com.example.syFinal.host.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.syFinal.host.model.dao.HotelDAO;
import com.example.syFinal.host.model.dto.HotelDetailDTO;

@RestController
public class HotelController {

	@Autowired
	HotelDAO hotelDao;

	/* 호텔 상세 정보 */
	@GetMapping("/host/hotel/hotelDetail/{hoIdx}/{dIdx}")
	public Map<String, Object> hotelList(@PathVariable(name = "hoIdx") int ho_idx,
			@PathVariable(name = "dIdx") int d_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("d_idx", d_idx);
		Map<String, Object> hotelList = new HashMap<>();
		hotelList = hotelDao.hoteList(map);
		return hotelList;
	}

	/* 호텔 객실 정보 */
	@GetMapping("/host/hotel/hotelRooms/{hoIdx}")
	public List<Map<String, Object>> hotelRooms(@PathVariable(name = "hoIdx") int ho_idx) {
		List<HotelDetailDTO> list = hotelDao.hotelRooms(ho_idx);
		List<Map<String, Object>> hotelRooms = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("dIdx", list.get(i).getD_idx());
			map.put("dRoomType", list.get(i).getD_room_type());
			map.put("dImg1", list.get(i).getD_img1());
			map.put("dImg2", list.get(i).getD_img2());
			map.put("dImg3", list.get(i).getD_img3());
			map.put("dCapacity", list.get(i).getD_capacity());
			map.put("dArea", list.get(i).getD_area());
			map.put("dBeds", list.get(i).getD_beds());
			map.put("dNonSmoking", list.get(i).getD_non_smoking());
			map.put("dPrice", list.get(i).getD_price());
			hotelRooms.add(map);
		}
		return hotelRooms;
	}

	/* 호텔 편의시설 */
	@GetMapping("/host/hotel/hotelAmenity/{hoIdx}")
	public Map<String, Object> hotelAmenity(@PathVariable(name = "hoIdx") int ho_idx) {
		Map<String, Object> hotelAmenity = hotelDao.hotelAmenity(ho_idx);
		return hotelAmenity;
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
	public Map<String, Object> hotelRule(@PathVariable(name = "hoIdx") int ho_idx) {
		Map<String, Object> hotelRule = new HashMap<>();
		hotelRule = hotelDao.hotelRule(ho_idx);
		return hotelRule;
	}

	/* 호텔 예약(1박 가격) */
	@GetMapping("/host/hotel/reservation/{hoIdx}")
	public Map<String, Object> hotelPrice(@PathVariable(name = "hoIdx") int ho_idx) {
		Map<String, Object> hotelPrice = new HashMap<>();
		hotelPrice = hotelDao.hotelPrice(ho_idx);
		return hotelPrice;
	}

	/* 호스트 상세페이지(게스트용) */
	@GetMapping("/host/hotel/hostPage/{hIdx}")
	public Map<String, Object> hostPage(@PathVariable(name = "hIdx") int h_idx) {
		Map<String, Object> hostPage = new HashMap<>();
		hostPage = hotelDao.hostPage(h_idx);
		return hostPage;
	}

	/* 호스트의 호텔 리스트 */
	@GetMapping("/host/hotel/hotelSummary/{hIdx}")
	public Map<String, Object> hotelSummary(@PathVariable(name = "hIdx") int h_idx) {
		Map<String, Object> hotelSummary = new HashMap<>();
		hotelSummary = hotelDao.hotelSummary(h_idx);
		return hotelSummary;
	}

	/* 호스트의 모든 호텔 리뷰 */
	@GetMapping("/host/hotel/allReview/{hIdx}")
	public List<Map<String, Object>> allReviews(@PathVariable(name = "hIdx") int h_idx) {
		List<Map<String, Object>> allReviews = new ArrayList<>();
		allReviews = hotelDao.allReviews(h_idx);
		return allReviews;
	}

	/* 호스트의 호텔 현황 */
	@GetMapping("/host/hotel/hotelManagement/{hIdx}")
	public Map<String, Object> hotelManagement(@PathVariable(name = "hIdx") int h_idx) {
		Map<String, Object> hotelStatus = hotelDao.hotelStatus(h_idx);
		List<Map<String, Object>> hotelList = hotelDao.hostAllHotel(h_idx);
		Map<String, Object> hotelManagement = new HashMap<>();
		hotelManagement.put("status", hotelStatus);
		hotelManagement.put("list", hotelList);
		return hotelManagement;
	}

	/* 신규 호텔 등록 */
	@PostMapping("/host/hotel/registHotel")
	public void registHotel(@RequestParam Map<String, Object> map,
			@RequestParam(name = "img", required = false) MultipartFile img) {
		System.out.println("map : " + map);
		System.out.println("img" + img);
	}

	/* 호텔 상세 정보 조회 */
	@GetMapping("/host/hotel/detailMyHotel")
	public List<Map<String, Object>> detailMyHotel(@RequestParam(name = "ho_idx") int ho_idx) {
		System.out.println("~~~~~~ ho_idx : " + ho_idx);

		List<Map<String, Object>> detailMyHotel = new ArrayList<>();
		detailMyHotel = hotelDao.detailMyHotel(ho_idx);
		return detailMyHotel;
	}
	/* 호텔 정보 수정 */

	/* 호텔 삭제 */

}