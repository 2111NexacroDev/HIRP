package com.highfive.hirp.mail.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
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
	public ModelAndView doSend(ModelAndView mv
			, @ModelAttribute Mail mail) {
		return mv;
	}
	
	// 전체 메일값 받아오는 코드
	public ModelAndView selectMailList(ModelAndView mv) {
		return mv;
	}
	
	// 받은메일함 상세조회
	public ModelAndView receivedMailView(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 주소록 보여주는 코드
	public ModelAndView addressView(ModelAndView mv) {
		return mv;
	}
	
	// 첨부파일 저장
	public ModelAndView saveFile(ModelAndView mv
			, @ModelAttribute MailFile mailFile
			, @RequestParam(value="uploadFile", required=false)MultipartFile uploadFile
			, HttpServletRequest request) {
		return mv;
	}
	
	// 임시저장된 메일 불러와서 수정
	public ModelAndView mailModifyView(ModelAndView mv
			, @ModelAttribute Mail mail) {
		return mv;
	}
	
	// 답장
	public ModelAndView mailReplyView(ModelAndView mv
			, @ModelAttribute Mail mail) {
		return mv;
	}
	
	// 전달
	public ModelAndView mailRelayView(ModelAndView mv
			, @ModelAttribute Mail mail) {
		return mv;
	}
	
	// 메일 휴지통으로 이동
	public ModelAndView mailMoveWasteBasket(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 휴지통에 있는 메일 복구
	public ModelAndView mailRestore(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 메일 휴지통에서 삭제
	public ModelAndView mailDelete(ModelAndView mv
			, @ModelAttribute Mail mail) {
		return mv;
	}
	
	// 중요메일
	public ModelAndView importentMail(ModelAndView mv
			, @ModelAttribute Mail mail) {
		return mv;
	}
	
}
