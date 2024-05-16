package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.AGuestDAO;
import com.example.syFinal.admin.model.dto.AGuestDTO;

@RestController
public class AGuestController {

	@Autowired
	AGuestDAO dao;

	@Autowired
	SqlSession sqlSession;
	
	@ResponseBody
	@GetMapping("/admin/ag_list")
	public List<AGuestDTO> list(@RequestParam(name = "searchkey", defaultValue="") String searchkey,
			@RequestParam(name = "search", defaultValue="") String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("searchkey", searchkey);
		map.put("search", search);
		List<AGuestDTO> list = dao.list(searchkey, search);
		System.out.println("list 결과값@@@@~~~~~:" + list);
		return list;
	}

	@ResponseBody
	@PostMapping("/admin/ag_detail")
	public Map<String, Object> detail(@RequestParam(name = "g_idx" ) int g_idx) {
		System.out.println("!!!!!!!!! g_idx : " + g_idx);
		AGuestDTO dto = dao.detail(g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		System.out.println(map);
		return map;
	}

	@PostMapping("/admin/ag_update")
	public Map<String, Object> update(@RequestParam(name = "g_idx" ) int g_idx,
			@RequestParam(name = "g_level", defaultValue = "") int g_level,
			@RequestParam(name = "g_point", defaultValue = "") int g_point) {
		AGuestDTO dto = dao.detail(g_idx);
		if (dto != null) {
			dto.setG_level(g_level);
			dto.setG_point(g_point);
			String result = dao.update(dto);

			Map<String, Object> map = new HashMap<>();
			map.put("g_idx", g_idx);
			map.put("g_level", g_level);
			map.put("g_point", g_point);
			map.put("result", result);
			return map;
		} else {
			Map<String, Object> errorMap = new HashMap<>();
			errorMap.put("error", "Guest not found");
			return errorMap;
		}
	}

	@PostMapping("/admin/ag_delete")
	public Map<String, Object> delete(@RequestParam(name = "g_idx") int g_idx) {
		String result = dao.delete(g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}

}
