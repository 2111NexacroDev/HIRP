package com.highfive.hirp.employee.service;

import java.util.List;

import com.highfive.hirp.employee.domain.Employee;

public interface EmployeeService {

	// 회원가입
	public int registerEmployee(Employee employee);	
	
	// 로그인
	public Employee loginMember(Employee employee);

	// 비밀번호 찾기
	public Employee findPwd(Employee employee);
	
	// 비밀번호 재설정
	public int modifyPwd(Employee employee);
	
	// 마이페이지 출력
	public Employee employeeMyPage(String employeeId);

	// 마이페이지 수정
	public int mypageModify(Employee employee);
	
}