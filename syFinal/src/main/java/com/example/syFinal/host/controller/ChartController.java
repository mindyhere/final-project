package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.host.model.dao.ChartDAO;

@RestController
@RequestMapping("api/chart/*")
public class ChartController {
//	@Autowired
//	OrderDAO orderDao;
	@Autowired
	ChartDAO chartDao;

	@GetMapping("labels/{userIdx}")
	public List<Map<String, Object>> hotelLabel(@PathVariable(name = "userIdx") int h_idx) {
		Map<String, Object> data = new HashMap<>();
		List<Map<String, Object>> list = chartDao.getHotelList(h_idx);
//		List<Map<String, Object>> list = orderDao.getHotelList(h_idx);
		System.out.println("=> 라벨? " + list);
		return list;
	}

	@GetMapping("sales/{userIdx}")
	public JSONArray salesDataset(@PathVariable(name = "userIdx") int h_idx) {
		JSONArray data = new JSONArray();
		JSONObject lastMonth = chartDao.lastSales(h_idx);
		data.add(lastMonth);
		JSONObject thisMonth = chartDao.thisSales(h_idx);
		data.add(thisMonth);
		System.out.println("=> 매출? " + data);
		return data;
	}

}
