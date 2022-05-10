package com.highfive.hirp.mail.store.logic;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
import com.highfive.hirp.mail.domain.Recipient;
import com.highfive.hirp.mail.domain.Referrer;
import com.highfive.hirp.mail.store.MailStore;
@Repository
public class MailStoreLogic implements MailStore{

	@Override
	public int selectListCount(SqlSession sqlSession) {
		int totalCount = sqlSession.selectOne("MailMapper.selectListCount");
		return totalCount;
	}
	
	@Override
	public int sendMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.insert("MailMapper.sendMail", mail);
		return result;
	}
	
	@Override
	public int sendMailRecipient(SqlSession sqlSession, Recipient recipient) {
		int result = sqlSession.insert("MailMapper.sendMailRecipient", recipient);
		return result;
	}
	
	@Override
	public int sendMailReferrer(SqlSession sqlSession, Referrer referrer) {
		int result = sqlSession.insert("MailMapper.sendMailReferrer", referrer);
		return result;
	}
	
	@Override
	public int saveFile(SqlSession sqlSession, MailFile mailFile) {
		int result = sqlSession.insert("MailMapper.saveFile", mailFile);
		return result;
	}

	@Override
	public List<Mail> selectReceivedMail(SqlSession sqlSession, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectReceivedMail", pi, rowBounds);
		return mList;
	}

	@Override
	public Mail selectOneByNo(SqlSession sqlSession, int mailNo) {
		Mail mail = sqlSession.selectOne("MailMapper.selectOneByNo", mailNo);
		return mail;
	}

	@Override
	public List<Mail> selectSentMail(SqlSession sqlSession) {
		List<Mail> mList = sqlSession.selectList("MailMapper.selectSentMail");
		return mList;
	}

	@Override
	public int selectOneSentMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.selectOne("MailMapper.selectOneSentMail", mailNo);
		return result;
	}

	@Override
	public List<Mail> selectTemporaryMail(SqlSession sqlSession) {
		List<Mail> mList = sqlSession.selectList("MailMapper.selectTemporaryMail");
		return mList;
	}

	@Override
	public int selectOneTemporaryMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.selectOne("MailMapper.selectOneTemporaryMail", mailNo);
		return result;
	}

	@Override
	public List<Mail> selectMyMail(SqlSession sqlSession) {
		List<Mail> mList = sqlSession.selectList("MailMapper.selectMyMail");
		return mList;
	}

	@Override
	public int selectOneMyMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.selectOne("MailMapper.selectOneMyMail", mailNo);
		return result;
	}

	@Override
	public List<Mail> selectImportantMail(SqlSession sqlSession) {
		List<Mail> mList = sqlSession.selectList("MailMapper.selectImportantMail");
		return mList;
	}

	@Override
	public int selectOneImportantMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.selectOne("MailMapper.selectOneImportantMail", mailNo);
		return result;
	}

	@Override
	public List<Mail> selectWasteBasketMail(SqlSession sqlSession) {
		List<Mail> mList = sqlSession.selectList("MailMapper.selectWasteBasketMail");
		return mList;
	}

	@Override
	public int selectOneWasteBasketMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.selectOne("MailMapper.selectOneWasteBasketMail", mailNo);
		return result;
	}

	@Override
	public int doSendBugReport(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.insert("MailMapper.doSendBugReport", mail);
		return result;
	}

	@Override
	public List<Mail> searchMail(SqlSession sqlSession, Mail mail) {
		List<Mail> mList = sqlSession.selectList("MailMapper.searchMail", mail);
		return mList;
	}

	@Override
	public int modifyMail(SqlSession sqlSession, int mailNo, Mail mail) {
		int result = sqlSession.update("MailMapper.modifyMail", mailNo);
		return result;
	}

	@Override
	public int replyMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.update("MailMapper.replyMail", mail);
		return result;
	}

	@Override
	public int relayMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.update("MailMapper.relayMail", mail);
		return result;
	}

	@Override
	public int modifyMailFile(SqlSession sqlSession, MailFile mailFile) {
		int result = sqlSession.insert("MailMapper.modifyMailFile", mailFile);
		return result;
	}

	@Override
	public int restoreMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.update("MailMapper.restoreMail", mailNo);
		return result;
	}

	@Override
	public int removeMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.delete("MailMapper.removeMail", mail);
		return result;
	}

	@Override
	public int registerAddress(SqlSession sqlSession, Address address) {
		int result = sqlSession.insert("MailMapper.registerAddress", address);
		return result;
	}

	@Override
	public int removeAddress(SqlSession sqlSession, Address address) {
		int result = sqlSession.delete("MailMapper.removeAddress", address);
		return result;
	}

}
