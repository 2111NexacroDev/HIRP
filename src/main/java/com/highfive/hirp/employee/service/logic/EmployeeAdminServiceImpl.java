package com.highfive.hirp.employee.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.employee.store.EmployeeAdminStore;

@Service
public class EmployeeAdminServiceImpl {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private EmployeeAdminStore eAStore;
}
