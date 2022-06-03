package com.highfive.hirp;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.schedule.domain.Schedule;
import com.highfive.hirp.schedule.service.ScheduleService;
import com.highfive.hirp.todo.domain.Todo;
import com.highfive.hirp.todo.service.TodoService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	@Autowired
	private EmployeeAdminService eaService;
	
	@Autowired
	private TodoService tService;
	
	@Autowired
	private ScheduleService sService;

	// 홈으로 이동하는 화면
	@RequestMapping(value = "/home.hirp", method = RequestMethod.GET)
	public ModelAndView homeView(ModelAndView mv, @ModelAttribute Todo todo, HttpServletRequest request) {
		try {
			// 세션 세팅
			HttpSession session = request.getSession();
			String emplId  = (String) session.getAttribute("emplId");
			
			// 전사일정 조회
			List<Schedule> sListCompany = sService.printAllCompanySchedule();
			
			if(!sListCompany.isEmpty()) {
				mv.addObject("sListCompany", sListCompany);
			}
			
			// 생일자 조회
			List<Employee> birthdayList = eaService.printBirthdayList();
			mv.addObject("birthdayList", birthdayList);
			
			// 오늘 날짜 세팅
			Date now = Date.valueOf(LocalDate.now());
			todo.setTodoDate(now);
			
			// 오늘 날짜의 할 일 조회
			todo.setEmplId(emplId);
			List<Todo> todayList = tService.printToDoByDate(todo);
			
			// 오늘 날짜로 할 일 있을 때만 세팅
			if(!todayList.isEmpty()) {
				mv.addObject("todayList", todayList);				
			}
			
			mv.setViewName("home");
		} catch(Exception e) {
			mv.addObject("msg", "조회 오류");
			mv.setViewName("common/errorPage");		
		}
		return mv;
	}
	
	// 프론트 가이드페이지
	@RequestMapping(value="/guide.hirp", method=RequestMethod.GET)
	public ModelAndView guideView(ModelAndView mv) {
		mv.setViewName("guide");
		return mv;
	}
	
	// 넥사크로 관리자 페이지
	@RequestMapping(value = "/admin.hirp", method = RequestMethod.GET)
	public String adminView(Model model, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		if(emplId.equals("admin")) {
			return "redirect:/nexaui/index.html";
		} else {
			// 아직 관리자 아닐 시 수행할 동작 추가 안함
			return "common/errorPage";
		}
	}
}