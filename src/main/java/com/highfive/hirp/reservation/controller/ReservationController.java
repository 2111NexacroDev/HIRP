package com.highfive.hirp.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.reservation.service.ReservationService;

@Controller
public class ReservationController {
	@Autowired
	private ReservationService rService;
	
	// 예약, 공용품 조회
	public ModelAndView reservationListView(ModelAndView mv) {
		return mv;
	}
	
	// 예약 등록
	public ModelAndView reservationRegister(ModelAndView mv) {
		return mv;
	}
	
	// 예약 삭제
	public ModelAndView reservationDelete(ModelAndView mv) {
		return mv;
	}
	
	// 예약 수정 화면 로드
	public ModelAndView reservationUpdateView(ModelAndView mv) {
		return mv;
	}	
	
	// 예약 수정
	public ModelAndView reservationUpdate(ModelAndView mv) {
		return mv;
	}
	
	// 공용품 등록
	public ModelAndView utilityRegister(ModelAndView mv) {
		return mv;
	}
	
	// 공용품 삭제
	public ModelAndView utilityDelete(ModelAndView mv) {
		return mv;
	}
	
	// 공용품 수정 화면 로드
	public ModelAndView utilityUpdateView(ModelAndView mv) {
		return mv;
	}	
	
	// 공용품 수정
	public ModelAndView utilityUpdate(ModelAndView mv) {
		return mv;
	}
}
