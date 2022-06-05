package com.highfive.hirp.group.controller;

import java.lang.reflect.Member;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.highfive.hirp.common.Search;
import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeService;
import com.highfive.hirp.group.domain.Group;
import com.highfive.hirp.group.service.GroupService;
import com.highfive.hirp.time.user.domain.Time;

// 컨트롤러 오류는 jsp와 함께보기

@Controller
public class GroupController {
	@Autowired
	private GroupService gService;
	
	@Autowired
	private EmployeeService eService;
	
	// 조직도 조회1
	@ResponseBody // ajax사용 위해서 필요함
	@RequestMapping(value ="/group/groupViewData.hirp", method=RequestMethod.GET, produces="application/json;charset=utf-8")
	public String groupView() {
		List<Dept> dList = gService.printAllGroup();
		if(!dList.isEmpty()) {
			Gson gson = new Gson();
			return gson.toJson(dList);
		}
		return "";
	}
	// 직원 조회
	@ResponseBody
	@RequestMapping(value ="/group/selectAllGroupMember.hirp", method=RequestMethod.GET, produces="application/json;charset=utf-8")
	public String selectAllGroupMember(@RequestParam(value = "emplId", required = false) String emplId) {
		//emplid 값 안넘겨받으면 회원전체조회함
		List<Employee> emplList = gService.selectAllGroupMember(emplId);
		if(!emplList.isEmpty()) {
			Gson gson = new Gson();
			return gson.toJson(emplList);
		}
		return "fail";
	}
	
	// 조직도 조회2
	 @RequestMapping(value="/group/groupView.hirp", method=RequestMethod.GET) // jsp -> 서버
	 public ModelAndView groupView (ModelAndView mv, HttpServletRequest request) { // 서버 -> db
	 List<Dept> groupList = gService.printAllGroup(); // grouptList, <Group>받아오는것 // ()불러오는것.불러올땐 괄호 비워둬도 됨
	 mv.addObject("groupList", groupList); // 그룹리스트 jsp로 보내줌 ("쓸값", 보내주는값)
	 mv.setViewName("group/groupView");
	 return mv;
	 }
	
	// 회원 검색
	@RequestMapping(value="/group/groupSerchView", method=RequestMethod.GET)
	public ModelAndView groupSearchView (ModelAndView mv, @ModelAttribute Search search) { // 파람하나, 모델통째로(도메인으로묶인것) // 모델 뒤에 있는것을 아랫줄 ()에 적을 수 있음
		List<Group> membertList = gService.searchAllGroup(search); // ()안에 검색어, 검색조건(Search안에 적혀있음) // <>여러명의그룹
		return mv;
	}
	
	// 상세 회원 정보 열람
	@ResponseBody
	@RequestMapping(value="/group/groupDetailView.hirp", method=RequestMethod.GET, produces="application/json;charset=utf-8")
	public String groupDetailView (@RequestParam("emplId") String emplId) {
		//Member member = gService.detailGroupMember(emplId);  // 둘째줄 설명 String->문자받을때 // int->결과확인 // 한명의그룹이어서<>아님 // 위에있는것가져와야함
		// 마이페이지 상세조회에 이미 만들어 놓은 로직 있어서 가져다 씀!
		Employee employee = eService.employeeMyPage(emplId); // db에서 데이터 갖고옴
		if (employee != null) {
			// employee에 값이 들어있다. 값은 마이페이지에 출력할 값.
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(employee);
		} else {
			return "";
		}
	}
}

// insert, update, delete -> int result(등록)
// select -> 여러개List<Group>,하나Group group