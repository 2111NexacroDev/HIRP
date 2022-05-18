package com.highfive.hirp.employee.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.employee.domain.Employee;
import com.nexacro17.xapi.data.DataSet;

public interface EmployeeAdminStore {

	List<Employee> selectBirthdayList(SqlSession sqlSession);
	List<Employee> selectAllEmployee(SqlSession sqlSession);
	List<Employee> selectAllEmployeeWithName(SqlSession sqlSession);
	List<Employee> selectAllEmployeeWithDeptCode(SqlSession sqlSession, String deptCode);
	List<Employee> selectEmployeeWithDeptCode(SqlSession sqlSession, String deptCode);
	List<Employee> selectAllRetiree(SqlSession sqlSession);
	List<Employee> selectTempEmployee(SqlSession sqlSession);
	Employee selectOneEmployee(SqlSession sqlSession, String emplId);
	int modifyEmployeeInfo(SqlSession sqlSession, Employee employee);
	int resignEmployee(SqlSession sqlSession, int empNo);
	int updateLevelEmployee(SqlSession sqlSession, int empNo);

}
