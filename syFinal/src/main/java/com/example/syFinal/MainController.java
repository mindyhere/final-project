package com.example.syFinal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MainController {
	@RequestMapping("/")
	public ModelAndView Home() {
		System.out.println("***메인화면 이동");
		return new ModelAndView("index", "", "");
	}
}
