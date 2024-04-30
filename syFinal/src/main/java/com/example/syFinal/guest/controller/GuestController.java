package com.example.syFinal.guest.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.guest.model.dao.GuestDAO;
import com.example.syFinal.guest.model.dto.GuestDTO;

@RestController
public class GuestController {
	
	@Autowired
	GuestDAO dao;
	
	
	@GetMapping("/guest/my")
	public GuestDTO my(@RequestParam(name="g_idx") int g_idx) {
		GuestDTO mypage = dao.my(g_idx);
		//Map<String,Object> map = new HashMap<>();
		//GuestDTO dto = new GuestDTO();
		System.out.println("마이페이지=="+mypage);
		return mypage;
	}
}
