package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.host.model.dao.HostDAO;
import com.example.syFinal.host.model.dao.OrderDAO;

@RestController
@RequestMapping("api/order/*")
public class OrderController {
	@Autowired
	OrderDAO orderDao;

	@Autowired
	HostDAO hostDAO;

	@GetMapping("manage/list/{userIdx}")
	public Map<String, Object> getOrderList(@PathVariable(name = "userIdx") int h_idx) {
		System.out.println("==> userIdx? " + h_idx);
		List<Map<String, Object>> hotels = orderDao.getHotelList(h_idx);
		List<Map<String, Object>> list = orderDao.getList(h_idx);
		Map<String, Object> data = new HashMap<>();
		data.put("hotels", hotels);
		if (hotels == null) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			data.put("list", list);
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		}
		System.out.println("==> data확인? " + data);
		return data;
	}
}
