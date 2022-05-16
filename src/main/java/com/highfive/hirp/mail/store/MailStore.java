package com.highfive.hirp.mail.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
import com.highfive.hirp.mail.domain.Recipient;
import com.highfive.hirp.mail.domain.Referrer;

public interface MailStore {

	int sendMail(SqlSession sqlSession, Mail mail);
	int sendMailRecipient(SqlSession sqlSession, Recipient recipient);
	int sendMailReferrer(SqlSession sqlSession, Referrer referrer);
	int saveFile(SqlSession sqlSession, MailFile mailFile);
	int modifyMailFile(SqlSession sqlSession, MailFile mailFile);
	
	List<Mail> selectRecMail(SqlSession sqlSession, Mail mail, PageInfo pi);
	List<Mail> selectSendMail(SqlSession sqlSession, Mail mail, PageInfo pi);
	List<Mail> selectTemMail(SqlSession sqlSession, Mail mail, PageInfo pi);
	List<Mail> selectMyMail(SqlSession sqlSession, Mail mail, PageInfo pi);
	List<Mail> selectImpMail(SqlSession sqlSession, Mail mail, PageInfo pi);
	List<Mail> selectWasMail(SqlSession sqlSession, Mail mail, PageInfo pi);
	
	Mail selectOneByNo(SqlSession sqlSession, int mailNo);
	int selectOneSentMail(SqlSession sqlSession, int mailNo);
	int selectOneTemporaryMail(SqlSession sqlSession, int mailNo);
	int selectOneMyMail(SqlSession sqlSession, int mailNo);
	int selectOneImportantMail(SqlSession sqlSession, int mailNo);
	int selectOneWasteBasketMail(SqlSession sqlSession, int mailNo);
	
	int doSendBugReport(SqlSession sqlSession, Mail mail);
	
	List<Mail> searchMail(SqlSession sqlSession, Mail mail);
	int modifyMail(SqlSession sqlSession, int mailNo, Mail mail);
	int replyMail(SqlSession sqlSession, Mail mail);
	int relayMail(SqlSession sqlSession, Mail mail);
	int restoreMail(SqlSession sqlSession, int mailNo);
	int removeMail(SqlSession sqlSession, Mail mail);
	int registerAddress(SqlSession sqlSession, Address address);
	int removeAddress(SqlSession sqlSession, Address address);
	
	int selectMailCountR(SqlSession sqlSession, Mail mail);
	int selectMailCountS(SqlSession sqlSession, Mail mail);
	int selectMailCountT(SqlSession sqlSession, Mail mail);
	int selectMailCountM(SqlSession sqlSession, Mail mail);
	int selectMailCountI(SqlSession sqlSession, Mail mail);
	int selectMailCountW(SqlSession sqlSession, Mail mail);

}
