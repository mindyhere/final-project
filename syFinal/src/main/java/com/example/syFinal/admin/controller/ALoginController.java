package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.syFinal.admin.model.dao.AdminDAO;
import jakarta.servlet.http.HttpSession;

@RestController
public class ALoginController {

	@Autowired
	AdminDAO adminDao;

	@PostMapping("admin/adlogin")
	public Map<String, Object> adlogin(@RequestParam(name = "a_id") String a_id,
			@RequestParam(name = "a_passwd") String a_passwd, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		Map<String, Object> admin = adminDao.alogin(a_id, a_passwd);
		if (admin != null) {
			response.put("success", true);
			response.put("message", "로그인 성공");
			response.put("a_id", admin.get("a_id"));
			response.put("a_passwd", admin.get("a_passwd"));
		} else {
			response.put("success", false);
			response.put("message", "로그인 실패");
		}
		return response;
	}
}
