package com.highfive.hirp.mail.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.mail.domain.Mail;

public interface MailStore {

	List<Mail> selectAllMail(SqlSession sqlSession);
	int insertMail(SqlSession sqlSession);
	int deleteMail(SqlSession sqlSession);
	int insertReplyMail(SqlSession sqlSession);
	int insertrelayMail(SqlSession sqlSession);
	int insertMailFile(SqlSession sqlSession);
	
	int insertAddress(SqlSession sqlSession);
	int updateAddress(SqlSession sqlSession);
	int deleteAddress(SqlSession sqlSession);

}
