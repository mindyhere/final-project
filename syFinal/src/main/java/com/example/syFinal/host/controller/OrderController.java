package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.PageUtil;
import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.host.model.dao.HostDAO;
import com.example.syFinal.host.model.dao.OrderDAO;

@RestController
@RequestMapping("api/order/*")
public class OrderController {
	@Autowired
	OrderDAO orderDao;

	@Autowired
	HostDAO hostDAO;

	@GetMapping("manage/list/{userIdx}")
	public Map<String, Object> getOrderList(@PathVariable(name = "userIdx") int h_idx,
			@RequestParam(name = "hoIdx", defaultValue = "0") int ho_idx,
			@RequestParam(name = "init", defaultValue = "1") int init,
			@RequestParam(name = "pageNum", defaultValue = "1") int pageNum) {
		System.out.println("==> getOrderList? " + ho_idx + ", pageNum? " + pageNum + "," + init);
		Map<String, Object> data = new HashMap<>();

		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("ho_idx", ho_idx);
		map.put("init", init);
		List<Map<String, Object>> hotels = orderDao.getHotelList(h_idx);
		data.put("hotels", hotels);
		data.put("init", init);

		int cnt = orderDao.countRecord(map);
		PageUtil page = new PageUtil(cnt, pageNum);
		int start = page.getPageBegin();
		int end = page.getPageEnd();
		data.put("count", cnt);
		data.put("page", page);
		if (hotels == null) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			if (cnt == 0) {
				data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
			} else {
				System.out.println("==> start? " + start + ", end? " + end);
				map.put("start", start);
				map.put("end", end);
				List<Map<String, Object>> list = orderDao.getList(map);
				data.put("list", list);
				data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
				System.out.println("==> list? " + list);
			}
		}
		System.out.println("==> 리턴? " + data.get("list") + ", data? " + data);

		return data;
	}

	@GetMapping("manage/detail/get/{g_idx}")
	public Map<String, Object> getGuestInfo(@PathVariable(name = "g_idx") int g_idx) {
		Map<String, Object> data = new HashMap<>();
		GuestDTO guest = orderDao.getGuestInfo(g_idx);
//		System.out.println("==> g_url 확인? " + g_url);
		data.put("guest", guest);
		return data;
	}
}
