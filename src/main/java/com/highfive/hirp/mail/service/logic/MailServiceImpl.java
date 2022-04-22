package com.highfive.hirp.mail.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	// 메일 전체조회
	@Override
	public List<Mail> selectAll() {
		List<Mail> mList = mStore.selectAllMail(sqlSession);
		return mList;
	}
	
	// 메일 저장
	@Override
	public int sendMail(Mail mail) {
		int result = mStore.insertMail(sqlSession, mail);
		return result;
	}
	
	// 메일 삭제
	@Override
	public int removeMail(Mail mail) {
		int result = mStore.deleteMail(sqlSession, mail);
		return result;
	}
	
	// 답장
	@Override
	public int replyMail(Mail mail) {
		int result = mStore.insertReplyMail(sqlSession, mail);
		return result;
	}
	
	// 전달
	@Override
	public int relayMail(Mail mail) {
		int result = mStore.insertrelayMail(sqlSession, mail);
		return result;
	}
	
	// 첨부파일 저장
	@Override
	public int modifyMailFile(MailFile mailFile) {
		int result = mStore.insertMailFile(sqlSession, mailFile);
		return result;
	}
	
	// 주소록 추가
	@Override
	public int registerAddress(Address address) {
		int result = mStore.insertAddress(sqlSession, address);
		return result;
	}
	
	// 주소록 수정
	@Override
	public int modifyAddress(Address address) {
		int result = mStore.updateAddress(sqlSession, address);
		return result;
	}
	
	// 주소록 삭제
	@Override
	public int removeAddress(Address address) {
		int result = mStore.deleteAddress(sqlSession, address);
		return result;
	}
	
}
