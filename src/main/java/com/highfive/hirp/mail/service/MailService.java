package com.highfive.hirp.mail.service;

import java.util.List;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;

public interface MailService {

	public int getListCount();
	public int sendMail(Mail mail); // 메일 보내기
	public List<Mail> selectReceivedMail(PageInfo pi); // 받은메일함 조회
	public int selectOneReceivedMail(int mailNo); // 받은메일함 상세조회
	public List<Mail> selectSentMail(); // 보낸메일함 조회
	public int selectOneSentMail(int mailNo); // 보낸메일함 상세조회
	public List<Mail> selectTemporaryMail(); // 임시보관함 조회
	public int selectOneTemporaryMail(int mailNo); // 임시보관함 상세조회
	public List<Mail> selectMyMail(); // 내게쓴메일함 조회
	public int selectOneMyMail(int mailNo); // 내게쓴메일함 상세조회
	public List<Mail> selectImportantMail(); // 중요메일함 조회
	public int selectOneImportantMail(int mailNo); // 중요메일함 상세조회
	public List<Mail> selectWasteBasketMail(); // 휴지통 조회
	public int selectOneWasteBasketMail(int mailNo); // 휴지통 상세조회
	
	public int doSendBugReport(Mail mail); // 버그리포트 전송
	
	public List<Mail> searchMail(Mail mail); // 메일 검색
	
	public int modifyMail(int mailNo, Mail mail); // 임시저장된 메일 수정
	public int replyMail(Mail mail); // 답장
	public int relayMail(Mail mail); // 전달
	
	public int modifyMailFile(MailFile mailFile); // 첨부파일 저장
	
	public int restoreMail(int mailNo); // 휴지통 메일 복구
	public int removeMail(Mail mail); // 휴지통 비우기
	
	public int registerAddress(Address address); // 주소록 추가
	public int removeAddress(Address address); // 주소록 삭제
}
