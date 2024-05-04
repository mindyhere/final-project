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

//@CrossOrigin(origins = "http://localhost:3000/")
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
	public Map<String, Object> idCheck(@RequestParam(name = "userEmail", defaultValue = "") String userEmail) {
		System.out.println("===> userEmail: " + userEmail);
		// id 중복검사
		int checked = hostDao.idCheck(userEmail);
		System.out.println("===> checked: " + checked);
		Map<String, Object> data = new HashMap<>();
		if (userEmail.equals("undefined") || checked > 0) {
			data.put("msg", "error");
		} else {
			data.put("msg", "ok");
		}
		return data;
	}
//
//	@PostMapping("pwdCheck/{pwd}")
//	public String pwdCheck(@RequestParam(name = "userEmail", defaultValue = "") String userEmail,
//			@PathVariable(name = "pwd") String pwd) {
//		// TODO: process POST request
//		String savedPwd = hostDao.pwdCheck(userEmail);
//		if (pwdEncoder.matches(pwd, savedPwd)) {
//			return "ok";
//		} else {
//			return "error";
//		}
//	}

	@PostMapping("join")
	public Map<String, Object> join(@RequestParam Map<String, Object> map,
			@RequestParam(name = "profile", required = false) MultipartFile profile,
			@RequestParam(name = "file", required = false) MultipartFile file, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/profile/");
		String h_profile = "no-image.png";
		String h_file = "-";

		if (profile != null && !profile.isEmpty()) {
			try {
				profile.transferTo(new File(path + h_profile));
				h_profile = profile.getOriginalFilename();
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("=== 프로필없음 ===");
			}
		}
		map.put("h_profile", h_profile);
		if (file != null && !file.isEmpty()) {
			try {
				file.transferTo(new File(path + h_file));
				h_file = file.getOriginalFilename();
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("=== 사업자등록증없음 ===");
			}
		}
		map.put("h_file", h_file);

//		String h_description = (map.get("h_description") != null ? (String) map.get("h_description") : "-");
//		map.put("h_description", h_description);

		// 비밀번호 암호화
		String encodedPwd = pwdEncoder.encode((CharSequence) map.get("pwd"));
		map.replace("pwd", encodedPwd);
		System.out.println("===> map: " + map);
		hostDao.insert(map);
		Map<String, Object> data = new HashMap<>();
		data.put("msg", "success");
		return data;
	}

	@GetMapping("account/{userIdx}")
	public Map<String, Object> getAccount(@PathVariable(name = "userIdx") int h_idx) {
		System.out.println("***회원정보 " + h_idx);
		Map<String, Object> data = hostDao.getAccount(h_idx);
		System.out.println("===> 결과: " + data);
		return data;
	}

	@PostMapping("update/{userIdx}")
	public void updateInfo(@PathVariable(name = "userIdx") int h_idx, @RequestParam Map<String, Object> map,
			@RequestParam(name = "profile", required = false) MultipartFile profile,
			@RequestParam(name = "file", required = false) MultipartFile file, HttpServletRequest request) {
		System.out.println("==> update 컨트롤러: " + map);
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/profile/");
		String h_profile = "";
		String h_file = "";
		if (profile != null && !profile.isEmpty()) {
			try {
				String profile1 = hostDao.getfile(h_idx, "h_profile");
				if (profile1 != null) {
					File file1 = new File(path + profile1);
					if (file1.exists()) {
						file1.delete();
					}
				}
				h_profile = profile.getOriginalFilename();
				profile.transferTo(new File(path + h_profile));
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("=== 프로필 삭제/저장 에러 ===");
			}
		} else {
			h_profile = hostDao.getfile(h_idx, "h_profile");
		}
		map.put("h_profile", h_profile);

		if (file != null && !file.isEmpty()) {
			h_file = file.getOriginalFilename();
			try {
				file.transferTo(new File(path + h_file));
				map.put("h_file", h_file);
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("=== 사업자등록증 저장 에러 ===");
			}
		} else {
			h_file = hostDao.getfile(h_idx, "h_file");
		}
		map.put("h_file", h_file);

		// 비밀번호 암호화
		System.out.println("===> 암호화 전 pwd: " + map.get("pwd"));
		String encodedPwd = pwdEncoder.encode(map.get("pwd").toString());
		map.replace("pwd", encodedPwd);
		System.out.println("===> map: " + map);

		hostDao.updateInfo(map);
	}

	@GetMapping("delete/{pwd}")
	public String deleteAccount(@PathVariable(name = "pwd") String pwd,
			@RequestParam(name = "userIdx", defaultValue = "") int h_idx,
			@RequestParam(name = "userEmail", defaultValue = "") String h_email, HttpServletRequest request) {
		// String userEmail = (String) map.get("userEmail");
		String savedPwd = hostDao.pwdCheck(h_email);
		System.out.println("==> delete? " + pwd + ", ==> " + pwdEncoder.matches(pwd, savedPwd));
		if (pwdEncoder.matches(pwd, savedPwd)) {
			// int h_idx = (int) map.get("userIdx");
			String h_profile = hostDao.getfile(h_idx, "h_profile");
			String h_file = hostDao.getfile(h_idx, "h_file");

			if (h_profile != null && !h_profile.equals("no-image.png")) {
				ServletContext application = request.getSession().getServletContext();
				String path = application.getRealPath("static/images/host/profile/");
				File profile = new File(path + h_profile);
				if (profile.exists()) {
					profile.delete();
				}
			}

			if (h_file != null && !h_file.equals("-")) {
				ServletContext application = request.getSession().getServletContext();
				String path = application.getRealPath("static/images/host/profile/");
				File file = new File(path + h_file);
				if (file.exists()) {
					file.delete();
				}
			}

			// hostDao.deleteAccount(h_idx);
			return "complete";
		} else {
			return "fail";
		}

	}
}
