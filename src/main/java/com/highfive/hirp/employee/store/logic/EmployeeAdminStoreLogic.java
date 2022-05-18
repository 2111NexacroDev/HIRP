package com.highfive.hirp.employee.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.store.EmployeeAdminStore;
import com.nexacro17.xapi.data.DataSet;

@Repository
public class EmployeeAdminStoreLogic implements EmployeeAdminStore {
	@Override
	public List<Employee> selectBirthdayList(SqlSession sqlSession) {
		List<Employee> birthdayList = sqlSession.selectList("EmployeeAdminMapper.selectBirthdayList");
		return birthdayList;
	}
	
	@Override
	public List<Employee> selectAllEmployee(SqlSession sqlSession) {
		List<Employee> eList = sqlSession.selectList("EmployeeAdminMapper.selectAllEmployee");
		return eList;
	}
	
	@Override
	public List<Employee> selectAllEmployeeWithName(SqlSession sqlSession) {
		List<Employee> eList = sqlSession.selectList("EmployeeAdminMapper.selectAllEmployeeWithName");
		return eList;
	}
	
	//하위부서까지
	@Override
	public List<Employee> selectAllEmployeeWithDeptCode(SqlSession sqlSession, String deptCode) {
		List<Employee> eList = sqlSession.selectList("EmployeeAdminMapper.selectAllEmployeeWithDeptCode", deptCode);
		return eList;
	}
	
	//내 소속 부서만
	@Override
	public List<Employee> selectEmployeeWithDeptCode(SqlSession sqlSession, String deptCode) {
		List<Employee> eList = sqlSession.selectList("EmployeeAdminMapper.selectEmployeeWithDeptCode", deptCode);
		return eList;
	}
	
	@Override
	public List<Employee> selectAllRetiree(SqlSession sqlSession) {
		List<Employee> rList = sqlSession.selectList("EmployeeAdminMapper.selectAllRetiree");
		return rList;
	}

	@Override
	public List<Employee> selectTempEmployee(SqlSession sqlSession) {
		List<Employee> tList = sqlSession.selectList("EmployeeAdminMapper.selectTempEmployee");
		return tList;
	}

	@Override
	public Employee selectOneEmployee(SqlSession sqlSession, String emplId) {
		Employee employee = sqlSession.selectOne("EmployeeAdminMapper.selectOneEmployee", emplId);
		return employee;
	}

	@Override
	public int modifyEmployeeInfo(SqlSession sqlSession, Employee employee) {
		int result = sqlSession.update("EmployeeAdminMapper.modifyEmployeeInfo");
		return result;
	}

	@Override
	public int resignEmployee(SqlSession sqlSession, int empNo) {
		int result = sqlSession.update("EmployeeAdminMapper.resignEmployee");
		return result;
	}

	@Override
	public int updateLevelEmployee(SqlSession sqlSession, int empNo) {
		int result = sqlSession.update("EmployeeAdminMapper.updateLevelEmployee");
		return result;
	}
}
