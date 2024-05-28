package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.AhostDAO;
import com.example.syFinal.admin.model.dto.AHostDTO;
import com.example.syFinal.admin.model.dto.MemoDTO;

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
		return list;
	} 

	@PostMapping("/admin/ah_detail")
	public Map<String, Object> detail(@RequestParam(name = "h_idx", defaultValue = "") int h_idx) {
		AHostDTO dto = dao.detail(h_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		return map;
	} 

	@RequestMapping("/admin/approve")
	public String approveHost(@RequestParam(name = "h_idx") int h_idx) {
		AHostDTO dto = dao.check_file(h_idx);	
	String message = ""; 
		if(dto.getH_file().length() != 1) {
			dao.a_approve(h_idx);
			message = "success";
		} else {
			message = "fail";
		}		
		System.out.println("message:"+message);
		return message;
	}
	
//	 @GetMapping("/admin/recentHosts")
//	    public ResponseEntity<List<MemoDTO>> getRecentHosts() {
//	        List<AHostDTO> recentHosts = dao.getRecentHosts(); // 이 메서드는 최근 가입된 호스트 목록을 반환해야 합니다.
//	        return new ResponseEntity<>(recentHosts, HttpStatus.OK);
//	    }
}