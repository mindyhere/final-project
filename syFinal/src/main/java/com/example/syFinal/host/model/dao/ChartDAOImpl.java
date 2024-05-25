package com.example.syFinal.host.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChartDAOImpl implements ChartDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public JSONObject lastSales(int h_idx) {
		JSONObject lastData = new JSONObject();
//		LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
//		System.out.println("=>now? " + now + ", " + now.minusMonths(1).getMonthValue());
//		int month = now.getDayOfMonth();
//		lastData.put("label", now.minusMonths(1).getMonthValue() + "월");
		try {
			List<Map<String, Object>> list = sqlSession.selectList("sales.lastMonth", h_idx);
			if (list != null && list.size() > 0) {
				JSONArray data = new JSONArray();
				for (Map<String, Object> m : list) {
					data.add(m.get("sales"));
				}
				lastData.put("data", data);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

//		System.out.println("=>지난달? " + lastData);
		return lastData;
	}

	@Override
	public JSONObject thisSales(int h_idx) {
		JSONObject thisData = new JSONObject();
//		LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
//		int month = now.getMonthValue();
//		thisData.put("label", now.getMonthValue() + "월");
		try {
			List<Map<String, Object>> list = sqlSession.selectList("sales.thisMonth", h_idx);
			if (list != null && list.size() > 0) {
				JSONArray data = new JSONArray();
				for (Map<String, Object> m : list) {
					data.add(m.get("sales"));
				}
				thisData.put("data", data);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

//		System.out.println("=>이번달? " + thisData);
		return thisData;
	}

	@Override
	public List<Map<String, Object>> getHotelList(int h_idx) {
		List<Map<String, Object>> hotels = null;
		try {
			hotels = sqlSession.selectList("sales.getHotelList", h_idx);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hotels;
	}

}
