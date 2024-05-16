package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.ANoticeDAO;
import com.example.syFinal.admin.model.dto.ANoticeDTO;

@RestController
public class ANoticeController {

	@Autowired
	ANoticeDAO dao;

	@Autowired
	SqlSession sqlSession;

	@PostMapping("notice/list")
	public List<ANoticeDTO> list(@RequestParam(name = "searchkey", defaultValue = "") String searchkey,
			@RequestParam(name = "search", defaultValue = "") String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("searchkey", searchkey);
		map.put("search", search);
		List<ANoticeDTO> list = dao.list(searchkey, search);
		System.out.println("list 결과값~!!!!:" + list);
		return list;

	}

	@Transactional
	@PostMapping("notice/insert")
	public ResponseEntity<String> insert(@RequestParam Map<String, Object> map) {
		System.out.println("map " + map);
		try {
			dao.insert(map);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/notice/detail/{n_idx}")
	public ResponseEntity<?> detail(@PathVariable("n_idx") int n_idx) {
		try {
			ANoticeDTO dto = dao.detail(n_idx);
			if (dto != null) {
				return ResponseEntity.ok().body(dto);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	@PostMapping("/notice/delete")
	public Map<String, Object> delete(@RequestParam(name = "n_idx") int n_idx) {
		String result = dao.delete(n_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
}