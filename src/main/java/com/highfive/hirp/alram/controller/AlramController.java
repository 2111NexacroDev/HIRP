package com.highfive.hirp.alram.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.alram.domain.Alram;
import com.highfive.hirp.alram.domain.AlramSetting;
import com.highfive.hirp.alram.service.AlramService;
import com.highfive.hirp.employee.domain.Employee;

@Controller
public class AlramController {
	
	@Autowired
	private AlramService aService;
	
	//알림 셋팅 페이지로 이동
	@RequestMapping(value="/alram/settingPage", method=RequestMethod.GET)
	public ModelAndView alramSettingPage(ModelAndView mv) {
		return mv;
	}
	
	//알림 설정 정보 추가
	//여기에 따로 만들게 아니라 다른 사람들 한 거에서 실행될 때마다 나오도록 해야할 듯.
	@RequestMapping(value="/alram/setting_update", method=RequestMethod.POST)
	public ModelAndView addAlramSetting(
			ModelAndView mv
			, HttpServletRequest request) {
		
//		HttpSession session = request.getSession();
//		Employee employee = (Employee) session.getAttribute("loginMember");
//		String emplId = employee.getEmplId();
		//아이디 컬럼에 userid가 있을 때
		String emplId = "사용자 아이디";
		AlramSetting alramSetting = aService.selectAlramSetting(emplId);
		
		if(alramSetting == null) {
			int result = aService.insertAlramSetting(emplId);	 //기본값으로 전부 y로 추가
		} 
		
		return mv;
	}
	
	//알림 설정 정보 업데이트
	@RequestMapping(value="/alram/setting_update", method=RequestMethod.POST)
	public ModelAndView updateAlramSetting(
			ModelAndView mv
			, @ModelAttribute AlramSetting alramSetting
			, HttpServletRequest request) {
		
//		HttpSession session = request.getSession();
//		Employee employee = (Employee) session.getAttribute("loginMember");
//		String emplId = employee.getEmplId();
		String emplId = "사용자 아이디";
		//alramSetting.setEmplId(userId); //필요하먼 넣기
		
		int result = aService.updateAlramSetting(alramSetting);
		
		return mv;
	}
	
	//전체 알림 가져오기
	public ModelAndView printAllAlram(
			ModelAndView mv,
			HttpServletRequest request) {
		
//		HttpSession session = request.getSession();
//		Employee employee = (Employee) session.getAttribute("loginMember");
//		String emplId = employee.getEmplId();
		String emplId = "사용자 아이디";
		List<Alram> allAlram = aService.selectAllAlram(emplId);
		
		return mv;
	}
	
	//안읽은 알림 가져오기(종 누르면 설정한 알림만 보는 거)
	public ModelAndView printUnReadAlram(
			ModelAndView mv) {
//		HttpSession session = request.getSession();
//		Employee employee = (Employee) session.getAttribute("loginMember");
//		String emplId = employee.getEmplId();
		String emplId = "사용자 아이디";
		AlramSetting alramSetting = aService.selectAlramSetting(emplId);
		List<Alram> unreadAlram = aService.selectUnreadAlram(alramSetting);
		
		return mv;
	}
	
}