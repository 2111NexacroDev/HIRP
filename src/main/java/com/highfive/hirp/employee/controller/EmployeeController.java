package com.highfive.hirp.employee.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeService;

@Controller
public class EmployeeController {

	@Autowired
	private EmployeeService eService;

// get - 조회(select)
// post- 생성(insert),수정(update),삭제(delete)

	// 회원가입 화면
	@RequestMapping(value = "/employee/registerView.hirp", method = RequestMethod.GET)
	public ModelAndView joinView(ModelAndView mv) {
		mv.setViewName("employee/register");
		return mv;
	}

	// 회원가입
	@RequestMapping(value = "/employee/register.hirp", method = RequestMethod.POST) // jsp와 post 맞춰줌
	public String memberRegister(Model model, @ModelAttribute Employee employee, // model 결과 보여줄 때 사용(serlvet-context)
			@RequestParam("emplId") String emplId, // String, int, date
			@RequestParam("emplPw") String emplPw, @RequestParam("emplName") String emplName,
			@RequestParam("birthday") String birthday, @RequestParam("phoneNo") String phoneNo,
			@RequestParam("gender") String gender) { // model은 도메인에서 가져옴(set사용위해) // param은 register.jsp에서
		try {
			int result = eService.registerEmployee(employee); // .뒤는 서비스의 ()로 가겠다
			if (result > 0) { // 1성공
				return "redirect:/employee/login.hirp";
			} else { // 0실패
				model.addAttribute("msg", "회원가입에 실패했습니다.");
				return "/common/errorPage";
			}
		} catch (Exception e) { // 그 외의 경우 실패
			model.addAttribute("msg", e.toString()); // 에러 메세지를 String으로 보여줘라
			return "/common/errorPage";
		}
	}

	// 로그인 화면 (여기서 -> reg.jsp -> 로그인 컨트롤러 -> 홈)
	@RequestMapping(value = "/employee/loginView.hirp", method = RequestMethod.GET)
	public ModelAndView loginView(ModelAndView mv) {
		mv.setViewName("employee/login"); // 셋뷰네임 거기로가라
		return mv;
	}

	// 로그인
	@RequestMapping(value = "/employee/login.hirp", method = RequestMethod.POST)
	public String employeeLogin(Model model, HttpServletRequest request, @RequestParam("emplId") String emplId, // HttpServletRequest -> 경로, 파일저장, 로그인 세션때 사용(web.xml)
			@RequestParam("emplPw") String emplPw) {
		Employee employee = new Employee();
		employee.setEmplId(emplId);
		employee.setEmplPw(emplPw);
		try {
			Employee empLogin = eService.loginMember(employee);
			if (empLogin != null) {
				// 세션에 담기
				HttpSession session = request.getSession();
				session.setAttribute("emplId", empLogin.getEmplId());
				session.setAttribute("emplPw", empLogin.getEmplPw());
				session.setAttribute("deptCode", empLogin.getDeptCode());
				session.setAttribute("emplName", empLogin.getEmplName());
				if(emplId.equals("admin")) {
					return "redirect:/admin.hirp";					
				} else {
					return "redirect:/home.hirp";				
				}
			} else {
				model.addAttribute("msg", "로그인에 실패했습니다.");
				return "common/errorPage";
			}
		} catch (Exception e) {
			model.addAttribute("msg", e.toString());
			return "common/errorPage";
		}
	}

	// 로그아웃(세션에 넣어줬던 정보 없애기만 하면 돼서 controller만 쓰면 됨)
	@RequestMapping(value = "/employee/logout.hirp", method = RequestMethod.GET)
	public String logout(HttpServletRequest request) {
		HttpSession session = request.getSession();
		if (session != null) {
			session.invalidate();
			return "redirect:/employee/loginView.hirp";
		} else {
			request.setAttribute("msg", "로그아웃에 실패했습니다.");
			return "common/errorPage";
		}
	}

	// 비밀번호 찾기 화면1
	@RequestMapping(value = "/employee/findPwdView1.hirp", method = RequestMethod.GET)
	public ModelAndView findPwdView(ModelAndView mv) {
		mv.setViewName("employee/findPwd1");
		return mv;
	}

	// 비밀번호 찾기 화면2
	@RequestMapping(value = "/employee/findPwdView2.hirp", method = RequestMethod.GET)
	public ModelAndView findPwdView2(ModelAndView mv) {
		mv.setViewName("employee/findPwd2");
		return mv;
	}

	// 비밀번호 찾기
	@RequestMapping(value = "/employee/findPwd.hirp", method = RequestMethod.POST)
	public String findPwd(Model model, HttpServletRequest request, @RequestParam("emplId") String emplId,
			@RequestParam("emplName") String emplName, @RequestParam("birthday") String birthday) {
		Employee employee = new Employee();
		employee.setEmplId(emplId);
		employee.setEmplName(emplName);
		employee.setBirthday(birthday);
		try {
			Employee empFindPwd = eService.findPwd(employee);
			if (empFindPwd != null) {
				HttpSession session = request.getSession();
				session.setAttribute("emplId", empFindPwd.getEmplId());
				session.setAttribute("emplName", empFindPwd.getEmplName());
				session.setAttribute("birthday", empFindPwd.getBirthday());
				return "redirect:/findPwdView2.hirp";
			} else {
				model.addAttribute("msg", "입력한 정보가 일치하지 않습니다.");
				return "common/errorPage";
			}
		} catch (Exception e) {
			model.addAttribute("msg", e.toString());
			return "common/errorPage";
		}
	}

	// 비밀번호 재설정
	@RequestMapping(value = "/employee/modifyPwd.hirp", method = RequestMethod.POST)
	public ModelAndView modifyPwd(ModelAndView mv, HttpServletRequest request, @ModelAttribute Employee employee,
			@RequestParam("emplId") String emplId, @RequestParam("emplPw1") String emplPw) { // ()는 jsp이름과 같게. String()는 변수
		try {
			employee.setEmplId(emplId);
			employee.setEmplPw(emplPw); // 비밀번호는 name값 달라서 위에 ("emplPw1")는 이렇게 써주고 여기에서 employee에 수동으로 담아줌(나머지는 자동세팅)
			int result = eService.modifyPwd(employee);
			if (result > 0) {
				mv.setViewName("redirect:/employee/loginView.hirp");
			} else {
				mv.addObject("msg", "비밀번호 재설정에 실패했습니다.");
				mv.setViewName("common/errorPage");
			}
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 마이페이지 화면1 -> 따로 입력하는게 없어서 get 1개만
	@RequestMapping(value = "/employee/mypageView1.hirp", method = RequestMethod.GET)
	public ModelAndView mypageView(ModelAndView mv) {
		mv.setViewName("employee/mypage1");
		return mv;
	}

	// 마이페이지 화면2
	@RequestMapping(value = "/employee/mypage.hirp", method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView employeeMypage(ModelAndView mv, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId"); // 로그인을 해야만 세션 생기는것. 로그인 해야만 조회되는 이유
		try {
			Employee employee = eService.employeeMyPage(emplId); // db에서 데이터 갖고옴
			if (employee != null) {
				// employee에 값이 들어있다. 값은 마이페이지에 출력할 값.
				mv.addObject("employee", employee);
				mv.setViewName("/employee/mypageInfo");
			}
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	/*
	 * // 마이페이지 화면2
	 * 
	 * @RequestMapping(value = "/employee/mypageView2.hirp", method =
	 * RequestMethod.GET) public ModelAndView mypageView2(ModelAndView mv) {
	 * mv.setViewName("employee/mypage2"); return mv; }
	 */

	// 마이페지이 비밀번호 일치여부 확인
	@RequestMapping(value = "/employee/mypageOk.hirp", method = RequestMethod.POST)
	public String mypageOk(Model model, HttpServletRequest request, @RequestParam("emplPw") String emplPw) {
		Employee employee = new Employee();
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		employee.setEmplId(emplId);
		employee.setEmplPw(emplPw);
		try {
			Employee empLogin = eService.loginMember(employee);
			if (empLogin != null) {
				return "redirect:/employee/mypage.hirp";
			} else {
				model.addAttribute("msg", "비밀번호가 일치하지 않습니다.");
				return "common/errorPage";
			}
		} catch (Exception e) {
			model.addAttribute("msg", e.toString());
			return "common/errorPage";
		}
	}

	// 마이페이지 수정(수정은 post 하나면 됨)
	@ResponseBody
	@RequestMapping(value = "/employee/mypageModify.hirp", method={RequestMethod.GET, RequestMethod.POST})
	public String mypageModify(HttpServletRequest request, Model model, @ModelAttribute Employee employee, @RequestParam(value="profileImg", required=false) MultipartFile uploadFile) { // 파일가져올때
		// 정보수정 후 정보수정 페이지에서 바로 보여짐. 로그아웃 하지 않아도 됨
		HttpSession session = request.getSession();
		if(uploadFile != null && !uploadFile.getOriginalFilename().equals("")) {
		       HashMap<String, String> fileMap = com.highfive.hirp.common.SaveAttachedFile.saveFile(uploadFile, request); // 업로드한 파일 저장하고 경로 리턴
		       String filePath = fileMap.get("filePath");
		       String fileRename = fileMap.get("fileName");
		       if(filePath != null && !filePath.equals("")) {
		          employee.setEmplProfile(fileRename); // 추가
		       }
		    }
		    // 디비에 해당 데이터 저장
		int result = eService.mypageModify(employee);
		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
}