package com.highfive.hirp.group.controller;

import java.lang.reflect.Member;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.group.domain.Group;
import com.highfive.hirp.group.service.GroupService;

// 컨트롤러 오류는 jsp와 함께보기

@Controller
public class GroupController {
	
	@Autowired
	private GroupService gService;

	// 조직도 조회
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
	@RequestMapping(value="/group/groupDetailView", method=RequestMethod.GET)
	public ModelAndView groupDetailView (ModelAndView mv, @RequestParam("emplId") String emplId) {
		Member member = gService.detailGroupMember(emplId);  // 둘째줄 설명 String->문자받을때 // int->결과확인 // 한명의그룹이어서<>아님 // 위에있는것가져와야함
		return mv;
	}
}

// insert, update, delete -> int result(등록)
// select -> 여러개List<Group>,하나Group group