package com.highfive.hirp.favority.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.favority.domain.Favority;
import com.highfive.hirp.favority.service.FavorityService;

@Controller
public class FavorityController {

	@Autowired
	private FavorityService fService;
	
	// 즐겨찾기 전체 조회
	public ModelAndView favorityListView(ModelAndView mv) {
		return mv;
	}
	
	// 즐겨찾기 추가
	public ModelAndView insertFavority(ModelAndView mv
			, @ModelAttribute Favority favority) {
		return mv;
	}
	
	// 즐겨찾기 삭제
	public ModelAndView deleteFavority(ModelAndView mv
			, @RequestParam("favorityNo") int favorityNo) {
		return mv;
	}
	
}
