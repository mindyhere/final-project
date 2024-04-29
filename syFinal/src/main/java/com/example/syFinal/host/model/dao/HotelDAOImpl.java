package com.example.syFinal.host.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.host.model.dto.HotelDTO;

@Repository
public class HotelDAOImpl implements HotelDAO {

	@Autowired
	SqlSession sqlSession;

	/* 호텔 상세 정보 가져오기 */
	public HotelDTO hoteLlist(int ho_idx) {
		return sqlSession.selectOne("hotel.getHotelList", ho_idx);
	}

}
