package com.highfive.hirp.mail.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Pagination;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
import com.highfive.hirp.mail.domain.Recipient;
import com.highfive.hirp.mail.domain.Referrer;
import com.highfive.hirp.mail.service.MailService;

@Controller
public class MailController {

	@Autowired
	private MailService mService;
	
	// 메일 작성 페이지 이동
	@RequestMapping(value="/mail/writeView.hirp", method=RequestMethod.GET)
	public ModelAndView showSend(ModelAndView mv) {
		try {
			mv.setViewName("mail/mailWriteForm");
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 메일 전송
	@RequestMapping(value="/mail/send.hirp", method=RequestMethod.POST)
	public ModelAndView doSend(ModelAndView mv
			, @ModelAttribute Mail mail
			, @ModelAttribute MailFile mailFile
			, @ModelAttribute Recipient recipient
			, @ModelAttribute Referrer referrer
			, @RequestParam(value="uploadFile", required=false) MultipartFile uploadFile
			, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			mail.setEmplId(emplId);
			mailFile.setEmplId(emplId);
			recipient.setEmplId(emplId);
			referrer.setEmplId(emplId);
			if(uploadFile != null && !uploadFile.getOriginalFilename().equals("")) {
				HashMap<String, String> fileMap = saveFile(uploadFile, request);
				String filePath = fileMap.get("filePath");
				String fileRename = fileMap.get("fileName");
				String fileExtension = fileMap.get("fileExtension");
				
				if(filePath != null && !filePath.equals("")) {
					mailFile.setFileName(uploadFile.getOriginalFilename());
					mailFile.setFileExtension(fileExtension);
					mailFile.setFileReName(fileRename);
					mailFile.setFilePath(filePath);
				}
			}
			int result = mService.sendMail(mail);
			result = mService.sendMailRecipient(recipient);
			result = mService.sendMailReferrer(referrer);
			result = mService.saveFile(mailFile);
			if(result > 0) {
				mv.setViewName("redirect:/mail/Rlist.hirp");
			}else {
				mv.addObject("msg", "메일 전송 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 메일 첨부파일 저장
	public HashMap<String, String> saveFile(MultipartFile file, HttpServletRequest request) {
		String filePath = "";
		HashMap<String, String> fileMap = new HashMap<String, String>();
		String root = request.getSession().getServletContext().getRealPath("resources");
		String savePath = root + "\\nuploadFiles";
		File folder = new File(savePath);
		if(!folder.exists()) folder.mkdir();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String originalFileName = file.getOriginalFilename();
		String extensionName = originalFileName.substring(originalFileName.lastIndexOf(".")+1);
		String renameFileName = sdf.format(new Date(System.currentTimeMillis()))+"."+extensionName;
		filePath = folder + "\\" + renameFileName;
		fileMap.put("fileExtension", extensionName);
		fileMap.put("filePath", filePath);
		fileMap.put("fileName", renameFileName);
		try {
			file.transferTo(new File(filePath));
		}catch(Exception e) {
			e.printStackTrace();
		}
		return fileMap;
	}
	
	// 메일함 조회
	@RequestMapping(value="/mail/{param}list.hirp", method=RequestMethod.GET)
	public ModelAndView selectMailList(ModelAndView mv
			, @ModelAttribute Mail mail
			, @ModelAttribute Recipient recipient
			, @PathVariable("param") String mailCategory
			, @RequestParam(value="page", required=false) Integer page
			, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			mail.setEmplId(emplId);
			mail.setMailSender(emplId);
			mail.setRecipientId(recipient.getRecipientId());
			int currentPage = (page != null) ? page : 1;
			int totalCountR = mService.getMailCountR(mail);
			int	totalCountS = mService.getMailCountS(mail);
			int	totalCountT = mService.getMailCountT(mail);
			int totalCountM = mService.getMailCountM(mail);
			int totalCountI = mService.getMailCountI(mail);
			int totalCountW = mService.getMailCountW(mail);
			
			PageInfo pi = null;
			
			// 받은메일함
			if(mailCategory.equals("R")) {
				pi = Pagination.getPageInfo(currentPage, totalCountR);
				List<Mail> mListR = mService.printMailRec(mail, pi);
				mv.addObject("mList", mListR);
			// 보낸메일함
			}else if(mailCategory.equals("S")) {
				pi = Pagination.getPageInfo(currentPage, totalCountS);
				List<Mail> mListS = mService.printMailSend(mail, pi);
				mv.addObject("mList", mListS);
			// 임시보관함
			}else if(mailCategory.equals("T")) {
				pi = Pagination.getPageInfo(currentPage, totalCountT);
				List<Mail> mListT = mService.printMailTem(mail, pi);
				mv.addObject("mList", mListT);
			// 내게쓴메일함
			}else if(mailCategory.equals("M")) {
				pi = Pagination.getPageInfo(currentPage, totalCountM);
				List<Mail> mListM = mService.printMailMy(mail, pi);
				mv.addObject("mList", mListM);
			// 중요메일함
			}else if(mailCategory.equals("I")) {
				pi = Pagination.getPageInfo(currentPage, totalCountI);
				List<Mail> mListI = mService.printMailImp(mail, pi);
				mv.addObject("mList", mListI);
			// 휴지통
			}else if(mailCategory.equals("W")) {
				pi = Pagination.getPageInfo(currentPage, totalCountW);
				List<Mail> mListW = mService.printMailWas(mail, pi);
				mv.addObject("mList", mListW);
			}
			mv.addObject("pi", pi);
			mv.addObject("mailCategory", mailCategory);
			mv.setViewName("mail/mailList");
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 메일함 상세조회
	@RequestMapping(value="/mail/detail.hirp", method=RequestMethod.GET)
	public ModelAndView mailDetailView(ModelAndView mv
			, @RequestParam("mailNo") Integer mailNo) {
		try {
			Mail mail = mService.printOneByNo(mailNo); // 메일 조회
			Recipient recipient = mService.printOneByNoMailRec(mailNo); // 수신인 조회
			Referrer referrer = mService.printOneByNoMailRef(mailNo); // 참조인 조회
			MailFile mailFile = mService.printOneByNoMailFile(mailNo); // 첨부파일 조회
//			mail.setRecipientId(recipient.getRecipientId());
//			mail.setReferrerId(referrer.getReferrerId());
//			mail.setFileName(mailFile.getFileName());
			if(mail != null && recipient != null && referrer != null) {
				mv.addObject("mail", mail);
				mv.addObject("recipient", recipient);
				mv.addObject("referrer", referrer);
				mv.addObject("mailFile", mailFile);
				mv.setViewName("mail/mailDetailView");
			}else {
				mv.addObject("msg", "메일 상세조회 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 버그리포트 작성페이지
	@RequestMapping(value="/bugReport/WriteView.hirp", method=RequestMethod.GET)
	public ModelAndView showBugReport(ModelAndView mv) {
		try {
			mv.setViewName("mail/bugReportWriteForm");
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 버그리포트 전송
	@RequestMapping(value="/bugReport/send.hirp", method=RequestMethod.POST)
	public ModelAndView doSendBugReport(ModelAndView mv
			, @ModelAttribute Mail mail
			, @ModelAttribute MailFile mailFile
			, @ModelAttribute Recipient recipient
			, @ModelAttribute Referrer referrer
			, @RequestParam(value="uploadFile", required=false) MultipartFile uploadFile
			, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			mail.setEmplId(emplId);
			mailFile.setEmplId(emplId);
			recipient.setEmplId(emplId);
			referrer.setEmplId(emplId);
			if(uploadFile != null && !uploadFile.getOriginalFilename().equals("")) {
				HashMap<String, String> fileMap = saveFile(uploadFile, request);
				String filePath = fileMap.get("filePath");
				String fileRename = fileMap.get("fileName");
				String fileExtension = fileMap.get("fileExtension");
				
				if(filePath != null && !filePath.equals("")) {
					mailFile.setFileName(uploadFile.getOriginalFilename());
					mailFile.setFileExtension(fileExtension);
					mailFile.setFileReName(fileRename);
					mailFile.setFilePath(filePath);
				}
			}
			int result = mService.sendMail(mail);
			result = mService.sendBugReportRecipient(recipient);
			result = mService.sendMailReferrer(referrer);
			result = mService.saveFile(mailFile);
			if(result > 0) {
				mv.setViewName("redirect:/mail/Rlist.hirp");
			}else {
				mv.addObject("msg", "버그리포트 전송 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
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
