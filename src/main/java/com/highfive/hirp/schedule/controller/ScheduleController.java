package com.highfive.hirp.schedule.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.schedule.domain.Schedule;
import com.highfive.hirp.schedule.service.ScheduleService;

@Controller
public class ScheduleController {
	@Autowired
	private ScheduleService sService;
	
	// 전체 일정 조회
	@RequestMapping(value="/schedule/list.hirp", method=RequestMethod.GET)
	public ModelAndView scheduleListView(ModelAndView mv, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String loginUser = (String) session.getAttribute("emplId");
			// 전사일정 조회
			List<Schedule> sListCompany = sService.printAllCompanySchedule();
			// 개인일정 조회
			List<Schedule> sListPersonal = sService.printAllPersonalSchedule(loginUser);
			// 부서일정 조회
			List<Schedule> sListTeam = sService.printAllTeamSchedule(loginUser);
			if(!sListCompany.isEmpty()) {
				mv.addObject("sListCompany", sListCompany);
			}
			if(!sListPersonal.isEmpty()) {
				mv.addObject("sListPersonal", sListPersonal);
			}
			if(!sListTeam.isEmpty()) {
				mv.addObject("sListTeam", sListTeam);
			}
			mv.setViewName("schedule/scheduleList");
		} catch(Exception e) {
			e.printStackTrace();
			mv.setViewName("schedule/scheduleList");
		}
		return mv;
	}
	
	// 일정 등록
	@RequestMapping(value="/schedule/write.hirp", method=RequestMethod.POST)
	public ModelAndView scheduleRegister(ModelAndView mv
			,@ModelAttribute Schedule schedule
			,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String loginUser = (String) session.getAttribute("emplId");
			schedule.setEmplId(loginUser);
			String category = schedule.getScheduleCategory();
			if(category.equals("전사")) { // 카테고리 전사일 경우
				int result = sService.registerCompanySchedule(schedule);
				if(result > 0) {
					mv.setViewName("redirect:/schedule/list.hirp");
				} else {
					mv.setViewName("common/errorPage");
				}
			} else if(category.equals("부서")) {
				int result = sService.registerSchedule(schedule);
				int result2 = sService.registerScheduleToSub(schedule);
				if(result > 0 && result2 > 0) { // 카테고리 부서일 경우
					mv.setViewName("redirect:/schedule/list.hirp");
				} else {
					mv.setViewName("common/errorPage");
				}
			} else { // 카테고리 개인일 경우
				int result = sService.registerSchedule(schedule);
				if(result > 0) {
					mv.setViewName("redirect:/schedule/list.hirp");
				} else {	
					mv.setViewName("common/errorPage");
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 일정 수정
	@RequestMapping(value="/schedule/modify.hirp", method=RequestMethod.POST)
	public ModelAndView scheduleUpdate(ModelAndView mv
			,@ModelAttribute Schedule schedule
			,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String loginUser = (String) session.getAttribute("emplId");
			schedule.setEmplId(loginUser);
			String category = schedule.getScheduleCategory();
			// 카테고리 전사일 경우
			if(category.equals("전사")) {
				int result = sService.modifyCompanySchedule(schedule);
				if(result > 0) {
					// 전사 일정 수정 성공
					mv.setViewName("redirect:/schedule/list.hirp");
				} else {
					// 전사 일정 수정 실패
					mv.setViewName("common/errorPage");
				}
			} else {// 그 외
				int result = sService.modifySchedule(schedule);
				if(result > 0) {
					// 그 외 일정 수정 성공
					mv.setViewName("redirect:/schedule/list.hirp");
				} else {
					// 그 외 일정 수정 실패
					mv.setViewName("common/errorPage");
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 개인/부서 일정 삭제
	@RequestMapping(value="/schedule/delete.hirp", method=RequestMethod.GET)
	public ModelAndView scheduleDelete(ModelAndView mv
			,@RequestParam("scheduleNo") int scheduleNo) {
		try {
			int result = sService.removeSchedule(scheduleNo);
			if(result > 0) {
				mv.setViewName("redirect:/schedule/list.hirp");
			} else {
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 전사 일정 삭제
	@RequestMapping(value="/schedule/deleteCompanySchedule.hirp", method=RequestMethod.GET)
	public ModelAndView deleteCompanySchedule(ModelAndView mv
			,@RequestParam("scheduleNo") int scheduleNo) {
		try {
			int result = sService.removeCompanySchedule(scheduleNo);
			if(result > 0) {
				mv.setViewName("redirect:/schedule/list.hirp");
			} else {
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
}
