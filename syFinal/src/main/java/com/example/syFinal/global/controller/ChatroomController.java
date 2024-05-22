package com.example.syFinal.global.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.syFinal.global.model.ChatroomDAO;
import com.example.syFinal.global.model.MessageDTO;

@Controller
@RequestMapping("chatroom/*")
public class ChatroomController {
	
	@Autowired
	ChatroomDAO dao;
	
	// 전체 채팅 목록
	@RequestMapping("g_list")
	@ResponseBody
	public Map<String, Object> g_list(@RequestParam(name = "g_idx") int g_idx) {
		List<MessageDTO> dto = dao.g_list(g_idx);		
		for (int i=0; i<dto.size(); i++) {
			String pro = "http://localhost/static/images/host/profile/"+dto.get(i).getH_profile();
			dto.get(i).setH_profile(pro);
			MessageDTO date_msg = dao.last_message(g_idx, dto.get(i).getM_h_idx());
			String msg = date_msg.getM_message();
			if (msg.length() > 17) {
				msg = msg.substring(0, 16)+"...";
			}
			dto.get(i).setM_message(msg);
			String date = date_msg.getM_send_date();
			date = date.substring(5);
			date = date.replace('-', '.');
			dto.get(i).setM_send_date(date);	
		}
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		return map;
	}
	
	@RequestMapping("h_list")
	@ResponseBody
	public Map<String, Object> h_list(@RequestParam(name = "h_idx") int h_idx) {
		List<MessageDTO> dto = dao.h_list(h_idx);	
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		return map;
	}
	
	// 채팅방 생성
	@PostMapping("create")
	@ResponseBody
	public String create(@RequestParam(name = "h_idx") int h_idx, @RequestParam(name = "g_idx") int g_idx,
			@RequestParam(name = "message") String message, @RequestParam(name = "roomId", defaultValue="") String roomId) {
		UUID uuid = UUID.randomUUID();
		String room = "";
		if (roomId == "") {
			room = uuid.toString();
		} else {
			room = roomId;
		}
		String result = dao.create(room, g_idx, h_idx, message);	
		return result;
	}
	
	// 해당 채팅 조회
	@PostMapping("entrance")
	@ResponseBody
	public Map<String, Object> entrance(@RequestParam(name = "h_idx") int h_idx, @RequestParam(name = "g_idx") int g_idx) {
		List<MessageDTO> dto = dao.entrance(g_idx, h_idx);	
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		return map;
	}
}
