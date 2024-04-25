package com.example.syFinal.guest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.syFinal.guest.model.dao.LoginDAO;

@Controller
@RequestMapping("guest/login/*")
public class LoginController {
	@Autowired
	LoginDAO loginDao;

	@Autowired
	PasswordEncoder pwdEncoder;
}
