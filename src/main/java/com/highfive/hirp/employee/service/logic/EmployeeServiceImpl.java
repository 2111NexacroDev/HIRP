package com.highfive.hirp.employee.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.employee.service.EmployeeService;
import com.highfive.hirp.employee.store.EmployeeStore;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private EmployeeStore eStore;
}
