package com.example.syFinal.guest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.guest.model.dao.GuestDAO;
import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.guest.model.dto.MainDTO;
import com.example.syFinal.host.model.dao.HotelDAO;
import com.example.syFinal.host.model.dto.HotelDTO;

@RestController
public class GuestController {
	
	@Autowired
	GuestDAO dao;
	
	//게스트 정보
	@RequestMapping("/guest/my")
	public Map<String, Object> my(@RequestParam(name="g_idx") int g_idx) {
		GuestDTO mypage = dao.my(g_idx);
		//Map<String, Object> mypage = dao.my(g_idx);
		//Map<String,Object> map = new HashMap<>();
		//GuestDTO dto = new GuestDTO();
		Map<String, Object> map = new HashMap<>();
		//map.put("myphoto", mypage.getG_photo());
		map.put("dto", mypage);
		//System.out.println(map);
		System.out.println("마이페이지=="+map);
		return map;
	}
	//카드정보등록
	@PostMapping("/guest/cardupdate")
	public void cardupdate (@RequestParam Map<String, Object> map) {
		dao.cardupdate(map);
	}
	//카드정보삭제
	@PostMapping("/guest/carddelete")
	public void carddelete (@RequestParam Map<String, Object> map) {
		dao.carddelete(map);
	}
	
	//게스트 결제리스트
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
	
	//예약요청
	@PostMapping("/guest/order")
	public void order(@RequestParam(name="idx") int idx,@RequestParam(name="didx") int didx,
			@RequestParam(name="ckin") String ckin, @RequestParam(name="ckout") String ckout,
			@RequestParam(name="reser") int reser, @RequestParam(name="pay") String pay,
			@RequestParam(name="dprice") int dprice, @RequestParam(name="fprice") int fprice) {
		Map<String, Object> map1 = new HashMap<>();
		map1.put("idx", idx);
		map1.put("didx", didx);
		map1.put("ckin", ckin);
		map1.put("ckout", ckout);
		map1.put("reser", reser);
		map1.put("pay", pay);
		map1.put("dprice", dprice);
		map1.put("fprice", fprice);
		System.out.println("예약요청"+map1);
		dao.order(map1);
	}
}
