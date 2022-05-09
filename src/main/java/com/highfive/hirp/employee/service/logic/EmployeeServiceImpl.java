package com.highfive.hirp.employee.service.logic;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeService;
import com.highfive.hirp.employee.store.EmployeeStore;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeStore eStore;

	@Autowired
	private SqlSession sqlSession;

	// 회원가입
	@Override
	public int registerEmployee(Employee employee) {
		int result = eStore.insertEmployee(sqlSession, employee);
		return result;
	}

	// 로그인
	@Override
	public Employee loginMember(Employee employee) {
		Employee employeeOne = eStore.selectLoginEmployee(sqlSession, employee);
		return employeeOne;
	}

	// 비밀번호 찾기
	@Override
	public Employee findPwd(Employee employee) { // 여기 employee와 아래 employeePwd 처럼 다르게 써야함. 다른 곳과는 중복되도 상관없음
		Employee employeePwd = eStore.selectFindPwd(sqlSession, employee);
		return employeePwd;
	}
	
	// 비밀번호 재설정
	@Override
	public int modifyPwd(Employee employee) {
		int modifyPwd = eStore.updatePwd(sqlSession, employee);
		return modifyPwd;
	}
	
	// 마이페이지 출력
	@Override
	public Employee employeeMyPage(String employeeId) {
		Employee employee = eStore.selectOneById(sqlSession, employeeId);
		return employee;
	}

	// 마이페이지 수정
	@Override
	public int mypageModify(Employee employee) {
		int mypageModify = eStore.updateMypage(sqlSession, employee);
		return mypageModify;
	}
}