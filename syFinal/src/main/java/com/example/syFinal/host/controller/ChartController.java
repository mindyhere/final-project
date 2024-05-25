package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.host.model.dao.ChartDAO;

@RestController
@RequestMapping("api/chart/*")
public class ChartController {
	@Autowired
	ChartDAO chartDao;

	@GetMapping("labels/{userIdx}")
	public List<Map<String, Object>> hotelLabel(@PathVariable(name = "userIdx") int h_idx) {
		Map<String, Object> data = new HashMap<>();
		List<Map<String, Object>> list = chartDao.getHotelList(h_idx);
		System.out.println("=> 라벨? " + list);
		return list;
	}

	@GetMapping("sales/{userIdx}")
	public Map<String, Object> salesDataset(@PathVariable(name = "userIdx") int h_idx) {
		Map<String, Object> data = new HashMap<>();
		List lastMonth = chartDao.lastSales(h_idx);
		data.put("lastMonth", lastMonth);
		List thisMonth = chartDao.thisSales(h_idx);
		data.put("thisMonth", thisMonth);
		System.out.println("=> 매출? " + data);
		return data;
	}

}
