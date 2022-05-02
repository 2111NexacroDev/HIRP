package com.highfive.hirp.time.user.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;
import com.highfive.hirp.time.user.service.TimeService;

@Controller
public class TimeController {
	
	@Autowired
	private TimeService tService;
	
	// 출,퇴근 내역 화면(근태관리 메인)
	@RequestMapping(value="/time/list.hirp", method=RequestMethod.GET)
	public ModelAndView timeListView (ModelAndView mv) {
		mv.setViewName("time/timeList");
		return mv;
	}
	
	// 연차 내역 화면
	@RequestMapping(value="/time/vacation.hirp", method=RequestMethod.GET)
	public ModelAndView vacationListView (ModelAndView mv) {
		mv.setViewName("time/vacationList");
		return mv;
	}
		
	// 근태 조정 신청 화면
	@RequestMapping(value="/time/modify.hirp", method=RequestMethod.GET)
	public ModelAndView modifyListView (ModelAndView mv) {
		mv.setViewName("time/modifyList");
		return mv;
	}	
	
	// 사용자 출근 등록
	public ModelAndView timeStart (ModelAndView mv, @ModelAttribute Time time, HttpServletRequest request) {
		int result = tService.insertWorkStart(time);
		return mv;
	}

	// 사용자 퇴근 등록
	public ModelAndView timeEnd (ModelAndView mv, @ModelAttribute Time time, HttpServletRequest request) {
		int result = tService.insertWorkEnd(time);
		return mv;
	}

	// 사용자 연차 내역 조회
	public ModelAndView timeView (ModelAndView mv, @ModelAttribute Vacation vacation, HttpServletRequest request) {
		List<Time> tList = tService.selectTimeView(vacation);
		return mv;
	}

	// 사용자 근태 조정 신청
	public ModelAndView timeModify (ModelAndView mv, @ModelAttribute TimeModify timeModify, HttpServletRequest request) {
		int result = tService.updateTimeModify(timeModify);
		return mv;
	}
}

// 이미 있는 거를 덮어 씌우는 건 update
// 없었는데 새로 생기는건 insert

// 출퇴근등록 - 시간이 아예 디비에 없다가 등록하면 그 때 생기는 거라서 insert
// 근태조정신청 - 시간을 바꿔주는 거라 update
// 등록, 수정에는 Http추가