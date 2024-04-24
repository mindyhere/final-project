package com.example.syFinal.host.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HotelDTO;

@Repository
public class HotelDAOImpl implements HotelDAO {

	@Autowired
	SqlSession sqlSession;

	/* 호텔 상세 정보 가져오기 */
	public List<HotelDTO> hoteLlist(int ho_idx) {
		List<HotelDTO> hotelList = sqlSession.selectList("hotel.getHotelList", ho_idx);
		System.out.println("hotelList : " + hotelList);
		return hotelList;
	}

}
