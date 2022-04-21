package com.highfive.hirp.employee.store;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;

import com.highfive.hirp.employee.domain.Employee;

public interface EmployeeStore {

	// 회원가입
	public int insertEmployee(SqlSession sqlSession, Employee employee);
		
	// 로그인
	public Employee selectLoginEmployee(SqlSession sqlSession, Employee employee);
	
	// 마이페이지 출력
	public Employee selectOneById(SqlSession sqlSession, String employeeId);
}