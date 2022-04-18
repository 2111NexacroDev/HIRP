package com.highfive.hirp.board.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.store.NoticeStore;

@Service
public class NoticeServiceImpl {

	@Autowired
	private NoticeStore nStore;
	
	@Autowired
	private SqlSession sqlSession;
	
	
	
	
	
	
}
