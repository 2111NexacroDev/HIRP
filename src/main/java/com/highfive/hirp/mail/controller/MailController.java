package com.highfive.hirp.mail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.mail.service.MailService;

@Controller
public class MailController {

	@Autowired
	private MailService mService;
	
	// 메일 작성 페이지로 이동
	public String showSend() {
		return null;
	}
	
	// 메일작성 후 메일 전송할 때 실행되는 코드
	public String doSend() {
		return null;
	}
	
	
}
