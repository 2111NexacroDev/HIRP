package com.highfive.hirp.schedule.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.schedule.service.ScheduleService;

@Controller
public class ScheduleController {
	@Autowired
	private ScheduleService sService;
	
	// 일정 조회
	public ModelAndView scheduleListView(ModelAndView mv) {
		return mv;
	}
	
	// 일정 검색
	public ModelAndView scheduleSearchList(ModelAndView mv) {
		return mv;
	}	
	
	// 일정 등록
	public ModelAndView scheduleRegister(ModelAndView mv) {
		return mv;
	}
	
	// 일정 삭제
	public ModelAndView scheduleDelete(ModelAndView mv) {
		return mv;
	}
	
	// 일정 수정 화면 로드
	public ModelAndView scheduleUpdateView(ModelAndView mv) {
		return mv;
	}	
	
	// 일정 수정
	public ModelAndView scheduleUpdate(ModelAndView mv) {
		return mv;
	}
}
