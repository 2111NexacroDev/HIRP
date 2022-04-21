package com.highfive.hirp.reservation.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
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
	public ModelAndView reservationListView(ModelAndView mv) {
		List<Reservation> rList = rService.printAllReservation();
		List<Utility> uList = rService.printAllUtility();
		return mv;
	}
	
	// 예약 등록
	public ModelAndView reservationRegister(ModelAndView mv
			,@ModelAttribute Reservation reservation
			,HttpServletRequest request) {
		int result = rService.registerReservation(reservation);
		return mv;
	}
	
	// 예약 수정 화면 로드 나눠야하나
	//@RequestMapping()
	public String reservationUpdateView() {
		return "";
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
	public ModelAndView utilityRegister(ModelAndView mv
			,@ModelAttribute Utility utility
			,HttpServletRequest request) {
		int result = rService.registerUtility(utility);
		return mv;
	}
	
	// 공용품 수정 화면 로드
	public ModelAndView utilityUpdateView(ModelAndView mv) {
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
