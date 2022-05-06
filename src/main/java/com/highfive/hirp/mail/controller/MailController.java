package com.highfive.hirp.mail.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
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
	
	// 메일 작성 페이지 이동
	@RequestMapping(value="/mail/writeView.hirp", method=RequestMethod.GET)
	public ModelAndView showSend(ModelAndView mv) {
		try {
			mv.setViewName("mail/mailWriteForm");
		}catch(Exception e) {
			
		}
		return mv;
	}
	
	// 메일작성 후 메일 전송할 때 실행되는 코드
	@RequestMapping(value="/mail/send.hirp", method=RequestMethod.POST)
	public ModelAndView doSend(ModelAndView mv
			, @ModelAttribute Mail mail
			, @RequestParam(value="uploadFile", required=false) MultipartFile uploadFile
			, HttpServletRequest request) {
		String host = "smtp.naver.com";
		final String user = "smartms95@naver.com";
		final String password = "minsu0$@0";
		Properties prop = new Properties();
		prop.put("mail.smtp.host", host);
		prop.put("mail.smtp.port", 587);
		prop.put("mail.smtp.auth", "true");
		
		Session session = Session.getDefaultInstance(prop, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(user, password);
			}
		});
		
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(user));
			
			// 수신자 메일주소
			InternetAddress[] addArray = new InternetAddress[2];
			addArray[0] = new InternetAddress("smartms95@naver.com");
			addArray[1] = new InternetAddress("jangms124578@hirp.com");
			
			message.addRecipients(Message.RecipientType.TO, addArray);
			
			// Subject
			message.setSubject(mail.getMailTitle());
			
			// Text
			message.setText(mail.getMailContents());
			
			// Send the message
			Transport.send(message);
			
			String mailRecipient = Arrays.toString(addArray);
			mail.setMailSender(host);
			mail.setMailTitle(message.getSubject());
			mail.setMailRecipient(mailRecipient);
			
			if(uploadFile != null && !uploadFile.getOriginalFilename().equals("")) {
				HashMap<String, String> fileMap = saveFile(uploadFile, request);
				String filePath = fileMap.get("filePath");
				String fileRename = fileMap.get("fileName");
				if(filePath != null && !filePath.equals("")) {
					mail.setFileName(uploadFile.getOriginalFilename());
					mail.setFileReName(fileRename);
					mail.setFilePath(filePath);
				}
			}
			int result = mService.sendMail(mail);
			if(result > 0) {
				mv.setViewName("redirect:/mail/list.hirp");
			}else {
				mv.addObject("msg", "메일 보내기 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(AddressException e) {
			e.printStackTrace();
		}catch(MessagingException e) {
			e.printStackTrace();
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
	@RequestMapping(value="/mail/list.hirp", method=RequestMethod.GET)
	public ModelAndView selectReceivedMailList(ModelAndView mv
			, @RequestParam(value="page", required=false) Integer page) {
		try {
			int currentPage = (page != null) ? page : 1;
			int totalCount = mService.getListCount();
			PageInfo pi = Pagination.getPageInfo(currentPage, totalCount);
			List<Mail> mList = mService.selectReceivedMail(pi);
//					   mList = mService.selectSentMail();
//					   mList = mService.selectTemporaryMail();
//					   mList = mService.selectMyMail();
//					   mList = mService.selectImportantMail();
//					   mList = mService.selectWasteBasketMail();
			if(!mList.isEmpty()) {
//				if() { // 받은메일함
//				}else if() { // 보낸메일함
//					
//				}else if() { // 임시보관함
//					
//				}else if() { // 내게쓴메일함
//					
//				}else if() { // 중요메일함
//					
//				}else if() { // 휴지통
//					
//				}
				mv.addObject("mList", mList);
				mv.addObject("pi", pi);
				mv.setViewName("mail/mailList");
			}else {
				mv.addObject("msg", "메일 조회 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
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
