package com.highfive.hirp.mail.store.logic;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;
import com.highfive.hirp.mail.store.MailStore;
@Repository
public class MailStoreLogic implements MailStore{

	@Override
	public int sendMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.insert("MailMapper.sendMail", mail);
		return result;
	}
	
	@Override
	public int sendMailRecipient(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.insert("MailMapper.sendMailRecipient", mail);
		return result;
	}
	
	@Override
	public int sendMailReferrer(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.insert("MailMapper.sendMailReferrer", mail);
		return result;
	}
	
	// 첨부파일 저장
	@Override
	public int saveFile(SqlSession sqlSession, MailFile mailFile) {
		int result = sqlSession.insert("MailMapper.saveFile", mailFile);
		return result;
	}
	
	// 임시저장(보낸사람)
	@Override
	public int teporaryStorageMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.insert("MailMapper.teporaryStorageMail", mail);
		return result;
	}
	
	// 임시저장된 메일 수정
	@Override
	public int updateTemporaryStorage(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.update("MailMapper.updateTemporaryStorage", mail);
		return result;
	}
	
	// 버그리포트 수신자
	@Override
	public int sendBugReportRecipient(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.insert("MailMapper.sendBugReportRecipient", mail);
		return result;
	}
	
	// 메일 상세조회
	@Override
	public Mail selectOneByNo(SqlSession sqlSession, int mailNo) {
		Mail mail = sqlSession.selectOne("MailMapper.selectOneByNo", mailNo);
		return mail;
	}
	
	// 첨부파일 조회
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
	
	// 메일 휴지통으로 이동
	@Override
	public int wasteMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.update("MailMapper.wasteMail", mailNo);
		return result;
	}

	// 휴지통 메일 복구
	@Override
	public int restoreMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.update("MailMapper.restoreMail", mailNo);
		return result;
	}
	
	// 휴지통 메일 전체 삭제
	@Override
	public int deleteAllMail(SqlSession sqlSession) {
		int result = sqlSession.delete("MailMapper.deleteAllMail");
		return result;
	}
	
	// 휴지통 선택 메일 삭제
	@Override
	public int deleteSelectMail(SqlSession sqlSession, int mailNo) {
		int result = sqlSession.delete("MailMapper.deleteSelectMail", mailNo);
		return result;
	}

	@Override
	public int removeMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.delete("MailMapper.removeMail", mail);
		return result;
	}
	
	// 중요 메일
	@Override
	public int impMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.update("MailMapper.updateImpMail", mail);
		return result;
	}
	
	// 메일 읽음표시
	@Override
	public int readMail(SqlSession sqlSession, Mail mail) {
		int result = sqlSession.update("MailMapper.readMail", mail);
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

	// 받은메일함 조회
	@Override
	public List<Mail> selectRecMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectRecMail", mail, rowBounds);
		return mList;
	}

	// 보낸메일함 조회
	@Override
	public List<Mail> selectSendMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectSendMail", mail, rowBounds);
		return mList;
	}

	// 임시보관함 조회
	@Override
	public List<Mail> selectTemMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectTemMail", mail, rowBounds);
		return mList;
	}

	// 내게쓴메일함 조회
	@Override
	public List<Mail> selectMyMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectMyMail", mail, rowBounds);
		return mList;
	}

	// 중요메일함 조회
	@Override
	public List<Mail> selectImpMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectImpMail", mail, rowBounds);
		return mList;
	}

	// 휴지통 조회
	@Override
	public List<Mail> selectWasMail(SqlSession sqlSession, Mail mail, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Mail> mList = sqlSession.selectList("MailMapper.selectWasMail", mail, rowBounds);
		return mList;
	}

	// 받은메일함 갯수
	@Override
	public int selectMailCountR(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountR", mail);
		return totalCount;
	}

	// 보낸메일함 갯수
	@Override
	public int selectMailCountS(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountS", mail);
		return totalCount;
	}

	// 임시보관함 갯수
	@Override
	public int selectMailCountT(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountT", mail);
		return totalCount;
	}

	// 내게쓴메일함 갯수
	@Override
	public int selectMailCountM(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountM", mail);
		return totalCount;
	}

	// 중요메일함 갯수
	@Override
	public int selectMailCountI(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountI", mail);
		return totalCount;
	}

	// 휴지통 갯수
	@Override
	public int selectMailCountW(SqlSession sqlSession, Mail mail) {
		int totalCount = sqlSession.selectOne("MailMapper.selectMailCountW", mail);
		return totalCount;
	}

}
