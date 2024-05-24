package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.host.model.dao.OrderDAO;

@RestController
@RequestMapping("api/chart/*")
public class ChartController {
	@Autowired
	OrderDAO orderDao;

	@GetMapping("labels/{userIdx}")
	public List<Map<String, Object>> hotelLabel(@PathVariable(name = "userIdx") int h_idx) {
		Map<String, Object> data = new HashMap<>();
		List<Map<String, Object>> list = orderDao.getHotelList(h_idx);
		System.out.println("=> 라벨? " + list);
		return list;
	}

	@GetMapping("sales/{userIdx}")
	public List<Map<String, Object>> salesData(@PathVariable(name = "userIdx") int h_idx) {
		Map<String, Object> data = new HashMap<>();
		List<Map<String, Object>> list = orderDao.salesData(h_idx);
		System.out.println("=> 매출? " + list);
		return list;
	}

}
