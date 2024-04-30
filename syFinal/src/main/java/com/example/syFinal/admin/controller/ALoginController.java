package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.syFinal.admin.model.dao.AdminDAO;
import jakarta.servlet.http.HttpSession;

@RestController
public class ALoginController {

	@Autowired
	AdminDAO adminDao;

	@ResponseBody
	@PostMapping("admin/adlogin")
	public Map<String, Object> adlogin(@RequestParam(name = "a_id") String a_id,
			@RequestParam(name = "a_passwd") String a_passwd, HttpSession session) {
		Map<String, Object> map = new HashMap<>();
		map.put("a_id", a_id);
		map.put("a_passwd", a_passwd);
		String a_name = adminDao.alogin(map);
		if (a_name != null) {
			session.setAttribute("a_id", a_id);
			session.setAttribute("a_passwd", a_passwd);
			map.put("message", "success");
		} else {
			map.put("msg", "error");
		}
		return map;
	}
}
