package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.AGuestDAO;
import com.example.syFinal.admin.model.dto.AGuestDTO;

@RestController
public class AGuestController {

	@Autowired
	AGuestDAO dao;

	@Autowired
	SqlSession sqlSession;

	@PostMapping("/admin/ag_list")
	public List<AGuestDTO> list(@RequestParam(name = "searchkey") String searchkey,
			@RequestParam(name = "search") String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("searchkey", searchkey);
		map.put("search", search);
		List<AGuestDTO> list = dao.list(searchkey, search);
		System.out.println("list 결과값~~~~~:" + list);
		return list;
	}

	@GetMapping("/admin/ag_detail")
	public Map<String, Object> detail(@PathVariable(name = "g_idx") int g_idx) {
		return dao.detail(g_idx);
	}

	@PostMapping("/admin/ag_update")
	public void update(@RequestParam Map<String, Object> map) {
		dao.update(map);
	}

	@PostMapping("admin/ag_delete")
	public void delete(@RequestParam(name = "g_idx") int g_idx) {
		dao.delete(g_idx);
	}

}
