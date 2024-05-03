package com.example.syFinal.guest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.syFinal.guest.model.dao.WishDAO;
import com.example.syFinal.guest.model.dto.MainDTO;

@Controller
@RequestMapping("guest/wish/*")
public class WishController {
	@Autowired
	WishDAO dao;
	 
	// guest/wishList
	@RequestMapping("wishList")
	@ResponseBody
	public List<Map<String, Object>> wish(@RequestParam(name = "g_idx") int g_idx) {
		List<MainDTO> main = dao.wishlist(g_idx);
		List<Map<String, Object>> list = new ArrayList<>();
		for(int i=0; i<main.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("wIdx", main.get(i).getW_idx());
			map.put("HoIdx", main.get(i).getHo_idx());
			map.put("HoName", main.get(i).getHo_name());
			map.put("HoImg", main.get(i).getHo_img());
			list.add(map);
		}
		return list;
	}
	
	// guest/wish
	@RequestMapping("recentImg")
	@ResponseBody
	public Map<String, Object> recentImg(@RequestParam(name = "idx") int idx, @RequestParam(name = "g_idx") int g_idx) {
		Map<String, Object> map = new HashMap<>();
		if (idx == 0) {
			map.put("firstRecent", "no-image.png");
		} else {
			String recentImage = dao.firstRecent(idx);
			map.put("firstRecent", recentImage);
		}
		int count = dao.countWish(g_idx);
		if (count == 0) {
			map.put("firstWish", "no-image.png");
		} else {
			List<MainDTO> dto = dao.firstWish(g_idx);
			map.put("firstWish", dto.get(0).getHo_img());
		}
		return map;
	}
	
	@PostMapping("delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestParam(name = "w_idx") int w_idx) {
		System.out.println(w_idx);
		Map<String, Object> map = new HashMap<>();
		String result = dao.delete(w_idx);
		map.put("result", result);
		return map;
	}
	
}
