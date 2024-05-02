package com.example.syFinal.host.controller;

import java.io.File;
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
import org.springframework.web.multipart.MultipartFile;

import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.host.model.dao.HostDAO;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("api/host/*")
public class HostAccountController {
	@Autowired
	HostDAO hostDao;

	@Autowired
	PasswordEncoder pwdEncoder;

	@Autowired
	EmailService emailService;

	@PostMapping("idCheck")
	public Map<String, Object> idCheck(@RequestParam(name = "userId", defaultValue = "") String userId) {
		System.out.println("===> userid: " + userId);
		// id 중복검사
		int checked = hostDao.idCheck(userId);
		System.out.println("===> checked: " + checked);
		Map<String, Object> data = new HashMap<>();
		if (userId.equals("undefined") || checked > 0) {
			data.put("msg", "error");
		} else {
			data.put("msg", "ok");
		}
		return data;
	}

	@PostMapping("pwdCheck")
	public String pwdCheck(@RequestParam(name = "userId", defaultValue = "") String userId,
			@RequestParam(name = "pwd", defaultValue = "") String pwd) {
		// TODO: process POST request
		String savedPwd = hostDao.pwdCheck(userId);
		if (pwdEncoder.matches(pwd, savedPwd)) {
			return "ok";
		} else {
			return "error";
		}
	}

	@PostMapping("join")
	public Map<String, Object> join(@RequestParam Map<String, Object> map,
			@RequestParam(name = "profile", required = false) MultipartFile profile,
			@RequestParam(name = "file", required = false) MultipartFile file, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/profile/");
		String h_profile = "no-image.png";
		String h_file = "-";

		if (profile != null && !profile.isEmpty()) {
			h_profile = profile.getOriginalFilename();
			try {
				profile.transferTo(new File(path + h_profile));
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("=== 프로필없음 ===");
			}
		}
		map.put("h_profile", h_profile);
		if (file != null && !file.isEmpty()) {
			try {
				file.transferTo(new File(path + h_file));
				map.put("h_file", h_file);
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("=== 사업자등록증없음 ===");
			}
		}
		h_file = file.getOriginalFilename();

		String h_description = (map.get("h_description") != null ? (String) map.get("h_description") : "-");
		map.put("h_description", h_description);

		// 비밀번호 암호화
		String encodedPwd = pwdEncoder.encode((CharSequence) map.get("pwd"));
		map.replace("pwd", encodedPwd);
		System.out.println("===> map: " + map);
		hostDao.insert(map);
		Map<String, Object> data = new HashMap<>();
		data.put("msg", "success");
		return data;
	}

	@GetMapping("account/{hIdx}")
	public Map<String, Object> getAccount(@PathVariable(name = "hIdx") int h_idx) {
		Map<String, Object> data = hostDao.getAccount(h_idx);
		System.out.println("===> 결과: " + data);
		return data;
	}

	@PostMapping("update/{userNo}")
	public Map<String, Object> updateInfo(@PathVariable(name = "userNo") int h_idx, Map<String, Object> params,
			@RequestParam(name = "profile", required = false) MultipartFile profile,
			@RequestParam(name = "file", required = false) MultipartFile file, HttpServletRequest request) {

		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/profile/");
//		
		if (profile != null && !profile.isEmpty()) {
			String h_profile = profile.getOriginalFilename();
			try {
				profile.transferTo(new File(path + h_profile));
				params.put("h_profile", h_profile);
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("=== 프로필없음 ===");
			}
		}
		if (file != null && !file.isEmpty()) {
			String h_file = file.getOriginalFilename();
			try {
				file.transferTo(new File(path + h_file));
				params.put("h_file", h_file);
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("=== 사업자등록증없음 ===");
			}
		}

		hostDao.updateInfo(params);
		Map<String, Object> data = new HashMap<>();
		data.put("params", "params");
		data.put("msg", "success");
		return data;
	}

	@GetMapping("delete/{hIdx}")
	public String deleteAccount(@PathVariable(name = "hIdx") int h_idx, HttpServletRequest request) {
		String profileName = hostDao.getfile(h_idx, "profile");
		String fileName = hostDao.getfile(h_idx, "file");

		if (profileName != null && !profileName.equals("no-image.png")) {
			ServletContext application = request.getSession().getServletContext();
			String path = application.getRealPath("static/images/host/profile/");
			File h_profile = new File(path + profileName);
			if (h_profile.exists()) {
				h_profile.delete();
			}
		}
		if (fileName != null && !fileName.equals("-")) {
			ServletContext application = request.getSession().getServletContext();
			String path = application.getRealPath("static/images/host/profile/");
			File h_file = new File(path + fileName);
			if (h_file.exists()) {
				h_file.delete();
			}
		}
		hostDao.deleteAccount(h_idx);
		return "success";
	}
}
