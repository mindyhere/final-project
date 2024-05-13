package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.AhostDAO;
import com.example.syFinal.admin.model.dto.AHostDTO;

@RestController
public class AHostController {

	@Autowired
	AhostDAO dao;

	@Autowired
	SqlSession sqlSession;

	@PostMapping("/admin/ah_list")
	public List<AHostDTO> list(@RequestParam(name = "searchkey") String searchkey,
			@RequestParam(name = "search") String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("searchkey", searchkey);
		map.put("search", search);
		List<AHostDTO> list = dao.list(searchkey, search);
		System.out.println("list 결과값!!!:" + list);
		return list;
	}
	
	@ResponseBody
	@PostMapping("/admin/ah_detail")
	public Map<String, Object> detail(@RequestParam(name = "h_idx", defaultValue = "") int h_idx) {
		AHostDTO dto = dao.detail(h_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		System.out.println(map);
		return map;
	}

	

	@PostMapping("/admin/ah_delete")
	public Map<String, Object> delete(@RequestParam(name = "h_idx") int h_idx) {
		String result = dao.delete(h_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
}