package com.highfive.hirp.time.user.controller;

import java.sql.Date;
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
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;
import com.highfive.hirp.time.user.service.TimeService;

@Controller
public class TimeController {

	@Autowired
	private TimeService tService;

	// 사용자 출,퇴근 내역 화면
	@RequestMapping(value = "/time/timeListView.hirp", method = RequestMethod.GET)
	public ModelAndView timeListView(ModelAndView mv, HttpServletRequest request) {
		try {
			// 세션에있는 로그인한 아이디값 넣어주기
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			Time time = tService.selectTime(emplId);
			if (time != null) { // if(!time.isEmpty()) -> 리스트일때
				mv.addObject("time", time);
				mv.setViewName("time/timeList");
			} else {
				mv.addObject("msg", "시간 조회에 실패했습니다");
				mv.setViewName("common/errorPage");
			}
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 사용자 출근 등록
	@ResponseBody
	@RequestMapping(value = "/time/timeStart.hirp", method = RequestMethod.POST)
	public String timeStart(@ModelAttribute Time time, @RequestParam("emplId") String emplId) {
		time.setEmplId(emplId);
		int result = tService.timeStart(time);
		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}

	// 사용자 퇴근 등록
	@ResponseBody
	@RequestMapping(value = "/time/timeEnd.hirp", method = RequestMethod.POST)
	public String timeEnd(@ModelAttribute Time time, HttpServletRequest request) {
		// 여기에서 타임에다가 세션에서 로그인 한 아이디 값을 넣어주는 코드를 작성
		// 세션에서 아이디 가져오는거 해봤죠?
		HttpSession session = request.getSession();
		// 세션에 담기(emplId에는 session에서 가져온 아이디 값을 가져와)
		// (String) 형변환 필요(getAttribute() 메소드의 리턴은 Object라서)
		// 값을 넣을 때 종류(자료형, String, int 이런거...)를 골라야함. 겟어트리뷰트로 값을 가져오면 자료형이 Object임. 디비에
		// 넣을 때 String으로 넣겠다구 모델에다가 적어놓음.
		// 근데 저 emplId의 자료형으로 정해둔 게 String이라서 앞에(String) 붙혀서 자료형 강제로 바꿔준것(종류 = 자료형 =
		// 데이터형태)
		String emplId = (String) session.getAttribute("emplId"); // getAttribute는 항상 형변환 해줘야함
		time.setEmplId(emplId);
		int result = tService.timeEnd(time);
		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}

	// 사용자 연차 내역 화면
	@RequestMapping(value = "/time/vacation.hirp", method = RequestMethod.GET)
	public ModelAndView vacationListView(ModelAndView mv, HttpServletRequest request) {
		try {
			// 세션에있는 로그인한 아이디값 넣어주기
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			
			List<Vacation> tList = tService.selectTimeView(emplId);
			Time time = tService.selectTime(emplId);
			
			if (time != null) { // if(!time.isEmpty()) -> 리스트일때
				mv.addObject("time", time);
				mv.setViewName("time/vacationList");
			} else {
				mv.addObject("msg", "시간 조회에 실패했습니다");
				mv.setViewName("common/errorPage");
			}
			
			if ( !tList.isEmpty() ) {
				mv.addObject("tList", tList);
				mv.setViewName("time/vacationList");
			} else {
				mv.addObject("msg", "연차 조회내역이 없습니다.");
				mv.setViewName("common/errorPage");
			}
			
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	
	
	// 사용자 연차 내역 조회
	@RequestMapping(value = "/time/timeView.hirp", method = RequestMethod.GET)
	public ModelAndView timeView(ModelAndView mv, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId"); // 로그인을 해야만 세션 생기는것. 로그인 해야만 조회되는 이유
		List<Vacation> tList = tService.selectTimeView(emplId);
		if ( !tList.isEmpty() ) {
			mv.addObject("tList", tList);
			mv.setViewName("time/vacationList");
		} else {
			mv.addObject("msg", "연차 조회내역이 없습니다.");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

//	// 사용자 근태 조정 신청 화면
//	@RequestMapping(value="/time/modify.hirp", method=RequestMethod.GET)
//	public ModelAndView modifyListView (ModelAndView mv) {
//		mv.setViewName("time/modifyList");
//		return mv;
//	}	

//
//	// 사용자 근태 조정 신청
//	public ModelAndView timeModify (ModelAndView mv, @ModelAttribute TimeModify timeModify, HttpServletRequest request) {
//		int result = tService.updateTimeModify(timeModify);
//		return mv;
//	}
}

// 이미 있는 거를 덮어 씌우는 건 update
// 없었는데 새로 생기는건 insert

// 출근등록 - 시간이 아예 디비에 없다가 등록하면 그 때 생기는 거라서 insert
// 퇴근등록 - update
// 근태조정신청 - 시간을 바꿔주는 거라 update
// 등록, 수정에는 Http추가