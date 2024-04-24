package com.example.syFinal.host.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.host.model.dao.LoginDAO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("host/login/")
public class LoginController {
	@Autowired
	LoginDAO loginDao;

	@PostMapping("/")
	public String postMethodName(@RequestBody String entity) {
		// TODO: process POST request

		return entity;
	}

}
