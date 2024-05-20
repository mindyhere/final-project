package com.example.syFinal.host.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.syFinal.MainController;
import com.example.syFinal.host.model.dao.HotelDAO;
import com.example.syFinal.host.model.dto.HotelDTO;
import com.example.syFinal.host.model.dto.HotelDetailDTO;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;

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

		List<String> bet_dates = new ArrayList<String>();
		List<String> imp_dates = new ArrayList<String>();
		MainController main = new MainController();
		List<HotelDetailDTO> date = hotelDao.imp_date(ho_idx, d_idx);
		for (int i = 0; i < date.size(); i++) {
			bet_dates = main.dateBetween(date.get(i).getO_ckin(), date.get(i).getO_ckout());
			for (int j = 0; j < bet_dates.size(); j++) {
				imp_dates.add(bet_dates.get(j));
			}
		}
		int roomCount = hotelDao.room_count(ho_idx, d_idx);
		System.out.println(roomCount);
		List<String> dates = new ArrayList<String>();
		Set<String> set = new HashSet<String>(imp_dates);
		for (String str : set) {
			if (Collections.frequency(imp_dates, str) >= roomCount) {
				dates.add(str);
			}
		}
		hotelList.put("imp_dates", dates);
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
			@RequestParam(name = "img", required = false) MultipartFile img, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/hotel/");
		String hotelImg = "";
		System.out.println("@@@@@@  페이지 첫번째 등록 페이지이동 ");
		if (img != null && !img.isEmpty()) {
			try {
				if (hotelImg != null && !hotelImg.equals("-")) {
					File file1 = new File(path + hotelImg);
					if (file1.exists()) {
						file1.delete();
					}
				}
				hotelImg = img.getOriginalFilename();
				img.transferTo(new File(path + hotelImg));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			hotelImg = "-";
		}
		
		
		System.out.println("map : " + map);
		System.out.println("img" + img);
	}

	/* 호텔 상세 정보 조회 */
	@GetMapping("/host/hotel/detailMyHotel")
	public List<Map<String, Object>> detailMyHotel(@RequestParam(name = "ho_idx") int ho_idx) {
		List<Map<String, Object>> detailMyHotel = new ArrayList<>();
		detailMyHotel = hotelDao.detailMyHotel(ho_idx);
		return detailMyHotel;
	}

	/* 호텔 기본 정보 수정 */
	@Transactional
	@PostMapping("/host/hotel/editHotel/defaultInfo")
	public void editHotel(@RequestParam Map<String, Object> map, @RequestParam(name = "ho_idx") int ho_idx,
			@RequestParam(name = "img", required = false) MultipartFile img, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/hotel/");
		Map<String, Object> imgList = hotelDao.getHotelImg(ho_idx);
		String hotelImg = (String) imgList.get("ho_img");
		System.out.println("@@@@@@ 기본 수정 페이지 이동 ");
		System.out.println("@@@@@@ img" + img);
		System.out.println("@@@@@@ hotelImgs : " + imgList);
		System.out.println("@@@@@@ hotelImg : " + hotelImg);
		System.out.println("@@@@@@ hotelImgs.values()" + imgList.get("ho_img"));
		if (img != null && !img.isEmpty()) {
			try {
				if (hotelImg != null && !hotelImg.equals("-")) {
					File file1 = new File(path + hotelImg);
					if (file1.exists()) {
						file1.delete();
					}
				}
				hotelImg = img.getOriginalFilename();
				img.transferTo(new File(path + hotelImg));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			//hotelImg = hotelDao.getHotelImg(ho_idx);
		}
		map.put("img", hotelImg);
		System.out.println("@@@@@@@@@@ map  : " + map);
		hotelDao.editHotelDefaultInfo(map);
	}
	
	/* 호텔 편의 시설 수정 */
	@Transactional
	@PostMapping("/host/hotel/editHotel/amenity")
	public void editHotelAmenity(@RequestParam Map<String, Object> map, @RequestParam(name = "ho_idx") int ho_idx) {
		String[] items= map.get("checkItems").toString().split(",");
		map.put("ho_idx", ho_idx);
		
		for(String item : items){
			switch(item){
			  case "0": 
				  map.put("option", "mountain_view");
				  hotelDao.editAmenity(map);
				break;
			  case "1": 
				  map.put("option", "ocean_view");
				  hotelDao.editAmenity(map);
				break;
			  case "2": 
				  map.put("option", "wifi");
				  hotelDao.editAmenity(map);
				break;
			  case "3": 
				  map.put("option", "parking_lot");
				  hotelDao.editAmenity(map);
				break;
			  case "4": 
				  map.put("option", "breakfast");
				  hotelDao.editAmenity(map);
				break;
			  case "5": 
				  map.put("option", "fire_alam");
				  hotelDao.editAmenity(map);
				break;
			  case "6": 
				  map.put("option", "fire_extinguisher");
				  hotelDao.editAmenity(map);
				break;
			}
		}
	}
	
	/* 호텔 객실정보 수정 */
	@Transactional
	@PostMapping("/host/hotel/editHotel/roomInfo")
	public void editHotelRoomInfo(@RequestParam Map<String, Object> map, @RequestParam(name = "ho_idx") int ho_idx,
			@RequestParam(name = "dimg1") MultipartFile dimg1, 
			@RequestParam(name = "dimg2", required = false) MultipartFile dimg2,
			@RequestParam(name = "dimg3", required = false) MultipartFile dimg3, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/hotel/");
//		String roomImg1 = hotelDao.getHotelImg(ho_idx);
//		System.out.println("@@@@@@ 기본 수정 페이지 이동 ");
//		System.out.println("@@@@@@ img" + dimg1);
//		if (dimg1 != null && !dimg1.isEmpty()) {
//			try {
//				if (roomImg1 != null && !roomImg1.equals("-")) {
//					File file1 = new File(path + roomImg1);
//					if (file1.exists()) {
//						file1.delete();
//					}
//				}
//				roomImg1 = dimg1.getOriginalFilename();
//				dimg1.transferTo(new File(path + roomImg1));
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		} else {
//			roomImg1 = hotelDao.getHotelImg(ho_idx);
//		}
//		map.put("dimg1", roomImg1);
		System.out.println("@@@@@@@@@@ map  : " + map);
		hotelDao.editHotelRoomInfo(map);
	}
	
	/* 호텔 영업 중지 신청 */
	@GetMapping("/host/hotel/closeHotel")
	public void closeHotel(@RequestParam(name = "ho_idx") int ho_idx) {
		hotelDao.closeHotel(ho_idx);
	}
	
	@PostMapping("/host/hotel/hotelImg")
	@ResponseBody
	public Map<String, Object> list(@RequestParam(name = "ho_idx") int ho_idx) {
		Map<String, Object> imgList = hotelDao.getHotelImg(ho_idx);
		Map<String, Object> map = new HashMap<>();
		return null;
	}
}