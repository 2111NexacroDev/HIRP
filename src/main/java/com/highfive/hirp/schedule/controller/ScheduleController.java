package com.highfive.hirp.schedule.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.alarm.domain.Alarm;
import com.highfive.hirp.alarm.service.AlarmService;
import com.highfive.hirp.common.Search;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.schedule.domain.Schedule;
import com.highfive.hirp.schedule.service.ScheduleService;

@Controller
public class ScheduleController {
	@Autowired
	private ScheduleService sService;
	@Autowired
	private AlarmService aService;
	@Autowired
	private EmployeeAdminService eaService;
	
	// 전체 일정 조회
	@RequestMapping(value="/schedule/list.hirp", method=RequestMethod.GET)
	public ModelAndView scheduleListView(ModelAndView mv, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Schedule schedule = new Schedule();
			String loginUser = (String) session.getAttribute("emplId");			
			String deptCode = (String) session.getAttribute("deptCode");
			schedule.setDeptCode(deptCode);
			schedule.setEmplId(loginUser);
			
			// 전사일정 조회
			List<Schedule> sListCompany = sService.printAllCompanySchedule();
			// 개인일정 조회
			List<Schedule> sListPersonal = sService.printAllPersonalSchedule(loginUser);
			// 부서일정 조회
			List<Schedule> sListTeam = sService.printAllTeamSchedule(schedule);
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
			String deptCode = (String) session.getAttribute("deptCode");
			schedule.setEmplId(loginUser);
			String category = schedule.getScheduleCategory();
			System.out.println(schedule.getScheduleStartDate()); //2022-06-06T06:09
			//schedule.getScheduleStartDate().substring(8, 10) : 시작 날짜 중 day
			
			//시작 날짜
			//2022-06-06 06:09:00
			String scStartDate = schedule.getScheduleStartDate().substring(0, 10)+" "+schedule.getScheduleStartDate().substring(11, 16)+":00"; 
			//오늘 날짜, oracle date형태로 넣으려면 이러케 넣어야 함.
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); //입력한 string과 형태가 같아야 함.
			Date date = formatter.parse(scStartDate);
			
			//시작 날짜 하루 전 날짜 구하기
			Calendar cal = new GregorianCalendar(Locale.KOREA);
			// 선언된 Calendar 클래스에 기준 날짜 설정
			cal.setTime(date);
			// 하루전으로 날짜 설정
			cal.add(Calendar.DATE, -1);
			// 하루전으로 설정된 날짜를 설정된 format으로 String 타입 변경
			String alarmDate = formatter.format(cal.getTime()); //시작 날짜 하루 전, ex : 2022-06-05 06:28
			System.out.println(alarmDate);
			
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
					//알림 설정된 경우
					if(schedule.getScheduleAlarm().equals("Y")) {
						List<Employee> deptEmplList = eaService.printEmployeeWithDeptCode(deptCode);
						if(!deptEmplList.isEmpty()) {
							for(int i = 0 ; i < deptEmplList.size(); i++) {
								Alarm alarm = new Alarm(deptEmplList.get(i).getEmplId(), alarmDate, "[부서일정] '"+schedule.getScheduleTitle()+"' 일정 하루 전입니다.",
										"21", "N", loginUser);
								int result3 = aService.insertAlarm(alarm);
								if(result3 > 0) {
									System.out.println("[부서일정] "+schedule.getScheduleTitle()+"의 알림이 추가되었습니다.");
								}
							}
						}
					}
					mv.setViewName("redirect:/schedule/list.hirp");
				} else {
					mv.setViewName("common/errorPage");
				}
			} else { // 카테고리 개인일 경우
				int result = sService.registerSchedule(schedule);
				if(result > 0) {
					//알림 설정된 경우
					if(schedule.getScheduleAlarm().equals("Y")) {
						Alarm alarm = new Alarm(loginUser, alarmDate, "[개인일정] '"+schedule.getScheduleTitle()+"' 일정 하루 전입니다.",
								"22", "N", loginUser);
						int result2 = aService.insertAlarm(alarm);
						if(result2 > 0) {
							System.out.println("[개인일정] "+schedule.getScheduleTitle()+"의 알림이 추가되었습니다.");
						}
					}
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
