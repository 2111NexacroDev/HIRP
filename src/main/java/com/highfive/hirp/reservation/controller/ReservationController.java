package com.highfive.hirp.reservation.controller;

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

import com.highfive.hirp.reservation.domain.Reservation;
import com.highfive.hirp.reservation.domain.Utility;
import com.highfive.hirp.reservation.service.ReservationService;

@Controller
public class ReservationController {
	@Autowired
	private ReservationService rService;
	
	// 예약, 공용품 조회
	@RequestMapping(value="/reservation/list.hirp", method=RequestMethod.GET)
	public ModelAndView reservationListView(ModelAndView mv) {
		try {
			List<Reservation> rList = rService.printAllReservation();
			List<Utility> uList = rService.printAllUtility();
			
			// 예약 목록 존재 여부
			if(!rList.isEmpty()) {
				mv.addObject("rList", rList);	
			} else {
				mv.addObject("msg", "등록된 예약 없음");
			}
			
			// 공용품 존재 여부
			if(!uList.isEmpty()) {
				mv.addObject("uList", uList);
			} else {
				mv.addObject("msg", "등록된 공용품 없음");
			}
			
			// 없어도 아래 페이지로 이동
			mv.setViewName("reservation/reservationList");			
		} catch(Exception e) {
			mv.addObject("msg", "조회 오류");
			mv.setViewName("common/errorPage");		
		}
		return mv;
	}
	
	// 예약 등록
	@RequestMapping(value="/reservation/write.hirp", method=RequestMethod.POST)
	public ModelAndView reservationRegister(ModelAndView mv
			,@ModelAttribute Reservation reservation
			,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String loginUser = (String) session.getAttribute("emplId");
			reservation.setEmplId(loginUser);
			int result = rService.registerReservation(reservation);
			if(result > 0) {
				mv.setViewName("redirect:/reservation/list.hirp");
			} else {
				mv.addObject("msg", "예약 실패");
			}
			mv.setViewName("redirect:/reservation/list.hirp");
		} catch(Exception e) {
			mv.addObject("msg", "등록 오류");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 예약 수정
	public ModelAndView reservationUpdate(ModelAndView mv
			,@ModelAttribute Reservation reservation) {
		int result = rService.modifyReservation(reservation);
		return mv;
	}
	
	// 예약 삭제
	public ModelAndView reservationDelete(ModelAndView mv
			,@RequestParam("reservationNo") int reservationNo) {
		int result = rService.removeReservation(reservationNo);
		return mv;
	}
	
	// 공용품 등록
	@RequestMapping(value="/utility/write.hirp", method=RequestMethod.POST)
	public ModelAndView utilityRegister(ModelAndView mv
			,@ModelAttribute Utility utility
			,HttpServletRequest request) {
		try {
			int result = rService.registerUtility(utility);
			if(result > 0) {
				mv.setViewName("redirect:/reservation/list.hirp");
			} else {
				mv.addObject("msg", "공용품 등록 실패");
				mv.setViewName("redirect:/reservation/list.hirp");
			}			
		} catch(Exception e) {
			mv.addObject("msg", "등록 오류");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 공용품 수정
	public ModelAndView utilityUpdate(ModelAndView mv
			,@ModelAttribute Utility utility) {
		int result = rService.modifyUtility(utility);
		return mv;
	}
	
	// 공용품 삭제
	public ModelAndView utilityDelete(ModelAndView mv
			,@RequestParam("utilityNo") int utilityNo) {
		int result = rService.removeUtility(utilityNo);
		return mv;
	}
}
