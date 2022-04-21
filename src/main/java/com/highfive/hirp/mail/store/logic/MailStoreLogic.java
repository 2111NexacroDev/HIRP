package com.highfive.hirp.mail.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.store.MailStore;
@Repository
public class MailStoreLogic implements MailStore{

	@Override
	public List<Mail> selectAllMail(SqlSession sqlSession) {
		List<Mail> mList = sqlSession.selectList("");
		return mList;
	}

	@Override
	public int insertMail(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int deleteMail(SqlSession sqlSession) {
		int result = sqlSession.delete("");
		return result;
	}

	@Override
	public int insertReplyMail(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int insertrelayMail(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int insertMailFile(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int insertAddress(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int updateAddress(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int deleteAddress(SqlSession sqlSession) {
		int result = sqlSession.delete("");
		return result;
	}

}
