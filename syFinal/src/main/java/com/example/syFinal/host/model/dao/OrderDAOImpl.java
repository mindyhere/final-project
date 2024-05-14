package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDAOImpl implements OrderDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public int confirm(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> getList(int h_idx) {
		List<Map<String, Object>> list = null;
		try {
			list = sqlSession.selectList("order.getList", h_idx);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<Map<String, Object>> getHotelList(int h_idx) {
		List<Map<String, Object>> hotels = null;
		try {
			hotels = sqlSession.selectList("order.getHotelList", h_idx);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return hotels;
	}

}
