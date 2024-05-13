package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public List<ANoticeDTO> list(@RequestParam(name = "searchkey") String searchkey,
			@RequestParam(name = "search") String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("searchkey", searchkey);
		map.put("search", search);

		List<ANoticeDTO> list = dao.list(searchkey, search);
		System.out.println("list 결과값~:" + list);
		return list;

	}

	   @PostMapping("/notice/insert")
    public Map<String, Object> insert(@RequestBody Map<String, String> requestData) {
        String n_writer = requestData.get("n_writer");
        String n_title = requestData.get("n_title");
        String n_content = requestData.get("n_content");
        String n_date = requestData.get("n_date");

        ANoticeDTO dto = new ANoticeDTO();
        dto.setN_writer(n_writer);
        dto.setN_title(n_title);
        dto.setN_content(n_content);
        dto.setN_date(n_date);

        String result = dao.insert(dto);

        Map<String, Object> map = new HashMap<>();
        map.put("n_writer", n_writer);
        map.put("n_title", n_title);
        map.put("n_content", n_content);
        map.put("n_date", n_date);
        map.put("result", result);

        return map;
    }


	@PostMapping("/notice/update")
	public Map<String, Object> update(@RequestParam(name = "n_idx") int n_idx,
			@RequestParam(name = "n_writer", defaultValue = "") String n_writer,
			@RequestParam(name = "n_title", defaultValue = "") String n_title,
			@RequestParam(name = "n_content", defaultValue = "") String n_content,
			@RequestParam(name = "n_content", defaultValue = "") String n_date) {
		ANoticeDTO dto = dao.detail(n_idx);
		dto.setN_idx(n_idx);
		dto.setN_writer(n_writer);
		dto.setN_title(n_title);
		dto.setN_content(n_content);
		dto.setN_date(n_date);
		String result = dao.update(dto);

		Map<String, Object> map = new HashMap<>();
		map.put("n_idx", n_idx);
		map.put("n_writer", n_writer);
		map.put("n_title", n_title);
		map.put("n_content", n_content);
		map.put("n_date", n_date);
		map.put("result", result);
		return map;
	}

	public String update(@RequestBody ANoticeDTO map) {
		return dao.update(map);
	}

	@GetMapping("/notice/detail")
	public Map<String, Object> detail(@RequestParam(name = "n_idx") int n_idx) {
		ANoticeDTO dto = dao.detail(n_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		System.out.println(map);
		return map;
	}

	@PostMapping("/notice/delete")
	public Map<String, Object> delete(@RequestParam(name = "n_idx") int n_idx) {
		String result = dao.delete(n_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
}