package com.highfive.hirp.favority.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.favority.domain.Favority;
import com.highfive.hirp.favority.service.FavorityService;

@Controller
public class FavorityController {

	@Autowired
	private FavorityService fService;
	
	// 즐겨찾기 추가
	public ModelAndView insertFavority(ModelAndView mv
			, @ModelAttribute Favority favority) {
		return mv;
	}
	
	// 즐겨찾기 삭제
	public ModelAndView deleteFavority(ModelAndView mv
			, @ModelAttribute Favority favority) {
		return mv;
	}
	
}
