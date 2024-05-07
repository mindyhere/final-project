package com.example.syFinal.global.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.ReputationDAO;
import com.example.syFinal.guest.model.dto.ReviewDTO;

@RestController
@RequestMapping("api/reputation/*")
public class ReputationController {
	@Autowired
	ReputationDAO reputationDao;

	@GetMapping("list/{ho_idx}")
	public List<ReviewDTO> getHotelReviews(@PathVariable(name = "ho_idx") int ho_idx) {
		List<ReviewDTO> list = reputationDao.getHotelReviews(ho_idx);
		return list;
	}
}
