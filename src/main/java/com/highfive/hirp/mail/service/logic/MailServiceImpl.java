package com.highfive.hirp.mail.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.mail.domain.Mail;
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
	public int sendMail() {
		int result = mStore.insertMail(sqlSession);
		return result;
	}
	
	// 메일 삭제
	@Override
	public int removeMail() {
		int result = mStore.deleteMail(sqlSession);
		return result;
	}
	
	// 답장
	@Override
	public int replyMail() {
		int result = mStore.insertReplyMail(sqlSession);
		return result;
	}
	
	// 전달
	@Override
	public int relayMail() {
		int result = mStore.insertrelayMail(sqlSession);
		return result;
	}
	
	// 첨부파일 저장
	@Override
	public int modifyMailFile() {
		int result = mStore.insertMailFile(sqlSession);
		return result;
	}
	
	// 주소록 추가
	@Override
	public int registerAddress() {
		int result = mStore.insertAddress(sqlSession);
		return result;
	}
	
	// 주소록 수정
	@Override
	public int modifyAddress() {
		int result = mStore.updateAddress(sqlSession);
		return result;
	}
	
	// 주소록 삭제
	@Override
	public int removeAddress() {
		int result = mStore.deleteAddress(sqlSession);
		return result;
	}
	
}
