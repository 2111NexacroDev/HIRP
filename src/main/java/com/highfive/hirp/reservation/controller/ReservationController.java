package com.highfive.hirp.reservation.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.highfive.hirp.reservation.domain.Reservation;
import com.highfive.hirp.reservation.domain.Utility;
import com.highfive.hirp.reservation.service.ReservationService;

@Controller
public class ReservationController {
	@Autowired
	private ReservationService rService;
	
	// 예약, 공용품 조회
	@RequestMapping(value="/reservation/list.hirp", method=RequestMethod.GET)
	public ModelAndView reservationListView(ModelAndView mv
			,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			
			List<Reservation> rList = rService.printAllReservation();
			List<Utility> uList = rService.printAllUtility();
			List<Reservation> myList = rService.printAllMyReservation(emplId);
			
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
			// 내 예약 존재 여부
			if(!myList.isEmpty()) {
				mv.addObject("myList", myList);
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
	
	// 예약 정보 상세 조회
	@ResponseBody
	@RequestMapping(value="/reservation/reservationInfo.hirp", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public String reservationViewByNo(Model model, 
			@ModelAttribute Reservation reservation,
			@RequestParam("reservationNo") int reservationNo) {
		reservation = rService.printOneReservationByNo(reservationNo);
		if (reservation != null) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(reservation);
		} else {
			return null;
		}
	}
	
	// 예약 수정
	@RequestMapping(value="/reservation/edit.hirp", method=RequestMethod.POST)
	public ModelAndView reservationUpdate(ModelAndView mv
			,@ModelAttribute Reservation reservation) {
		try {
			int result = rService.modifyReservation(reservation);
			if(result > 0) {
				mv.setViewName("redirect:/reservation/list.hirp");
			} else {
				mv.addObject("msg", "예약 수정 실패");
			}
		} catch(Exception e) {
			mv.addObject("msg", "예약 수정 오류");
			mv.setViewName("common/errorPage");			
		}
		return mv;
	}
	
	// 예약 삭제
	@RequestMapping(value="/reservation/delete.hirp", method=RequestMethod.POST)
	public ModelAndView reservationDelete(ModelAndView mv
			,@RequestParam("reservationNo") int reservationNo) {
		try {
			int result = rService.removeReservation(reservationNo);
			if(result > 0) {
				mv.setViewName("redirect:/reservation/list.hirp");
			} else {
				mv.addObject("msg", "예약 삭제 실패");
			}
		} catch(Exception e) {
			mv.addObject("msg", "예약 삭제 오류");
			mv.setViewName("common/errorPage");			
		}
		return mv;
	}
	
	// 자산 반납
	@ResponseBody
	@RequestMapping(value="/reservation/returnUtility.hirp", method=RequestMethod.POST)
	public String returnUtility(ModelAndView mv
			,@RequestParam("reservationNo") int reservationNo) {
		try {
			int result = rService.returnUtility(reservationNo);
			if(result > 0) {
				return "success";
			} else {
				return "fail";
			}
		} catch(Exception e) {
			return "fail";		
		}
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
	
	// 공용품 정보 조회
	@ResponseBody
	@RequestMapping(value="/utility/utilityInfo.hirp", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public String utilityViewByNo(Model model, 
			@ModelAttribute Utility utility,
			@RequestParam("utilityNo") int utilityNo) {
		System.out.println(utilityNo);
		utility = rService.printOneUtilityByNo(utilityNo);
		if (utility != null) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(utility);
		} else {
			return null;
		}
	} 
	
	// 공용품 수정
	@RequestMapping(value="/utility/edit.hirp", method=RequestMethod.POST)
	public ModelAndView utilityUpdate(ModelAndView mv
			,@ModelAttribute Utility utility) {
		try {
			int result = rService.modifyUtility(utility);
			if(result > 0) {
				mv.setViewName("redirect:/reservation/list.hirp");
			} else {
				mv.addObject("msg", "공용품 수정 실패");
				mv.setViewName("redirect:/reservation/list.hirp");
			}	
		} catch(Exception e) {
			mv.addObject("msg", "공용품 수정 오류");
			mv.setViewName("common/errorPage");			
		}
		return mv;
	}
	
	// 공용품 삭제
	@RequestMapping(value="/utility/delete.hirp", method=RequestMethod.POST)
	public ModelAndView utilityDelete(ModelAndView mv
			,@RequestParam("utilityNo") int utilityNo) {
		try {
			int result = rService.removeUtility(utilityNo);
			if(result > 0) {
				mv.setViewName("redirect:/reservation/list.hirp");
			} else {
				mv.addObject("msg", "공용품 삭제 실패");
				mv.setViewName("redirect:/reservation/list.hirp");
			}	
		} catch(Exception e) {
			mv.addObject("msg", "공용품 삭제 오류");
			mv.setViewName("common/errorPage");			
		}
		return mv;
	}
}
