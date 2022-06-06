package com.highfive.hirp.mail.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
import com.highfive.hirp.mail.service.MailService;
import com.highfive.hirp.mail.store.MailStore;
@Service
public class MailServiceImpl implements MailService {
	@Autowired
	private MailStore mStore;
	@Autowired
	private SqlSession sqlSession;
	
	// 메일 보낸사람 DB
	@Override
	public int sendMail(Mail mail) {
		int result = mStore.sendMail(sqlSession, mail);
		return result;
	}
	
	// 메일 수신자 DB
	@Override
	public int sendMailRecipient(Mail mail) {
		int result = mStore.sendMailRecipient(sqlSession, mail);
		return result;
	}
	
	// 메일 참조자 DB
	@Override
	public int sendMailReferrer(Mail mail) {
		int result = mStore.sendMailReferrer(sqlSession, mail);
		return result;
	}
	
	// 메일 첨부파일 저장
	@Override
	public int saveFile(MailFile mailFile) {
		int result = mStore.saveFile(sqlSession, mailFile);
		return result;
	}
	
	// 첨부파일 수정
	@Override
	public int modifyMailFile(MailFile mailFile) {
		int result = mStore.modifyMailFile(sqlSession, mailFile);
		return result;
	}
	
	// 임시저장(보낸사람)
	@Override
	public int teporaryStorageMail(Mail mail) {
		int result = mStore.teporaryStorageMail(sqlSession, mail);
		return result;
	}
	
	// 임시저장된 메일 수정
	@Override
	public int updateTemporaryStorage(Mail mail) {
		int result = mStore.updateTemporaryStorage(sqlSession, mail);
		return result;
	}
	
	// 버그리포트 전송 (수신자 DB)
	@Override
	public int sendBugReportRecipient(Mail mail) {
		int result = mStore.sendBugReportRecipient(sqlSession, mail);
		return result;
	}
	
	// 메일 상세조회
	@Override
	public Mail printOneByNo(int mailNo) {
		Mail mail = mStore.selectOneByNo(sqlSession, mailNo);
		return mail;
	}
	
	// 첨부파일 조회
	@Override
	public MailFile printOneByNoMailFile(int mailNo) {
		MailFile mailFile = mStore.selectOneByNoMailFile(sqlSession, mailNo);
		return mailFile;
	}
	
	// 메일 검색
	@Override
	public List<Mail> searchMail(Search search) {
		List<Mail> mList = mStore.searchMail(sqlSession, search);
		return mList;
	}
	
	// 답장
	@Override
	public int replyMail(Mail mail) {
		int result = mStore.replyMail(sqlSession, mail);
		return result;
	}
	
	// 전달
	@Override
	public int relayMail(Mail mail) {
		int result = mStore.relayMail(sqlSession, mail);
		return result;
	}
	
	// 메일 휴지통 이동
	@Override
	public int wasteMail(int mailNo) {
		int result = mStore.wasteMail(sqlSession, mailNo);
		return result;
	}
	
	// 휴지통 메일 복구
	@Override
	public int restoreMail(int mailNo) {
		int result = mStore.restoreMail(sqlSession, mailNo);
		return result;
	}
	
	// 휴지통 메일 삭제
	@Override
	public int deleteAllMail() {
		int result = mStore.deleteAllMail(sqlSession);
		return result;
	}
	
	// 휴지통 선택 메일 삭제
	@Override
	public int deleteSelectMail(int mailNo) {
		int result = mStore.deleteSelectMail(sqlSession, mailNo);
		return result;
	}
	
	// 중요 메일
	@Override
	public int impMail(Mail mail) {
		int result = mStore.impMail(sqlSession, mail);
		return result;
	}
	
	// 메일 읽음표시
	@Override
	public int readMail(Mail mail) {
		int result = mStore.readMail(sqlSession, mail);
		return result;
	}
	
	// 받은메일함 목록
	@Override
	public List<Mail> printMailRec(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectRecMail(sqlSession, mail, pi);
		return mList;
	}

	// 보낸메일함 목록
	@Override
	public List<Mail> printMailSend(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectSendMail(sqlSession, mail, pi);
		return mList;
	}

	// 임시보관함 목록
	@Override
	public List<Mail> printMailTem(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectTemMail(sqlSession, mail, pi);
		return mList;
	}

	//내게쓴메일함 목록
	@Override
	public List<Mail> printMailMy(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectMyMail(sqlSession, mail, pi);
		return mList;
	}

	// 중요메일함 목록
	@Override
	public List<Mail> printMailImp(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectImpMail(sqlSession, mail, pi);
		return mList;
	}

	// 휴지통 목록
	@Override
	public List<Mail> printMailWas(Mail mail, PageInfo pi) {
		List<Mail> mList = mStore.selectWasMail(sqlSession, mail, pi);
		return mList;
	}

	// 받은메일함 갯수
	@Override
	public int getMailCountR(Mail mail) {
		int totalCount = mStore.selectMailCountR(sqlSession, mail);
		return totalCount;
	}

	// 보낸메일함 갯수
	@Override
	public int getMailCountS(Mail mail) {
		int totalCount = mStore.selectMailCountS(sqlSession, mail);
		return totalCount;
	}

	// 임시보관함 갯수
	@Override
	public int getMailCountT(Mail mail) {
		int totalCount = mStore.selectMailCountT(sqlSession, mail);
		return totalCount;
	}

	// 내게쓴메일함 갯수
	@Override
	public int getMailCountM(Mail mail) {
		int totalCount = mStore.selectMailCountM(sqlSession, mail);
		return totalCount;
	}

	// 중요메일함 갯수
	@Override
	public int getMailCountI(Mail mail) {
		int totalCount = mStore.selectMailCountI(sqlSession, mail);
		return totalCount;
	}

	// 휴지통 갯수
	@Override
	public int getMailCountW(Mail mail) {
		int totalCount = mStore.selectMailCountW(sqlSession, mail);
		return totalCount;
	}

}
