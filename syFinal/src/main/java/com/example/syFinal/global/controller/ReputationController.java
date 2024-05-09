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

	@GetMapping("list/{HoIdx}")
	public Map<String, Object> getHotelReviews(@PathVariable(name = "HoIdx") int ho_idx) {
		System.out.println("==> ho_idx? " + ho_idx);
		List<Map<String, Object>> list = reputationDao.getHotelReviews(ho_idx);
		Map<String, Object> data = new HashMap<>();
		if (list == null) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			data.put("list", list);
			data.put("avg", reputationDao.calcAvgRate(ho_idx));
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		}
		System.out.println("==> data? " + data);
		return data;
	}

	@GetMapping("reply/{rv_idx}")
	public Map<String, Object> getReply(@PathVariable(name = "rv_idx") int rv_idx) {
		System.out.println("==> rv_idx? " + rv_idx);
		Map<String, Object> reply = null;
		Map<String, Object> data = new HashMap<>();
		try {
			reply = reputationDao.getReply(rv_idx);
			data.put("reply", reply);
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("==> null?" + (reply == null));
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		}
		System.out.println("==> reply? " + data);
		return data;
	}
}
