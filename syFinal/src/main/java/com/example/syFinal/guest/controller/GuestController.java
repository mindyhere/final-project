package com.example.syFinal.guest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.guest.model.dao.GuestDAO;
import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.guest.model.dto.MainDTO;

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
	
	@RequestMapping("/guest/pay")
	public List<Map<String, Object>> paylist(@RequestParam(name="g_idx") int g_idx) {
		List<GuestDTO> dto = dao.paylist(g_idx);
		List<Map<String, Object>> paylist = new ArrayList<>();
		for(int i=0; i<dto.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("G_idx", dto.get(i).getG_idx());
			map.put("D_img1", dto.get(i).getD_img1());
			map.put("O_state", dto.get(i).getO_state());
			map.put("O_orderdate", dto.get(i).getO_orderdate());
			map.put("O_payment", dto.get(i).getO_payment());
			map.put("O_ckin", dto.get(i).getO_ckin());
			map.put("O_ckout", dto.get(i).getO_ckout());
			map.put("O_finalprice", dto.get(i).getO_finalprice());
			paylist.add(map);
		}
		System.out.println("결제리스트====" + paylist);
		
		return paylist;
	}
}
