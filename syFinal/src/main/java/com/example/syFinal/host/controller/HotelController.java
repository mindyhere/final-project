package com.example.syFinal.host.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.simple.parser.ParseException;
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
		hotelList = hotelDao.hotelList(map);
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

	/* 호텔 신규 등록 전 확인 */
	@PostMapping("/host/hotel/beforeRegistCheck")
	public Map<String, Object> check(@RequestParam(name="userIdx") int userIdx){
		Map<String, Object> result = new HashMap<>();
		String check = hotelDao.beforeRegistCheck(userIdx);
		result.put("check", check);
		return result;
	}
	
	/* 이어서 작성하기 */
	@PostMapping("/host/hotel/selectTempHotel")
	public Map<String, Object> selectTempHotel(@RequestParam(name="userIdx") int userIdx){
		Map<String, Object> tempData = new HashMap<>();
		tempData.put("temp", hotelDao.selectTempHotel(userIdx));
		return tempData;
	}
	
	/* 임시 데이터 삭제 */
	@Transactional
	@PostMapping("/host/hotel/deleteTempHotel")
	public void deleteTempHotel(@RequestParam(name="userIdx") int userIdx){
		hotelDao.deleteTempHotel(userIdx);
	}
	
	/* 신규 호텔 등록 */
	@Transactional
	@PostMapping("/host/hotel/registHotel")
	public int registHotel(@RequestParam Map<String, Object> map, @RequestParam(name = "ht_h_idx") int ht_h_idx,
			@RequestParam(name = "ht_img") MultipartFile htImg, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/hotel/");
		String ht_img = "-";
		if (htImg != null && !htImg.isEmpty()) {
			try {
				ht_img = htImg.getOriginalFilename();
				htImg.transferTo(new File(path + ht_img));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		map.put("ht_img", ht_img);
		map.put("ht_h_idx", ht_h_idx);
		int htIdx = hotelDao.registHotelTemp(map);
		return htIdx;
	}

	/* 호텔 신규 등록 - 상세 */
	@PostMapping("/host/hotel/registHotelDetail")
	public void registHotelDetail(@RequestParam Map<String, Object> map, @RequestParam(name = "ht_idx") int ht_idx, @RequestParam(name = "ht_h_idx") int ht_h_idx,
			@RequestParam(name = "dImg1") MultipartFile dImg1, @RequestParam(name = "dImg2", required = false) MultipartFile dImg2, 
			@RequestParam(name = "dImg3", required = false) MultipartFile dImg3,  HttpServletRequest request) throws ParseException {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/hotel/");
		System.out.println("넘어오는 list 데이터 확인 : " + map);
		String d_img1 = "-";
		if (dImg1 != null && !dImg1.isEmpty()) {
			try {
				d_img1 = dImg1.getOriginalFilename();
				dImg1.transferTo(new File(path + d_img1));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		map.put("d_img1", d_img1);
		
		String d_img2 = "-";
		if (dImg2 != null && !dImg2.isEmpty()) {
			try {
				d_img2 = dImg2.getOriginalFilename();
				dImg2.transferTo(new File(path + d_img2));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		map.put("d_img2", d_img2);
		
		String d_img3 = "-";
		if (dImg3 != null && !dImg3.isEmpty()) {
			try {
				d_img3 = dImg3.getOriginalFilename();
				dImg3.transferTo(new File(path + d_img3));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		map.put("d_img3", d_img3);
		
		map.put("ht_idx", ht_idx);
		map.put("ht_h_idx", ht_h_idx);
		//hotelDao.registNewHotel(map);
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
		String ho_img = "";
		if (img != null && !img.isEmpty()) {
			String defaultImg = imgList.get("ho_img").toString();
			try {
				if (defaultImg != null && !defaultImg.equals("-")) {
					File file1 = new File(path + defaultImg);
					if (file1.exists()) {
						file1.delete();
					}
				}
				ho_img = img.getOriginalFilename();
				img.transferTo(new File(path + ho_img));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			ho_img = imgList.get("ho_img").toString();
		}
		map.put("ho_img", ho_img);
		hotelDao.editHotelDefaultInfo(map);
	}

	/* 호텔 편의 시설 수정 */
	@Transactional
	@PostMapping("/host/hotel/editHotel/amenity")
	public void editHotelAmenity(@RequestParam Map<String, Object> map, @RequestParam(name = "ho_idx") int ho_idx) {
		String[] items = map.get("checkItems").toString().split(",");
		map.put("ho_idx", ho_idx);
		hotelDao.initHotelAmenity(ho_idx);
		for (String item : items) {
			switch (item) {
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
			@RequestParam(name = "dImg1", required = false) MultipartFile dImg1,
			@RequestParam(name = "dImg2", required = false) MultipartFile dImg2,
			@RequestParam(name = "dImg3", required = false) MultipartFile dImg3, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/hotel/");
		System.out.println("map ===> " + map);
		Map<String, Object> imgList = hotelDao.getHotelImg(ho_idx);
		String d_img1 = "";
		String d_img2 = "";
		String d_img3 = "";
		if (dImg1 != null && !dImg1.isEmpty()) {
			String defaultImg = imgList.get("d_img1").toString();
			try {
				if (defaultImg != null && !defaultImg.equals("-")) {
					File file1 = new File(path + defaultImg);
					if (file1.exists()) {
						file1.delete();
					}
				}
				d_img1 = dImg1.getOriginalFilename();
				dImg1.transferTo(new File(path + d_img1));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			d_img1 = imgList.get("d_img1").toString();
		}
		map.put("d_img1", d_img1);

		if (dImg2 != null && !dImg2.isEmpty()) {
			String defaultImg = imgList.get("d_img2").toString();
			try {
				if (defaultImg != null && !defaultImg.equals("-")) {
					File file1 = new File(path + defaultImg);
					if (file1.exists()) {
						file1.delete();
					}
				}
				d_img2 = dImg2.getOriginalFilename();
				dImg2.transferTo(new File(path + d_img2));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			d_img2 = imgList.get("d_img2").toString();
		}
		map.put("d_img2", d_img2);

		if (dImg3 != null && !dImg3.isEmpty()) {
			String defaultImg = imgList.get("d_img3").toString();
			try {
				if (defaultImg != null && !defaultImg.equals("-")) {
					File file1 = new File(path + defaultImg);
					if (file1.exists()) {
						file1.delete();
					}
				}
				d_img3 = dImg3.getOriginalFilename();
				dImg3.transferTo(new File(path + d_img3));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			d_img3 = imgList.get("d_img3").toString();
		}
		map.put("d_img3", d_img3);
		hotelDao.editHotelRoomInfo(map);
	}

	/* 호텔 영업 중지 신청 */
	@PostMapping("/host/hotel/updateHotelStatus")
	public Map<String, Object> updateHotelStatus(@RequestParam(name = "ho_idx") int ho_idx,
			@RequestParam(name = "status") String status) {
		Map<String, Object> map = new HashMap<>();
		String result = hotelDao.updateHotelStatus(ho_idx, status);
		map.put("result", result);
		return map;
	}

	/* 호텔 이미지 모두 보기 */
	@GetMapping("/host/hotel/viewHotelImg/{hoIdx}")
	public List<HotelDTO> viewHotelImg(@PathVariable(name = "hoIdx") int ho_idx) {
		List<HotelDTO> hotelImg = hotelDao.viewHotelImg(ho_idx);
		return hotelImg;
	}
}