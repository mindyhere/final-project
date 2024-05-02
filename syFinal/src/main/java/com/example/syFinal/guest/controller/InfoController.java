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
import com.example.syFinal.guest.model.dao.InfoDAO;
import com.example.syFinal.guest.model.dto.GuestDTO;

@Controller
@RequestMapping("guest/info/*")
public class InfoController {
	@Autowired
	InfoDAO dao;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	PasswordEncoder pwdEncoder;
	
	@ResponseBody
	@PostMapping("checkEmail")
	public Map<String, Object> checkEmail(@RequestParam(name = "g_email", defaultValue = "") String g_email) {
		int count = dao.checkId(g_email);
		String result = "";
		String randomCode = "";
		if (count == 1) {
			result = "fail";
		} else if (count == 0) {
			randomCode = emailService.getTempPassword();
			System.out.println(randomCode);
			EmailDTO emailPw = new EmailDTO();
			emailPw.setSubject("인증 코드 안내");
			emailPw.setMessage(
					"안녕하세요. 회원님의 인증 코드는 " + randomCode + " 입니다.");
			emailPw.setReceiveMail(g_email);
			emailPw.setSenderName("Notice");
			emailPw.setSenderMail("notice@gmail.com");
			result = emailService.sendMail(emailPw); 
			if (result.equals("fail")) {
				result = "error";
			}
		} 
		Map<String, Object> map = new HashMap<>();
		map.put("info_code", randomCode);
		map.put("result", result);
		return map;
	}
	
	@ResponseBody
	@PostMapping("join")
	public Map<String, Object> join(@RequestParam(name = "g_email", defaultValue = "") String g_email,
			@RequestParam(name = "g_passwd", defaultValue = "") String passwd, @RequestParam(name = "g_name", defaultValue = "") String g_name,
			@RequestParam(name = "g_phone", defaultValue = "") String g_phone) {
		String g_passwd = pwdEncoder.encode(passwd);
		String result = dao.join(g_email, g_passwd, g_name, g_phone);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
	
	@ResponseBody
	@PostMapping("detail")
	public Map<String, Object> detail(@RequestParam(name = "g_email", defaultValue = "") String g_email) {
		GuestDTO dto = dao.detail(g_email);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		System.out.println(map);
		return map;
	}
}
