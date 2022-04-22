package com.highfive.hirp.employee.service;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.group.domain.Group;

public interface EmployeeService {

	// 회원가입
	public int registerEmployee(Employee employee);	
	
	// 로그인
	public Employee loginMember(Employee employee);

	// 마이페이지 출력
	public Employee employeeMyPage(String employeeId);
	
	// 비밀번호 찾기
	//public List<Member> find_pwd(HttpServletResponse response, Member member);
}