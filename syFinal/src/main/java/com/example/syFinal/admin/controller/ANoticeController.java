package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.ANoticeDAO;

@RestController
public class ANoticeController {

	@Autowired
	ANoticeDAO dao;

	@ResponseBody
	@PostMapping("notice/list")
	public List<Map<String, Object>> list(@RequestParam(name = "searchkey") String searchkey,
			@RequestParam(name = "search") String search) {
		
		System.out.println("searchkey:" + searchkey);
		System.out.println("search:" + search);
		
		return dao.list(searchkey, search);
	}

	@PostMapping("notice/insert")
	public void insert(@RequestBody Map<String, Object> map) {
		System.out.println("map:" + map);
		dao.insert(map);
	}

	@PostMapping("notice/update")
	public void update(@RequestBody Map<String, Object> map) {
		dao.update(map);

	}

	@ResponseBody
	@GetMapping("notice/detail")
	public Map<String, Object> detail(@RequestParam(name = "n_idx") int n_idx) {
		return dao.detail(n_idx);
	}

	@ResponseBody
	@PostMapping("notice/delete")
	public Map<String,Object>delete(@RequestParam(name="n_idx")int n_idx,@RequestParam(name="n_writer")String n_writer){
	Map<String,Object>result = new HashMap<>();
	if(dao.ncheck(n_idx,n_writer) != null){
		dao.delete(n_idx);
	result.put("result","success");
	}else{
		result.put("result","fail");
	}
	return result;
	}
}
