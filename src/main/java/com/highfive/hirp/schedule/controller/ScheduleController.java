package com.highfive.hirp.schedule.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.schedule.domain.Schedule;
import com.highfive.hirp.schedule.service.ScheduleService;

@Controller
public class ScheduleController {
	@Autowired
	private ScheduleService sService;
	
	// 일정 조회
	@DateTimeFormat(iso=ISO.DATE)
	@RequestMapping(value="/schedule/list.hirp", method=RequestMethod.GET, produces="application/json;charset=utf-8")
	public ModelAndView scheduleListView(ModelAndView mv) {
		mv.setViewName("schedule/scheduleList");
//		try {
//			List<Schedule> sList = sService.printAllSchedule();
//			if(!sList.isEmpty()) {
//				mv.addObject("sList", sList);
//				mv.setViewName("schedule/scheduleList");			
//			} else {
//				mv.setViewName("common/errorPage");
//			}
//		} catch(Exception e) {
//			e.printStackTrace();
//			mv.setViewName("schedule/scheduleList");
//		}
		return mv;
	}
	
	// 일정 검색(자바스크립트로 대체 고려중)
	public ModelAndView scheduleSearchList(ModelAndView mv
			,@ModelAttribute Search search) {
		List<Schedule> searchList = sService.printSearchSchedule(search);
		return mv;
	}	
	
	// 일정 등록
	@ResponseBody
	@RequestMapping(value="/schedule/write.hirp", method=RequestMethod.POST)
	public ModelAndView scheduleRegister(ModelAndView mv
			,@ModelAttribute Schedule schedule
			,HttpServletRequest request) {
		try {
			schedule.setEmplId("tempId");
			int result = sService.registerSchedule(schedule);
			if(result > 0) {
				mv.setViewName("schedule/scheduleList");
			} else {
				mv.setViewName("common/errorPage");
			}			
		} catch(Exception e) {
			e.printStackTrace();
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 일정 수정 화면 로드(이거 나눠야되는지 같이해야되는지 체크)
	public ModelAndView scheduleUpdateView(ModelAndView mv) {
		return mv;
	}	
	
	// 일정 수정
	public ModelAndView scheduleUpdate(ModelAndView mv
			,@ModelAttribute Schedule schedule) {
		int result = sService.modifySchedule(schedule);
		return mv;
	}
	
	// 일정 삭제
	public ModelAndView scheduleDelete(ModelAndView mv
			,@RequestParam("scheduleNo") int scheduleNo) {
		int result = sService.removeSchedule(scheduleNo);
		return mv;
	}
}
