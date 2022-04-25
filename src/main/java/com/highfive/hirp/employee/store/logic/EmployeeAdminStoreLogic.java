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
	public List<Employee> selectAllEmployee(SqlSession sqlSession) {
		List<Employee> eList = sqlSession.selectList("EmployeeAdminMapper.selectAllEmployee");
		return eList;
	}

	@Override
	public List<Employee> selectAllRetiree(SqlSession sqlSession) {
		List<Employee> rList = sqlSession.selectList("EmployeeAdminMapper.selectAllRetiree");
		return rList;
	}

	@Override
	public List<Employee> selectSearchEmployee(SqlSession sqlSession, DataSet search) {
		List<Employee> searchList = sqlSession.selectList("EmployeeAdminMapper.selectSearchEmployee", search);
		return searchList;
	}

	@Override
	public List<Employee> selectTempEmployee(SqlSession sqlSession) {
		List<Employee> tList = sqlSession.selectList("EmployeeAdminMapper.selectTempEmployee");
		return tList;
	}

	@Override
	public Employee selectOneEmployee(SqlSession sqlSession) {
		Employee employee = sqlSession.selectOne("EmployeeAdminMapper.selectOneEmployee");
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
