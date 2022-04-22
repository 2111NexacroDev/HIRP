package com.highfive.hirp.mail.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.mail.domain.Address;
import com.highfive.hirp.mail.domain.Mail;
import com.highfive.hirp.mail.domain.MailFile;

public interface MailStore {

	List<Mail> selectAllMail(SqlSession sqlSession);
	int insertMail(SqlSession sqlSession, Mail mail);
	int deleteMail(SqlSession sqlSession, Mail mail);
	int insertReplyMail(SqlSession sqlSession, Mail mail);
	int insertrelayMail(SqlSession sqlSession, Mail mail);
	int insertMailFile(SqlSession sqlSession, MailFile mailFile);
	
	int insertAddress(SqlSession sqlSession, Address address);
	int updateAddress(SqlSession sqlSession, Address address);
	int deleteAddress(SqlSession sqlSession, Address address);

}
