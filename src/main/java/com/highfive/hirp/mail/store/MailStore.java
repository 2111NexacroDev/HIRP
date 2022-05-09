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

	int selectListCount(SqlSession sqlSession);
	int sendMail(SqlSession sqlSession, Mail mail);
	int sendMailRecipient(SqlSession sqlSession, Recipient recipient);
	int sendMailReferrer(SqlSession sqlSession, Referrer referrer);
	int saveFile(SqlSession sqlSession, MailFile mailFile);
	List<Mail> selectReceivedMail(SqlSession sqlSession, PageInfo pi);
	Mail selectOneByNo(SqlSession sqlSession, int mailNo);
	List<Mail> selectSentMail(SqlSession sqlSession);
	int selectOneSentMail(SqlSession sqlSession, int mailNo);
	List<Mail> selectTemporaryMail(SqlSession sqlSession);
	int selectOneTemporaryMail(SqlSession sqlSession, int mailNo);
	List<Mail> selectMyMail(SqlSession sqlSession);
	int selectOneMyMail(SqlSession sqlSession, int mailNo);
	List<Mail> selectImportantMail(SqlSession sqlSession);
	int selectOneImportantMail(SqlSession sqlSession, int mailNo);
	List<Mail> selectWasteBasketMail(SqlSession sqlSession);
	int selectOneWasteBasketMail(SqlSession sqlSession, int mailNo);
	int doSendBugReport(SqlSession sqlSession, Mail mail);
	List<Mail> searchMail(SqlSession sqlSession, Mail mail);
	int modifyMail(SqlSession sqlSession, int mailNo, Mail mail);
	int replyMail(SqlSession sqlSession, Mail mail);
	int relayMail(SqlSession sqlSession, Mail mail);
	int modifyMailFile(SqlSession sqlSession, MailFile mailFile);
	int restoreMail(SqlSession sqlSession, int mailNo);
	int removeMail(SqlSession sqlSession, Mail mail);
	int registerAddress(SqlSession sqlSession, Address address);
	int removeAddress(SqlSession sqlSession, Address address);

}
