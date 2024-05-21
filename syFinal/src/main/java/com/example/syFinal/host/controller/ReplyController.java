package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.PageUtil;
import com.example.syFinal.global.model.ReputationDAO;
import com.example.syFinal.guest.model.dao.ReviewDAO;
import com.example.syFinal.host.model.dao.ReplyDAO;

@RestController
@RequestMapping("api/reply/*")
public class ReplyController {
	@Autowired
	ReviewDAO reviewDao;

	@Autowired
	ReplyDAO replyDao;

	@Autowired
	ReputationDAO reputationDao;

	@Transactional
	@PostMapping("insert")
	public ResponseEntity<String> insert(@RequestParam Map<String, Object> map) {
		System.out.println("==> map? " + map);
		try {
			replyDao.insertReply(map);
			System.out.println("ok");
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			// 에러발생
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@Transactional
	@PostMapping("edit")
	public ResponseEntity<String> editReply(@RequestParam Map<String, Object> map) {
		try {
			replyDao.editReply(map);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			// 에러발생
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@Transactional
	@GetMapping("delete/{rp_idx}")
	public ResponseEntity<String> delete(@PathVariable(name = "rp_idx") int rp_idx) {
		System.out.println("==> delete" + rp_idx);
		try {
			replyDao.delete(rp_idx);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			// 에러발생
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("search/reviews/{userIdx}")
	public Map<String, Object> reviewSearch(@PathVariable(name = "userIdx") int h_idx,
			@RequestParam(name = "sort", defaultValue = "") String sort,
			@RequestParam(name = "keyword", defaultValue = "") String keyword,
			@RequestParam(name = "pageNum", defaultValue = "1") int pageNum) {
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("sort", sort);
		map.put("keyword", keyword);
		map.put("pageNum", pageNum);
//		System.out.println("==> 소트? " + map.get("sort"));
		int cnt = replyDao.count(map);
		PageUtil page = new PageUtil(cnt, pageNum);
		int start = page.getPageBegin() - 1;
		map.put("start", start);

//		System.out.println("==> 파라미터? " + map);
		Map<String, Object> data = new HashMap<>();
		if (cnt == 0) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			List<Map<String, Object>> list = replyDao.searchReviews(map);
			data.put("list", list);
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		}
		data.put("count", cnt);
		data.put("page", page);
		data.put("option", 1);

//		System.out.println("==> 검색결과? " + data);
		return data;
	}
}
