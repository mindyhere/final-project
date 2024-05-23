package com.example.syFinal.host.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.checkerframework.checker.units.qual.h;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HotelDetailDTO;

import jakarta.servlet.ServletContext;

@Repository
public class HotelDAOImpl implements HotelDAO {

	@Autowired
	SqlSession sqlSession;

	/* 호텔 상세 정보 */
	public Map<String, Object> hoteList(Map<String, Object> map) {
		return sqlSession.selectOne("hotel.getHotelList", map);
	}
	
	/* 호텔 이미지 정보 */
	public List<HotelDetailDTO> hotelImg(int ho_idx) {
		return sqlSession.selectList("hotel.getHotelList", ho_idx);
	}

	/* 호텔 객실 정보 */
	@Override
	public List<HotelDetailDTO> hotelRooms(int ho_idx) {
		return sqlSession.selectList("hotel.getHotelRooms", ho_idx);
	}

	/* 호텔 편의시설 */
	@Override
	public Map<String, Object> hotelAmenity(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelAmenity", ho_idx);
	}

	/* 호텔 호스트 정보 */
	@Override
	public Map<String, Object> hostInfo(int ho_idx) {
		return sqlSession.selectOne("hotel.getHostInfo", ho_idx);
	}

	/* 호텔 이용규칙 */
	@Override
	public Map<String, Object> hotelRule(int ho_idx){
		return sqlSession.selectOne("hotel.getHotelRule", ho_idx);
	}

	/* 호텔 예약(1박 가격) */
	@Override
	public Map<String, Object> hotelPrice(int ho_idx) {
		return sqlSession.selectOne("hotel.getPrice", ho_idx);
	}

	/* 호스트 상세페이지(게스트용) */
	@Override
	public Map<String, Object> hostPage(int h_idx) {
		return sqlSession.selectOne("hotel.getHostPage", h_idx);
	}

	/* 호스트의 호텔 리스트 */
	@Override
	public Map<String, Object> hotelSummary(int h_idx) {
		return sqlSession.selectOne("hotel.getHotelSummary", h_idx);
	}

	/* 호스트의 모든 호텔 리뷰 */
	@Override
	public List<Map<String, Object>> allReviews(int h_idx) {
		return sqlSession.selectList("hotel.getAllReviews", h_idx);
	}

	/* 호스트의 호텔 현황 */
	@Override
	public Map<String, Object> hotelStatus(int h_idx) {
		return sqlSession.selectOne("hotel.getHotelStatus", h_idx);
	}	
	
	/* 호스트의 호텔 목록 */
	@Override
	public List<Map<String, Object>> hostAllHotel(int h_idx) {
		return sqlSession.selectList("hotel.getHostAllHotel", h_idx);
	}	
	
	@Override
	public List<HotelDetailDTO> imp_date(int ho_idx, int d_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("d_idx", d_idx);
		return sqlSession.selectList("hotel.imp_date", map);
	}
	
	/* 호텔 상세 정보 조회 */
	@Override
	public List<Map<String, Object>> detailMyHotel(int ho_idx) {
		return sqlSession.selectList("hotel.getDetailMyHotel", ho_idx);
	}

	/* 호텔 대표 이미지 조회 */
	@Override
	public Map<String, Object> getHotelImg(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelImg", ho_idx);
	}

	/* 신규 호텔 등록(임시) */
	@Override
	public int registHotelTemp(Map<String, Object> map) {
		sqlSession.insert("hotel.registHotelTemp", map);
		int hoIdx = sqlSession.selectOne("hotel.findHtHidx", map.get("ht_h_idx"));
		return hoIdx;
	}
	
	/* 호텔 최종 등록 */
	@Override
	public void registNewHotel(Map<String, Object> map) {
		System.out.println("@ dao - map : " + map);
		int ht_idx = (int) map.get("ht_idx");
		int ht_h_idx = (int) map.get("ht_h_idx");
		// 편의시설 등록
		Map<String, Object> newAmenity = new HashMap<>();
		newAmenity.put("newAmenity", map.get("checkItems"));
		String[] items= map.get("checkItems").toString().split(",");
		System.out.println("@ newAmenity  " + newAmenity);
		System.out.println("@ items :"  + items);
		System.out.println("@ 호텔 번호 ht_idx :"  + ht_idx);
		System.out.println("@ 회원번호 ht_h_idx :"  + ht_h_idx);
		sqlSession.insert("hotel.insertNewAmenity", ht_idx);
		for(String item : items){
			newAmenity.put("ho_idx", ht_idx);
			switch(item){
			  case "0": 
				  newAmenity.put("option", "mountain_view");
				  sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			  case "1": 
				  newAmenity.put("option", "ocean_view");
				  sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			  case "2": 
				  newAmenity.put("option", "wifi");
				  sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			  case "3": 
				  newAmenity.put("option", "parking_lot");
				  sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			  case "4": 
				  newAmenity.put("option", "breakfast");
				  sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			  case "5": 
				  newAmenity.put("option", "fire_alam");
				  sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			  case "6": 
				  newAmenity.put("option", "fire_extinguisher");
				  sqlSession.update("hotel.editHotelAmenity", newAmenity);
				break;
			}
		}
		System.out.println("편의시설 등록 완료");
		System.out.println("==========================");
		System.out.println("객실정보 등록 시작");
		// 객실정보 등록
		System.out.println("1.타입확인 :  " + map.get("list").getClass().getName());
		System.out.println("1.타입확인 :  " + map.get("list").getClass());
		
//		List<Map<String, Object>> list = (List<Map<String, Object>>) map.get("list");
//		for(int i = 0; i < list.size(); i ++) {
//			Map<String, Object> newRoom = new HashMap<>();
//			newRoom.put("roomType", list.get(i).get("roomType"));
//			newRoom.put("capacity", list.get(i).get("capacity"));
//			newRoom.put("area", list.get(i).get("area"));
//			newRoom.put("beds", list.get(i).get("beds"));
//			newRoom.put("smoking", list.get(i).get("smoking"));
//			newRoom.put("price", list.get(i).get("price"));
//			newRoom.put("dImg1", list.get(i).get("dImg1"));
//			newRoom.put("dImg2", list.get(i).get("dImg2"));
//			newRoom.put("dImg3", list.get(i).get("dImg3"));
//			newRoom.put("ht_idx", ht_idx);
//			sqlSession.insert("hotel.insertNewRoom", newRoom);
//		}

		// 호텔 테이블 insert
		sqlSession.insert("hotel.insertNewHotel", ht_idx);

		// 임시테이블에서 상태변경
		Map<String, Object> insertRow = new HashMap<>();
		insertRow.put("ht_idx", ht_idx);
		insertRow.put("ht_h_idx", ht_h_idx);
		System.out.println("@ insertRow  " + insertRow);
		sqlSession.update("hotel.updateTempHotel", insertRow);
	}

	/* 호텔 기본 정보 수정 */
	@Override
	public void editHotelDefaultInfo(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelDefaultInfo", map);
	}
	
	/* 호텔 편의시설 초기화 */
	@Override
	public void initHotelAmenity(int ho_idx) {
		sqlSession.update("hotel.initHotelAmenity", ho_idx);
	}
	
	/* 호텔 편의시설 수정 */
	@Override
	public void editAmenity(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelAmenity", map);
	}
	
	/* 호텔 객실 정보 수정 */
	@Override
	public void editHotelRoomInfo(Map<String, Object> map) {
		sqlSession.update("hotel.editHotelRoomInfo", map);
	}
	
	/* 호텔 영업 중지 신청 */
	@Override
	public void closeHotel(int ho_idx) {
		sqlSession.update("hotel.closeHotel", ho_idx);
	}
	
	@Override
	public int room_count(int ho_idx, int d_idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("d_idx", d_idx);
		return sqlSession.selectOne("hotel.roomCount", map);
	}
}