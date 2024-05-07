package com.example.syFinal.guest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.syFinal.guest.model.dao.ReservDAO;
import com.example.syFinal.guest.model.dto.ReservDTO;

@Controller
@RequestMapping("guest/reserv/*")
public class ReservController {
	@Autowired
	ReservDAO dao;
	
	@RequestMapping("list")
	@ResponseBody
	public List<Map<String, Object>> list(@RequestParam(name = "g_idx") int g_idx) {
		List<ReservDTO> dto = dao.list(g_idx);
		//System.out.println(dto);
		List<Map<String, Object>> list = new ArrayList<>();
		for(int i=0; i<dto.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("HoIdx", dto.get(i).getD_ho_idx());
			map.put("HoImg", dto.get(i).getHo_img());
			map.put("OCkin", dto.get(i).getO_ckin());
			map.put("OCkout", dto.get(i).getO_ckout());
			map.put("HName", dto.get(i).getH_name());
			map.put("HoAddress", dto.get(i).getHo_address());
			map.put("HoName", dto.get(i).getHo_name());
			list.add(map);
		}
		System.out.println(list);
		return list;
	}
}
