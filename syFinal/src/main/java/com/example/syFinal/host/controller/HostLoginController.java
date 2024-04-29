package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.EmailDTO;
import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.host.model.dao.HostDAO;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("api/host/*")
public class HostLoginController {
	@Autowired
	HostDAO hostDao;

	@Autowired
	PasswordEncoder pwdEncoder;

	@Autowired
	EmailService emailService;

	@PostMapping("join")
	public Map<String, Object> join(@RequestParam Map<String, Object> map, HttpServletRequest request) {
		// 중복검사
		int checked = hostDao.idCheck((String) map.get("userId"));
		Map<String, Object> result = new HashMap<>();
		if (checked > 0) {
			result.put("msg", "error");
		} else {
			String encodedPwd = pwdEncoder.encode((CharSequence) map.get("pwd"));
			map.replace("pwd", encodedPwd);
			hostDao.insert(map);
			result.put("msg", "success");
			result.put("userid", map.get("userid"));
		}
		return result;
	}

	@PostMapping("login")
	public Map<String, Object> login(@RequestParam Map<String, Object> map) {
		String userId = (String) map.get("userId");
		String pwd = (String) map.get("pwd");
		String encodedPwd = hostDao.getUserPasswd(pwd);
		Map<String, Object> result = new HashMap<>();
		if (pwd.equals(encodedPwd)) {
			result.put("dto", hostDao.getAccount(userId));
			result.put("msg", "success");
		} else {
			result.put("msg", "error");
		}
		return result;
	}

	@PostMapping("login/findId")
	public String findId(@RequestParam Map<String, Object> map) {
		String h_email = hostDao.findId(map);
		return hostDao.findId(map);
	}

	@PostMapping("login/findPwd")
	public String findPwd(@RequestParam Map<String, Object> map) {
		int cheked = hostDao.findPwd(map);
		String result = "";
		if (cheked > 0) {
			String email = (String) map.get("userId");
			String randomPw = emailService.getTempPassword();
			map.replace("pwd", randomPw);
			hostDao.setTempPwd(map); // 임시 비밀번호로 업데이트
			EmailDTO emailPw = emailService.prepareTempPwdEmail(email, randomPw);
			result = emailService.sendMail(emailPw);
		} else {
			result = "입력하신 정보와 일치하는 계정이 없습니다.";
		}
		return result;
	}

	@PostMapping("update/{h_idx}")
	public Map<String, Object> updateInfo(@PathVariable(name = "h_idx") int h_idx, Map<String, Object> params) {
		hostDao.updateInfo(params);
		Map<String, Object> result = new HashMap<>();
		result.put("params", "params");
		result.put("msg", "success");
		return result;
	}

	@GetMapping("delete/{h_idx}")
	public String deleteAccount(@PathVariable(name = "h_idx") int h_idx) {
		hostDao.deleteAccount(h_idx);
		return "success";
	}

}
