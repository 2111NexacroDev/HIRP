package com.highfive.hirp.mail.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;

public interface MailStore {

	int sendMail(SqlSession sqlSession, Mail mail); // 보낸사람
	int sendMailRecipient(SqlSession sqlSession, Mail mail); // 수신자
	int sendMailReferrer(SqlSession sqlSession, Mail mail); // 참조자
	int saveFile(SqlSession sqlSession, MailFile mailFile); // 메일 첨부파일
	int modifyMailFile(SqlSession sqlSession, MailFile mailFile); // 첨부파일 수정
	
	int sendBugReportRecipient(SqlSession sqlSession, Mail mail); // 버그리포트 수신자
	
	List<Mail> selectRecMail(SqlSession sqlSession, Mail mail, PageInfo pi); // 받은메일함 조회
	List<Mail> selectSendMail(SqlSession sqlSession, Mail mail, PageInfo pi); // 보낸메일함 조회
	List<Mail> selectTemMail(SqlSession sqlSession, Mail mail, PageInfo pi); // 임시보관함 조회
	List<Mail> selectMyMail(SqlSession sqlSession, Mail mail, PageInfo pi); // 내게쓴메일함 조회
	List<Mail> selectImpMail(SqlSession sqlSession, Mail mail, PageInfo pi); // 중요메일함 조회
	List<Mail> selectWasMail(SqlSession sqlSession, Mail mail, PageInfo pi); // 휴지통 조회
	
	Mail selectOneByNo(SqlSession sqlSession, int mailNo); // 메일 상세조회
	MailFile selectOneByNoMailFile(SqlSession sqlSession, int mailNo); // 첨부파일 조회
	
	int wasteMail(SqlSession sqlSession, int mailNo); // 메일 휴지통으로 이동
	int restoreMail(SqlSession sqlSession, int mailNo); // 휴지통 메일 복구
	int deleteAllMail(SqlSession sqlSession); // 휴지통 메일 전체 삭제
	
	int impMail(SqlSession sqlSession, Mail mail); // 중요 메일
	
	List<Mail> searchMail(SqlSession sqlSession, Mail mail);
	int modifyMail(SqlSession sqlSession, int mailNo, Mail mail);
	int replyMail(SqlSession sqlSession, Mail mail);
	int relayMail(SqlSession sqlSession, Mail mail);
	int removeMail(SqlSession sqlSession, Mail mail);
	int registerAddress(SqlSession sqlSession, Address address);
	int removeAddress(SqlSession sqlSession, Address address);
	
	int selectMailCountR(SqlSession sqlSession, Mail mail); // 받은메일함 갯수
	int selectMailCountS(SqlSession sqlSession, Mail mail); // 보낸메일함 갯수
	int selectMailCountT(SqlSession sqlSession, Mail mail); // 임시보관함 갯수
	int selectMailCountM(SqlSession sqlSession, Mail mail); // 내게쓴메일함 갯수
	int selectMailCountI(SqlSession sqlSession, Mail mail); // 중요메일함 갯수
	int selectMailCountW(SqlSession sqlSession, Mail mail); // 휴지통 갯수

}
