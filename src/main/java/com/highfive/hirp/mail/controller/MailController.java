package com.highfive.hirp.mail.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Pagination;
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
	
	// 받은메일함 조회
	@RequestMapping(value="/mail/receivedList.hirp", method=RequestMethod.GET)
	public ModelAndView selectReceivedMailList(ModelAndView mv
			, @RequestParam(value="page", required=false) Integer page) {
		try {
			int currentPage = (page != null) ? page : 1;
			int totalCount = mService.getListCount();
			PageInfo pi = Pagination.getPageInfo(currentPage, totalCount);
			List<Mail> mList = mService.selectReceivedMail(pi);
			if(!mList.isEmpty()) {
				mv.addObject("mList", mList);
				mv.addObject("pi", pi);
				mv.setViewName("mail/mailReceivedList");
			}
		}catch(Exception e) {
			
		}
		return mv;
	}
	
	// 받은메일함 상세조회
	public ModelAndView receivedMailView(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 보낸메일함 조회
	public ModelAndView selectSentMailList(ModelAndView mv) {
		return mv;
	}
	
	// 보낸메일함 상세조회
	public ModelAndView sentMailView(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 임시보관함 조회
	public ModelAndView temporaryMailList(ModelAndView mv) {
		return mv;
	}
	
	// 임시보관함 상세조회
	public ModelAndView temporaryMailView(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 내게쓴메일함 조회
	public ModelAndView myMailList(ModelAndView mv) {
		return mv;
	}
	
	// 내게쓴메일함 상세조회
	public ModelAndView myMailView(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 중요메일함 조회
	public ModelAndView importantMailList(ModelAndView mv) {
		return mv;
	}
	
	// 중요메일함 상세조회
	public ModelAndView importantMailView(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 휴지통 조회
	public ModelAndView wasteBasketMailList(ModelAndView mv) {
		return mv;
	}
	
	// 휴지통 상세조회
	public ModelAndView wasteBasketMailView(ModelAndView mv
			, @RequestParam("mailNo") int mailNo) {
		return mv;
	}
	
	// 버그리포트 작성페이지
	public ModelAndView showBugReport(ModelAndView mv) {
		return mv;
	}
	
	// 버그리포트 전송
	public ModelAndView doSendBugReport(ModelAndView mv
			, @ModelAttribute Mail mail) {
		return mv;
	}
	
	// 검색
	public ModelAndView searchList(ModelAndView mv
			, @ModelAttribute Mail mail) {
		return mv;
	}
	
	// 주소록 보여주는 코드
	public ModelAndView addressView(ModelAndView mv) {
		return mv;
	}
	
	// 주소록 저장
	public ModelAndView saveAddress(ModelAndView mv) {
		return mv;
	}
	
	// 주소록 삭제
	public ModelAndView deleteAddress(ModelAndView mv) {
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
			, @RequestParam("mailNo") int mailNo
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
		
}
