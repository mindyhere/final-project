package com.example.syFinal.host.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.syFinal.host.model.dao.HostDAO;

//@RequestMapping("host/")
//@CrossOrigin(origins="*")
@RestController
public class HostController {
	@Autowired
	HostDAO hostDao;

	@GetMapping("/")
	public ModelAndView home() {
		return new ModelAndView("index", "", "");
	}

	@PostMapping("host/join")
	public String postMethodName(@RequestBody String entity) {
		// TODO: process POST request

		return entity;
	}

}
