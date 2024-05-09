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
import com.example.syFinal.guest.model.dto.ReviewDTO;

@RestController
@RequestMapping("api/review/*")
public class ReviewController {
	@Autowired
	ReviewDAO reviewDao;

//	@Autowired
//	ReplyDAO replyDao;

	@Autowired
	ReputationDAO reputationDao;

//	@GetMapping("list/{g_idx}")
//	public List<ReviewDTO> myReviewList(@PathVariable(name = "g_idx") int g_idx) {
//		return reviewDao.myReviewList(g_idx);
//	}

	@Transactional
	@PostMapping("insert")
	public ResponseEntity<String> insert(@RequestParam Map<String, Object> map) {
		System.out.println("==> map? " + map + ", " + map.get("rv_writer"));
		try {
			reviewDao.insertReview(map);
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
	@PostMapping("edit/{idx}")
	public ResponseEntity<String> editReview(@PathVariable(name = "idx") int rv_idx,
			@RequestParam(name = "dto") ReviewDTO dto) {
		try {
			reviewDao.editReview(dto);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			// 에러발생
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@Transactional
	@GetMapping("delete/{idx}")
	public ResponseEntity<String> insert(@PathVariable(name = "idx") int rv_idx) {
		try {
			reviewDao.delete(rv_idx);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			// 에러발생
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

}
