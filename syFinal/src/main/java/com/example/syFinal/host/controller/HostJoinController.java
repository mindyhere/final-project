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
import org.springframework.web.multipart.MultipartFile;

import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.host.model.dao.HostDAO;
import com.example.syFinal.host.model.dto.HostDTO;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Part;

@RestController
@RequestMapping("api/host/*")
public class HostJoinController {
	@Autowired
	HostDAO hostDao;

	@Autowired
	PasswordEncoder pwdEncoder;

	@Autowired
	EmailService emailService;

	@PostMapping("idCheck/{userId}")
	public Map<String, Object> idCheck(@PathVariable(name = "userId") String userId) {
		// id 중복검사
		int checked = hostDao.idCheck(userId);
		Map<String, Object> result = new HashMap<>();
		if (checked > 0) {
			result.put("msg", "error");
		} else {
			result.put("msg", "ok");
		}
		return result;
	}

	@PostMapping("join")
	public Map<String, Object> join(@RequestParam Map<String, Object> map,
			@RequestParam(name = "profile") MultipartFile profile, @RequestParam(name = "file") MultipartFile file,
			HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String profile_path = application.getRealPath("resources/images/host/profile");
		String file_path = application.getRealPath("resources/images/host/profile");
		String h_profile = profile != null ? profile.getOriginalFilename() : null;
		String h_file = file != null ? file.getOriginalFilename() : null;

		try {
			for (Part part1 : request.getParts()) {
				h_profile = part1.getSubmittedFileName();
				if (h_profile != null && !h_profile.trim().equals("")) {
					part1.write(profile_path + h_profile);
					break;
				}
			}
			for (Part part2 : request.getParts()) {
				h_file = part2.getSubmittedFileName();
				if (h_file != null && !h_file.trim().equals("")) {
					part2.write(file_path + h_file);
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		HostDTO dto = new HostDTO();
		dto.setH_email((String) map.get("userId"));
		String encodedPwd = pwdEncoder.encode((CharSequence) map.get("pwd"));
		dto.setH_passwd((String) map.get("encodedPwd"));
		dto.setH_name((String) map.get("name"));
		dto.setH_phone((String) map.get("phone"));
		dto.setH_business((String) map.get("business"));
		dto.setH_profile((String) map.get(h_profile));
		dto.setH_file((String) map.get(h_file));

		hostDao.insert(dto);
		Map<String, Object> result = new HashMap<>();
		result.put("msg", "success");
		result.put("userid", map.get("userid"));
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
