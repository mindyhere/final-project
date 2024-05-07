package com.example.syFinal.global.controller;

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

import com.example.syFinal.global.model.ReputationDAO;

@RestController
@RequestMapping("api/reputation/*")
public class ReputationController {
	@Autowired
	ReputationDAO reputationDao;

	@GetMapping("list/{ho_idx}")
	public Map<String, Object> getHotelReviews(@PathVariable(name = "ho_idx") int ho_idx) {
		List<Map<String, Object>> list = reputationDao.getHotelReviews(ho_idx);
		Map<String, Object> data = new HashMap<>();
		if (list.isEmpty() || list == null) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			data.put("list", list);
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		}
		return data;
	}
}
