package com.cyrix.nossoespaco.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/")
public class HomeController {
	@GetMapping
	public ModelAndView nova() {
		ModelAndView mv = new ModelAndView("site/index");
		return mv;
	}
}
