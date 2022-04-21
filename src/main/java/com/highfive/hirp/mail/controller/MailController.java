package com.highfive.hirp.mail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.mail.service.MailService;

@Controller
public class MailController {

	@Autowired
	private MailService mService;
	
	// 메일 작성 페이지로 이동
	public ModelAndView showSend(ModelAndView mv) {
		return mv;
	}
	
	// 메일작성 후 메일 전송할 때 실행되는 코드
	public ModelAndView doSend(ModelAndView mv) {
		return mv;
	}
	
	// 전체 메일값 받아오는 코드
	public ModelAndView selectMailList(ModelAndView mv) {
		return mv;
	}
	
	// 받은메일함 상세조회
	public ModelAndView receivedMailView(ModelAndView mv) {
		return mv;
	}
	
	// 주소록 보여주는 코드
	public ModelAndView addressView(ModelAndView mv) {
		return mv;
	}
	
	// 첨부파일 저장
	public ModelAndView saveFile(ModelAndView mv) {
		return mv;
	}
	
	// 임시저장된 메일 불러와서 수정
	public ModelAndView mailModifyView(ModelAndView mv) {
		return mv;
	}
	
	// 답장
	public ModelAndView mailReplyView(ModelAndView mv) {
		return mv;
	}
	
	// 전달
	public ModelAndView mailRelayView(ModelAndView mv) {
		return mv;
	}
	
	// 메일 휴지통으로 이동
	public ModelAndView mailMoveWasteBasket(ModelAndView mv) {
		return mv;
	}
	
	// 휴지통에 있는 메일 복구
	public ModelAndView mailRestore(ModelAndView mv) {
		return mv;
	}
	
	// 메일 휴지통에서 삭제
	public ModelAndView mailDelete(ModelAndView mv) {
		return mv;
	}
	
	// 중요메일
	public ModelAndView importentMail(ModelAndView mv) {
		return mv;
	}
	
}
