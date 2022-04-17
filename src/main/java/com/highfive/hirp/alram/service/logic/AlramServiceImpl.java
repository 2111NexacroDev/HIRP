package com.highfive.hirp.alram.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.alram.service.AlramService;
import com.highfive.hirp.alram.store.AlramStore;

@Service
public class AlramServiceImpl implements AlramService{
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private AlramStore aStore;
}
