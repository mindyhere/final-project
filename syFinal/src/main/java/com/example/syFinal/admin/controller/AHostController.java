package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.AhostDAO;
import com.example.syFinal.admin.model.dto.AHostDTO;

@RestController
//@RequestMapping("admin/*")
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
		System.out.println("ah_list 결과값!!!:" + list);
		return list;
	}

	@PostMapping("/admin/ah_detail")
	public Map<String, Object> detail(@RequestParam(name = "h_idx", defaultValue = "") int h_idx) {
		AHostDTO dto = dao.detail(h_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		System.out.println(map);
		return map;
	}

	@Transactional
	@GetMapping("/admin/approve/{h_idx}")
	public String approveHost(@PathVariable(name = "h_idx") int h_idx) {
		System.out.println("==> 컨트롤러" + h_idx);
		try {
			 dao.a_approve(h_idx);
			return "Host registration approved successfully.";
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("list 결과값dfdfdf:" + h_idx);
			return "Error occurred while approving host registration.";
		}

	}
//	@GetMapping("admin/approve_host")
//	public String approveHost(@RequestParam(name = "h_idx", defaultValue = "") int h_idx) {
//		System.out.println("==> 컨트롤러" + h_idx);
//		try {
//			dao.a_approve(h_idx);
//			return "Host registration approved successfully.";
//		} catch (Exception e) {
//			e.printStackTrace();
//			System.out.println("list 결과값dfdfdf:" +h_idx );
//			return "Error occurred while approving host registration.";
//		}
//		
//	}

}