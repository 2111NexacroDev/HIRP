package com.highfive.hirp.employee.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeService;

@Controller
public class EmployeeController {

	@Autowired
	private EmployeeService eService;

	// 회원가입
	@RequestMapping(value = "/employee/register.kh", method = RequestMethod.POST)
	public String memberRegister(Model model, @ModelAttribute Employee employee) {
		try {
			int result = eService.registerEmployee(employee);
			if (result > 0) {
				return "redirect:/home.kh";
			} else {
				model.addAttribute("msg", "회원가입 실패");
				return "common/errorPage";
			}
		} catch (Exception e) {
			model.addAttribute("msg", e.toString());
			return "common/errorPage";
		}
	}

	// 로그인
	@RequestMapping(value = "/employee/login.kh", method = RequestMethod.POST)
	public String employeeLogin(HttpServletRequest request, @RequestParam("emplId") String emplId,
			@RequestParam("emplPw") String emplPw) {
		Employee employee = new Employee();
		employee.setEmplId(emplId);
		employee.setEmplPw(emplPw);
		try {
			Employee loginUser = eService.loginMember(employee);
			if (loginUser != null) {
				// 세션에 담기
				HttpSession session = request.getSession();
				session.setAttribute("employeeId", loginUser.getEmplId());
				session.setAttribute("employeeName", loginUser.getEmplName());
				return "redirect:/home.kh";
			} else {
				request.setAttribute("msg", "회원 조회 실패");
				return "common/errorPage";
			}
		} catch (Exception e) {
			request.setAttribute("msg", e.toString());
			return "common/errorPage";
		}
	}

	// 마이페이지 출력
	@RequestMapping(value="/employee/mypage.kh", method=RequestMethod.GET)
	public ModelAndView employeeMypage(ModelAndView mv, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String employeeId = (String) session.getAttribute("employeeId");
		try {
			Employee employee = eService.employeeMyPage(employeeId);
			if(employee != null) {
				// employee에 값이 들어있다. 값은 마이페이지에 출력할 값.
				mv.addObject("employee", employee);
				mv.setViewName("employee/mypage");
			}
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 비밀번호 찾기
	@RequestMapping(value= "/find_mem_pwd.kh", method=RequestMethod.POST)
	public String find_pwd(HttpServletResponse response, @RequestParam("memberId")String memberId, @RequestParam("memberPhone")String memberPhone, Model model) throws Exception {
		Member member= new Member();
		member.setMemberId(memberId);
		member.setMemberPhone(memberPhone);
		try {
			List<Member>resultList = mService.find_pwd(response, member);
			if(!resultList.isEmpty()) {
				String mem = resultList.get(0).getMemberPw().toString(); 
				model.addAttribute("pwd", mem);
				return "member/find_mem_pwd";
			}else{
				model.addAttribute("msg","일반 회원 비밀번호 찾기 실패");
				return "common/errorPage";
			}
		}catch(Exception e) {
			model.addAttribute("msg",e.toString());
			return "common/errorPage";
		}
	}
}