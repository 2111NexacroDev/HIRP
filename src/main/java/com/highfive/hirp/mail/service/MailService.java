package com.highfive.hirp.mail.service;

import java.util.List;

import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;

public interface MailService {

	public List<Mail> selectAll(); // 메일 전체 조회
	public int sendMail(Mail mail); // 메일 보내기
	
	public int removeMail(Mail mail); // 휴지통 비우기
	
	public int replyMail(Mail mail); // 답장
	public int relayMail(Mail mail); // 전달
	public int modifyMailFile(MailFile mailFile); // 첨부파일 저장
	
	public int registerAddress(Address address); // 주소록 추가
	public int modifyAddress(Address address); // 주소록 수정
	public int removeAddress(Address address); // 주소록 삭제
}
