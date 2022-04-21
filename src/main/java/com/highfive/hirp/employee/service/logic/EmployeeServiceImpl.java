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

	// 마이페이지 출력
	@Override
	public Employee employeeMyPage(String employeeId) {
		Employee employee = eStore.selectOneById(sqlSession, employeeId);
		return employee;
	}

	// 비밀번호 찾기
	@Override
	public List<Employee> find_pwd(HttpServletResponse response, Employee employee) throws Exception {
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out;
		out = response.getWriter();
		List<Employee> pwd = eStore.find_pwd(employee, sqlSession);
		if (pwd == null) {
			out.println("<script>");
			out.println("alert('가입된 아이디가 없습니다.');");
			return null;
		} else {
			return pwd;
		}
	}
}