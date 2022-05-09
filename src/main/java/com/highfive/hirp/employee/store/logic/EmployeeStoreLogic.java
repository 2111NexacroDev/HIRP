package com.highfive.hirp.employee.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.store.EmployeeStore;

@Repository
public class EmployeeStoreLogic implements EmployeeStore {

	// 회원가입
	// 값을 넣어서 수정,삭제,등록 할때는 int // 조회하거나 값 담아올때는
	@Override
	public int insertEmployee(SqlSession sqlSession, Employee employee) {
		int result = sqlSession.insert("EmployeeMapper.insertEmployee", employee); // .()값을 mapper id값과 같게 적어줘야함
		return result;
	}
	
	// 로그인
	@Override
	public Employee selectLoginEmployee(SqlSession sqlSession, Employee employee) {
		Employee employeeOne = sqlSession.selectOne("EmployeeMapper.selectLoginEmployee", employee);
		return employeeOne;
	}

	// 비밀번호 찾기
	@Override
	public Employee selectFindPwd(SqlSession sqlSession, Employee employee) {
		Employee employeePwd = sqlSession.selectOne("EmployeeMapper.selectFindPwd", employee);
		return employeePwd;
	}
	
	// 비밀번호 재설정
	@Override
	public int updatePwd(SqlSession sqlSession, Employee employee) {
		int result = sqlSession.update("EmployeeMapper.updatePwd", employee);
		return result;
	}
	
	
	// 마이페이지 출력
	@Override
	public Employee selectOneById(SqlSession sqlSession, String employeeId) {
		Employee employeeOne = sqlSession.selectOne("EmployeeMapper.selectOneById", employeeId);
		return employeeOne;
	}

	// 마이페이지 수정
	@Override
	public int updateMypage(SqlSession sqlSession, Employee employee) {
		int result = sqlSession.update("EmployeeMapper.updateMypage", employee);
		return result;
	}
}