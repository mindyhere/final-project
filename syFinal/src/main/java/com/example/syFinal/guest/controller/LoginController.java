package com.example.syFinal.guest.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.syFinal.global.model.EmailDTO;
import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.guest.model.dao.LoginDAO;

@Controller
@RequestMapping("guest/login/*")
public class LoginController {
	@Autowired
	LoginDAO dao;

	@Autowired
	PasswordEncoder pwdEncoder;
	
	@Autowired
	EmailService emailService;
	
	@ResponseBody
	@PostMapping("login")
	public Map<String, Object> login(@RequestParam(name = "g_email", defaultValue = "") String g_email,
			@RequestParam(name = "g_passwd", defaultValue = "") String g_passwd) {
		String passwd = dao.chkPw(g_email);
		Map<String, Object> map1 = dao.login(g_email, passwd);
		Map<String, Object> map = new HashMap<>();
		// if (pwdEncoder.matches(passwd, g_passwd))
		if(passwd.equals(g_passwd)){ // 로그인 성공
			map.put("g_email", g_email);
			map.put("g_name", map1.get("g_name"));
			map.put("g_level", map1.get("g_level"));
			map.put("message", "success");
		} else if(passwd.equals("no")) {
			map.put("message", "no");
		} else {
			map.put("message", "error");
		}
		return map;
	}
	
	@ResponseBody
	@PostMapping("searchPw")
	public Map<String, Object> searchPw(@RequestParam(name = "g_email", defaultValue = "") String g_email, @RequestParam(name = "g_name", defaultValue = "") String g_name,
			@RequestParam(name = "g_phone", defaultValue = "") String g_phone) {
		int check = dao.searchPw(g_email, g_name, g_phone);
		Map<String, Object> map = new HashMap<>();
		String result = "";
		if (check == 0) {
			result = "no";
		} else if (check == 1) {
			String randomPw = getTempPassword();
			dao.randomPw(g_email, randomPw);
			EmailDTO emailPw = new EmailDTO();
			emailPw.setSubject("임시 비밀번호 안내");
			emailPw.setMessage("안녕하세요. 임시 비밀번호 안내 관련 이메일 입니다." + " 회원님의 임시 비밀번호는 " + randomPw + " 입니다."
					+ " 로그인 후에 비밀번호를 변경해 주세요");
			emailPw.setReceiveMail(g_email);
			emailPw.setSenderName("SY Library");
			emailPw.setSenderMail("SYLibrary@gmail.com");
			emailService.sendMail(emailPw);
			result = "success";
		} else {
			result = "error";
		}
		map.put("result", result);
		return map;
	}
	
	@ResponseBody
	@PostMapping("searchMail")
	public Map<String, Object> searchMail(@RequestParam(name = "g_name", defaultValue = "") String g_name,
			@RequestParam(name = "g_phone", defaultValue = "") String g_phone) {
		String email = dao.searchEmail(g_name, g_phone);
		Map<String, Object> map = new HashMap<>();
		if (email.equals("no")) {
			map.put("message", "no");
		} else {
			map.put("g_email", email);
			map.put("message", "success");
		}
		return map;
	}
	
	public String getTempPassword() {
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
				'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

		String str = "";
		int idx = 0;
		for (int i = 0; i < 10; i++) {
			idx = (int) (charSet.length * Math.random());
			str += charSet[idx];
		}
		return str;
	}
}
