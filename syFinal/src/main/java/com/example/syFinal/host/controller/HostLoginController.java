package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.EmailDTO;
import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.host.model.dao.HostDAO;

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
		Map<String, Object> result = new HashMap<>();
//		System.out.println(pwd.equals(savedPwd));
		if (pwd.equals(savedPwd)) {
			result.put("dto", hostDao.getAccount(userId));
			result.put("msg", "success");
		} else {
			result.put("msg", "error");
		}
		// System.out.println("로그인 결과= " + result);
		return result;
	}

	@PostMapping("findId")
	public Map<String, Object> findId(@RequestParam Map<String, Object> map) {
		Map<String, Object> result = new HashMap<>();
		result.put("h_email", hostDao.findId(map));
		return result;
	}

	@PostMapping("findPwd")
	public Map<String, Object> findPwd(@RequestParam Map<String, Object> map) {
		System.out.println("***" + map);
		int cheked = hostDao.findPwd(map);
		Map<String, Object> resultMap = new HashMap<>();
		if (cheked > 0) { // 입력한 정보와 일치하는 계정이 있을 경우,
			String email = (String) map.get("userId");
			String randomPw = emailService.getTempPassword();
			map.put("pwd", randomPw);
			hostDao.setTempPwd(map); // 임시 비밀번호로 업데이트
			EmailDTO emailPw = emailService.prepareTempPwdEmail(email, randomPw);
			String msg = emailService.sendMail(emailPw);
			if (msg.equals("success")) {
				System.out.println("성공? " + msg);
				resultMap.put("msg", msg);
			} else {
				System.out.println("실패? " + msg);
				resultMap.put("msg", msg);
			}
		} else {
			resultMap.put("msg", "입력하신 정보와 일치하는 계정이 없습니다.");
		}
		return resultMap;
	}

}
