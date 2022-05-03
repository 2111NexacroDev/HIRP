package com.highfive.hirp.mail.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
import com.highfive.hirp.mail.service.MailService;
import com.highfive.hirp.mail.store.MailStore;
@Service
public class MailServiceImpl implements MailService{
	
	@Autowired
	private MailStore mStore;
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public int getListCount() {
		int result = mStore.selectListCount(sqlSession);
		return result;
	}
	
	@Override
	public int sendMail(Mail mail) {
		int result = mStore.sendMail(sqlSession, mail);
		return result;
	}
	
	@Override
	public List<Mail> selectReceivedMail(PageInfo pi) {
		List<Mail> mList = mStore.selectReceivedMail(sqlSession, pi);
		return mList;
	}
	
	@Override
	public int selectOneReceivedMail(int mailNo) {
		int result = mStore.selectOneReceivedMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public List<Mail> selectSentMail() {
		List<Mail> mList = mStore.selectSentMail(sqlSession);
		return mList;
	}
	
	@Override
	public int selectOneSentMail(int mailNo) {
		int result = mStore.selectOneSentMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public List<Mail> selectTemporaryMail() {
		List<Mail> mList = mStore.selectTemporaryMail(sqlSession);
		return mList;
	}
	
	@Override
	public int selectOneTemporaryMail(int mailNo) {
		int result = mStore.selectOneTemporaryMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public List<Mail> selectMyMail() {
		List<Mail> mList = mStore.selectMyMail(sqlSession);
		return mList;
	}
	
	@Override
	public int selectOneMyMail(int mailNo) {
		int result = mStore.selectOneMyMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public List<Mail> selectImportantMail() {
		List<Mail> mList = mStore.selectImportantMail(sqlSession);
		return mList;
	}
	
	@Override
	public int selectOneImportantMail(int mailNo) {
		int result = mStore.selectOneImportantMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public List<Mail> selectWasteBasketMail() {
		List<Mail> mList = mStore.selectWasteBasketMail(sqlSession);
		return mList;
	}
	
	@Override
	public int selectOneWasteBasketMail(int mailNo) {
		int result = mStore.selectOneWasteBasketMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public int doSendBugReport(Mail mail) {
		int result = mStore.doSendBugReport(sqlSession, mail);
		return result;
	}
	
	@Override
	public List<Mail> searchMail(Mail mail) {
		List<Mail> mList = mStore.searchMail(sqlSession, mail);
		return mList;
	}
	
	@Override
	public int modifyMail(int mailNo, Mail mail) {
		int result = mStore.modifyMail(sqlSession, mailNo, mail);
		return result;
	}
	
	@Override
	public int replyMail(Mail mail) {
		int result = mStore.replyMail(sqlSession, mail);
		return result;
	}
	
	@Override
	public int relayMail(Mail mail) {
		int result = mStore.relayMail(sqlSession, mail);
		return result;
	}
	
	@Override
	public int modifyMailFile(MailFile mailFile) {
		int result = mStore.modifyMailFile(sqlSession, mailFile);
		return result;
	}
	
	@Override
	public int restoreMail(int mailNo) {
		int result = mStore.restoreMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public int removeMail(Mail mail) {
		int result = mStore.removeMail(sqlSession, mail);
		return result;
	}
	
	@Override
	public int registerAddress(Address address) {
		int result = mStore.registerAddress(sqlSession, address);
		return result;
	}
	
	@Override
	public int removeAddress(Address address) {
		int result = mStore.removeAddress(sqlSession, address);
		return result;
	}

}
