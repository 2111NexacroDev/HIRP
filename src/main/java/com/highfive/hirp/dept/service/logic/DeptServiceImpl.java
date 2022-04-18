package com.highfive.hirp.dept.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.dept.service.DeptService;
import com.highfive.hirp.dept.store.DeptStore;

@Service
public class DeptServiceImpl implements DeptService{
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private DeptStore dStore;
}
