package com.highfive.hirp.mail.service;

import java.util.List;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
import com.highfive.hirp.mail.domain.Recipient;
import com.highfive.hirp.mail.domain.Referrer;

public interface MailService {

	public int sendMail(Mail mail); // 메일 전송
	public int sendMailRecipient(Recipient recipient); // 메일 받는사람 저장
	public int sendMailReferrer(Referrer referrer); // 메일 참조 저장
	public int saveFile(MailFile mailFile); // 첨부파일 저장
	public int modifyMailFile(MailFile mailFile); // 첨부파일 저장
	
	public List<Mail> printMailRec(Mail mail, PageInfo pi); // 받은메일함 목록
	public List<Mail> printMailSend(Mail mail, PageInfo pi); // 보낸메일함 목록
	public List<Mail> printMailTem(Mail mail, PageInfo pi); // 임시보관함 목록
	public List<Mail> printMailMy(Mail mail, PageInfo pi); // 내게쓴메일함 목록
	public List<Mail> printMailImp(Mail mail, PageInfo pi); // 중요메일함 목록
	public List<Mail> printMailWas(Mail mail, PageInfo pi); // 휴지통 목록
	
	public Mail printOneByNo(int mailNo); // 메일함 상세조회
	public int selectOneSentMail(int mailNo); // 보낸메일함 상세조회
	public int selectOneTemporaryMail(int mailNo); // 임시보관함 상세조회
	public int selectOneMyMail(int mailNo); // 내게쓴메일함 상세조회
	public int selectOneImportantMail(int mailNo); // 중요메일함 상세조회
	public int selectOneWasteBasketMail(int mailNo); // 휴지통 상세조회
	
	public int doSendBugReport(Mail mail); // 버그리포트 전송
	
	public List<Mail> searchMail(Mail mail); // 메일 검색
	
	public int modifyMail(int mailNo, Mail mail); // 임시저장된 메일 수정
	public int replyMail(Mail mail); // 답장
	public int relayMail(Mail mail); // 전달
	
	
	public int restoreMail(int mailNo); // 휴지통 메일 복구
	public int removeMail(Mail mail); // 휴지통 비우기
	
	public int registerAddress(Address address); // 주소록 추가
	public int removeAddress(Address address); // 주소록 삭제
	
	public int getMailCountR(Mail mail); // 받은메일함 페이징
	public int getMailCountS(Mail mail); // 보낸메일함 페이징
	public int getMailCountT(Mail mail); // 임시보관함 페이징
	public int getMailCountM(Mail mail); // 내게쓴메일함 페이징
	public int getMailCountI(Mail mail); // 중요메일함 페이징
	public int getMailCountW(Mail mail); // 휴지통 페이징
	
}
