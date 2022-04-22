package com.highfive.hirp.employee.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.employee.domain.Employee;
import com.nexacro17.xapi.data.DataSet;

public interface EmployeeAdminStore {

	List<Employee> selectAllEmployee(SqlSession sqlSession);
	List<Employee> selectAllRetiree(SqlSession sqlSession);
	List<Employee> selectSearchEmployee(SqlSession sqlSession, DataSet search);
	List<Employee> selectTempEmployee(SqlSession sqlSession);
	Employee selectOneEmployee(SqlSession sqlSession);
	int modifyEmployeeInfo(SqlSession sqlSession, Employee employee);
	int resignEmployee(SqlSession sqlSession, int empNo);
	int updateLevelEmployee(SqlSession sqlSession, int empNo);

}
