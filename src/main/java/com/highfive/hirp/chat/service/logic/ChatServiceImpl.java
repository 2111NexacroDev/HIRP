package com.highfive.hirp.chat.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.chat.service.ChatService;
import com.highfive.hirp.chat.store.ChatStore;

@Service
public class ChatServiceImpl implements ChatService{
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private ChatStore cStore;
}
