package com.example.syFinal.guest.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
	public Map<String, Object> list(@RequestParam(name = "g_idx") int g_idx) {
		List<ReservDTO> dto = dao.list(g_idx);
		//System.out.println(dto);	
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date now = new Date();
		Date ck = new Date();
		List<Map<String, Object>> after = new ArrayList<>();
		List<Map<String, Object>> before = new ArrayList<>();
		List<Map<String, Object>> review = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		for(int i=0; i<dto.size(); i++) {
			try {
				ck = format.parse(dto.get(i).getO_ckin());
			} catch (Exception e) {
			}
			// System.out.println(ck.before(now));
			if(ck.before(now)) {
				Map<String, Object> map1 = new HashMap<>();
				map1.put("OIdx", dto.get(i).getO_idx());
				map1.put("HoImg", dto.get(i).getHo_img());
				map1.put("OCkin", dto.get(i).getO_ckin());
				map1.put("OCkout", dto.get(i).getO_ckout());
				map1.put("HName", dto.get(i).getH_name());
				map1.put("HoAddress", dto.get(i).getHo_address());
				map1.put("HoName", dto.get(i).getHo_name());
				before.add(map1);
			} else {
				Map<String, Object> map2 = new HashMap<>();
				//map2.put("HoIdx", dto.get(i).getD_ho_idx());
				map2.put("OIdx", dto.get(i).getO_idx());
				map2.put("HoImg", dto.get(i).getHo_img());
				map2.put("OCkin", dto.get(i).getO_ckin());
				map2.put("OCkout", dto.get(i).getO_ckout());
				map2.put("HName", dto.get(i).getH_name());
				map2.put("HoAddress", dto.get(i).getHo_address());
				map2.put("HoName", dto.get(i).getHo_name());
				after.add(map2);
			}	
		}
		List<ReservDTO> dto3 = dao.reservReview(g_idx);
		for(int i=0; i<dto3.size(); i++) {
			Map<String, Object> map3 = new HashMap<>();			
			map3.put("OIdx", dto3.get(i).getO_idx());
			map3.put("HoImg", dto3.get(i).getHo_img());
			map3.put("OCkin", dto3.get(i).getO_ckin());
			map3.put("OCkout", dto3.get(i).getO_ckout());
			map3.put("HName", dto3.get(i).getH_name());
			map3.put("HoAddress", dto3.get(i).getHo_address());
			map3.put("HoName", dto3.get(i).getHo_name());
			review.add(map3);
		}
		map.put("review", review);
		map.put("before", before);
		map.put("after", after);
		// System.out.println(map);
		return map;
	}
	
	@RequestMapping("lastDetail")
	@ResponseBody
	public Map<String, Object> lastDetail(@RequestParam(name = "o_idx") int o_idx) {
		ReservDTO dto = dao.lastDetail(o_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		// System.out.println(map);
		return map;
	}
}
