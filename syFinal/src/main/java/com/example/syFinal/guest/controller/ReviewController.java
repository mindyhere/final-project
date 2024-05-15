package com.example.syFinal.guest.controller;

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

import com.example.syFinal.global.model.ReputationDAO;
import com.example.syFinal.guest.model.dao.ReviewDAO;

@RestController
@RequestMapping("api/review/*")
public class ReviewController {
	@Autowired
	ReviewDAO reviewDao;

//	@Autowired
//	ReplyDAO replyDao;

	@Autowired
	ReputationDAO reputationDao;

	@Transactional
	@PostMapping("insert")
	public ResponseEntity<String> insert(@RequestParam Map<String, Object> map) {
		System.out.println("==> map? " + map + ", " + map.get("rv_writer"));
		try {
			reviewDao.insertReview(map);
			System.out.println("ok");
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			// 에러발생
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

//	@GetMapping("detail/{idx}")
//	public Map<String, Object> detail(@PathVariable(name = "idx") int rv_idx) {
//		Map<String, Object> data = new HashMap<>();
//		try {
//			ReviewDTO review = reputationDao.reviewDetail(rv_idx);
//			data.put("review", review);
//			Map<String, Object> map = new HashMap<>();
//			ReplyDTO reply = reputationDao.replyDetail(map);
//			if (reply != null) {
//				data.put("reply", reply);
//			}
//			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
//		} catch (Exception e) {
//			e.printStackTrace();
//			data.put("response", new ResponseEntity<>("false", HttpStatus.BAD_REQUEST));
//		}
//		System.out.println("===> 결과: " + data);
//		return data;
//	}

	@Transactional
	@PostMapping("edit")
	public ResponseEntity<String> editReview(@RequestParam Map<String, Object> map) {
		try {
			reviewDao.editReview(map);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			// 에러발생
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@Transactional
	@GetMapping("delete/{idx}")
	public ResponseEntity<String> updateDeleted(@PathVariable(name = "idx") int rv_idx) {
		System.out.println("==> delete" + rv_idx);
		try {
			reviewDao.updateDeleted(rv_idx);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			// 에러발생
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

}
