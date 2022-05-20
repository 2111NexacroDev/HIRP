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
	public int sendBugReportRecipient(SqlSession sqlSession, Recipient recipient) {
		int result = sqlSession.insert("MailMapper.sendBugReportRecipient", recipient);
		return result;
	}

	@Override
	public Mail selectOneByNo(SqlSession sqlSession, int mailNo) {
		Mail mail = sqlSession.selectOne("MailMapper.selectOneByNo", mailNo);
		return mail;
	}
	
	@Override
	public Recipient selectOneByNoMailRec(SqlSession sqlSession, int mailNo) {
		Recipient recipient = sqlSession.selectOne("MailMapper.selectOneByNoMailRec", mailNo);
		return recipient;
	}
	
	@Override
	public Referrer selectOneByNoMailRef(SqlSession sqlSession, int mailNo) {
		Referrer referrer = sqlSession.selectOne("MailMapper.selectOneByNoMailRef", mailNo);
		return referrer;
	}
	
	@Override
	public MailFile selectOneByNoMailFile(SqlSession sqlSession, int mailNo) {
		MailFile mailFile = sqlSession.selectOne("MailMapper.selectOneByNoMailFile", mailNo);
		return mailFile;
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

	@Override
	public List<Mail> selectRecMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectRecMail", mail, rowBounds);
		return mList;
	}

	@Override
	public List<Mail> selectSendMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectSendMail", mail, rowBounds);
		return mList;
	}

	@Override
	public List<Mail> selectTemMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectTemMail", mail, rowBounds);
		return mList;
	}

	@Override
	public List<Mail> selectMyMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectMyMail", mail, rowBounds);
		return mList;
	}

	@Override
	public List<Mail> selectImpMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectImpMail", mail, rowBounds);
		return mList;
	}

	@Override
	public List<Mail> selectWasMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectWasMail", mail, rowBounds);
		return mList;
	}

	@Override
	public int selectMailCountR(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountR", mail);
		return totalCount;
	}

	@Override
	public int selectMailCountS(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountS", mail);
		return totalCount;
	}

	@Override
	public int selectMailCountT(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountT", mail);
		return totalCount;
	}

	@Override
	public int selectMailCountM(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountM", mail);
		return totalCount;
	}

	@Override
	public int selectMailCountI(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountI", mail);
		return totalCount;
	}

	@Override
	public int selectMailCountW(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountW", mail);
		return totalCount;
	}

}
