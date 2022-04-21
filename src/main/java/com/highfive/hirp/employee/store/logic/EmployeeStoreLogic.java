package com.highfive.hirp.employee.store.logic;

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
		int result = sqlSession.insert("EmployeeMapper.insertEmployee", employee);
		return result;
	}
	
	// 로그인
	@Override
	public Employee selectLoginEmployee(SqlSession sqlSession, Employee employee) {
		Employee employeeOne = sqlSession.selectOne("EmployeeMapper.selectLoginEmployee", employee);
		return employeeOne;
	}

	// 마이페이지 출력
	@Override
	public Employee selectOneById(SqlSession sqlSession, String employeeId) {
		Employee employeeOne = sqlSession.selectOne("EmployeeMapper.selectOneById", employeeId);
		return employeeOne;
	}
}