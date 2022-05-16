package com.highfive.hirp.mail.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
import com.highfive.hirp.mail.domain.Recipient;
import com.highfive.hirp.mail.domain.Referrer;
import com.highfive.hirp.mail.service.MailService;
import com.highfive.hirp.mail.store.MailStore;
@Service
public class MailServiceImpl implements MailService{
	
	@Autowired
	private MailStore mStore;
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public int sendMail(Mail mail) {
		int result = mStore.sendMail(sqlSession, mail);
		return result;
	}
	
	@Override
	public int sendMailRecipient(Recipient recipient) {
		int result = mStore.sendMailRecipient(sqlSession, recipient);
		return result;
	}
	
	@Override
	public int sendMailReferrer(Referrer referrer) {
		int result = mStore.sendMailReferrer(sqlSession, referrer);
		return result;
	}
	
	@Override
	public int saveFile(MailFile mailFile) {
		int result = mStore.saveFile(sqlSession, mailFile);
		return result;
	}
	
	@Override
	public Mail printOneByNo(int mailNo) {
		Mail mail = mStore.selectOneByNo(sqlSession, mailNo);
		return mail;
	}
	
	@Override
	public int selectOneSentMail(int mailNo) {
		int result = mStore.selectOneSentMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public int selectOneTemporaryMail(int mailNo) {
		int result = mStore.selectOneTemporaryMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public int selectOneMyMail(int mailNo) {
		int result = mStore.selectOneMyMail(sqlSession, mailNo);
		return result;
	}
	
	@Override
	public int selectOneImportantMail(int mailNo) {
		int result = mStore.selectOneImportantMail(sqlSession, mailNo);
		return result;
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

	@Override
	public List<Mail> printMailRec(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectRecMail(sqlSession, mail, pi);
		return mList;
	}

	@Override
	public List<Mail> printMailSend(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectSendMail(sqlSession, mail, pi);
		return mList;
	}

	@Override
	public List<Mail> printMailTem(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectTemMail(sqlSession, mail, pi);
		return mList;
	}

	@Override
	public List<Mail> printMailMy(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectMyMail(sqlSession, mail, pi);
		return mList;
	}

	@Override
	public List<Mail> printMailImp(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectImpMail(sqlSession, mail, pi);
		return mList;
	}

	@Override
	public List<Mail> printMailWas(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectWasMail(sqlSession, mail, pi);
		return mList;
	}

	@Override
	public int getMailCountR(Mail mail) {
		int totalCount = mStore.selectMailCountR(sqlSession, mail);
		return totalCount;
	}

	@Override
	public int getMailCountS(Mail mail) {
		int totalCount = mStore.selectMailCountS(sqlSession, mail);
		return totalCount;
	}

	@Override
	public int getMailCountT(Mail mail) {
		int totalCount = mStore.selectMailCountT(sqlSession, mail);
		return totalCount;
	}

	@Override
	public int getMailCountM(Mail mail) {
		int totalCount = mStore.selectMailCountM(sqlSession, mail);
		return totalCount;
	}

	@Override
	public int getMailCountI(Mail mail) {
		int totalCount = mStore.selectMailCountI(sqlSession, mail);
		return totalCount;
	}

	@Override
	public int getMailCountW(Mail mail) {
		int totalCount = mStore.selectMailCountW(sqlSession, mail);
		return totalCount;
	}

}
