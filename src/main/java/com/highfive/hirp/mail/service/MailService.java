package com.highfive.hirp.mail.service;

import java.util.List;

import com.highfive.hirp.mail.domain.Mail;

public interface MailService {

	public List<Mail> selectAll(); // 메일 전체 조회
	public int sendMail(); // 메일 보내기
	
	public int removeMail(); // 휴지통 비우기
	
	public int replyMail(); // 답장
	public int relayMail(); // 전달
	public int modifyMailFile(); // 첨부파일 저장
	
	public int registerAddress(); // 주소록 추가
	public int modifyAddress(); // 주소록 수정
	public int removeAddress(); // 주소록 삭제
}
