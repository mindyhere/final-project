package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.EmailDTO;
import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.host.model.dao.HostDAO;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("api/host/login/*")
public class HostLoginController {
	@Autowired
	HostDAO hostDao;

	@Autowired
	PasswordEncoder pwdEncoder;

	@Autowired
	EmailService emailService;

	@PostMapping("/")
	public Map<String, Object> login(@RequestParam Map<String, Object> map) {
//		System.out.println("111 " + map);
		String userId = (String) map.get("userId");
		String pwd = (String) map.get("pwd");
		String savedPwd = hostDao.pwdCheck(userId);
//		System.out.println("222 pwd: " + pwd + " / savedPwd: " + savedPwd);
		Map<String, Object> data = new HashMap<>();
//		System.out.println(pwd.equals(savedPwd));
		if (pwd.equals(savedPwd)) {
			data.put("dto", hostDao.getAccount(userId));
			data.put("msg", "success");
		} else {
			data.put("msg", "error");
		}
		// System.out.println("로그인 결과= " + result);
		return data;
	}

	@PostMapping("findId")
	public Map<String, Object> findId(@RequestParam Map<String, Object> map) {
		Map<String, Object> data = new HashMap<>();
		data.put("h_email", hostDao.findId(map));
		return data;
	}

	@PostMapping("findPwd")
	public Map<String, Object> findPwd(@RequestParam Map<String, Object> map) {
		System.out.println("***" + map);
		int cheked = hostDao.findPwd(map);
		Map<String, Object> data = new HashMap<>();
		if (cheked > 0) { // 입력한 정보와 일치하는 계정이 있을 경우,
			String email = (String) map.get("userId");
			String randomPw = emailService.getTempPassword();
			map.put("pwd", randomPw);
			hostDao.setTempPwd(map); // 임시 비밀번호로 업데이트
			EmailDTO emailPw = emailService.prepareTempPwdEmail(email, randomPw);
			String msg = emailService.sendMail(emailPw);
			if (msg.equals("success")) {
				System.out.println("성공? " + msg);
				data.put("msg", msg);
			} else {
				System.out.println("실패? " + msg);
				data.put("msg", msg);
			}
		} else {
			data.put("msg", "입력하신 정보와 일치하는 계정이 없습니다.");
		}
		return data;
	}

	@GetMapping("logout")
	public void logout(HttpSession session) {
		session.invalidate();
	}

}
