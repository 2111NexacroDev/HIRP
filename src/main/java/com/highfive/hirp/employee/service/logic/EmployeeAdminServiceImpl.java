package com.highfive.hirp.employee.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.employee.store.EmployeeAdminStore;

@Service
public class EmployeeAdminServiceImpl implements EmployeeAdminService {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private EmployeeAdminStore eAStore;

	@Override
	public List<Employee> printBirthdayList() {
		List<Employee> birthdayList = eAStore.selectBirthdayList(sqlSession);
		return birthdayList;
	}
	
	@Override
	public List<Employee> printAllEmployee() {
		List<Employee> eList = eAStore.selectAllEmployee(sqlSession);
		return eList;
	}
	
	@Override
	public List<Employee> printAllEmployeeWithName() {
		List<Employee> eList = eAStore.selectAllEmployeeWithName(sqlSession);
		return eList;
	}
	//하위부서까지
	@Override
	public List<Employee> printAllEmployeeWithDeptCode(String deptCode) {
		List<Employee> eList = eAStore.selectAllEmployeeWithDeptCode(sqlSession, deptCode);
		return eList;
	}
	//내 소속 부서만
	@Override
	public List<Employee> printEmployeeWithDeptCode(String deptCode) {
		List<Employee> eList = eAStore.selectEmployeeWithDeptCode(sqlSession, deptCode);
		return eList;
	}

	@Override
	public List<Employee> printAllRetiree() {
		List<Employee> rList = eAStore.selectAllRetiree(sqlSession);
		return rList;
	}

	@Override
	public List<Employee> printAllTempEmployee() {
		List<Employee> tList = eAStore.selectTempEmployee(sqlSession);
		return tList;
	}

	@Override
	public Employee printEmployeeInfo(String emplId) {
		Employee emp = eAStore.selectOneEmployee(sqlSession, emplId);
		return emp;
	}

	@Override
	public int modifyEmployeeInfo(Employee employee) {
		int result = eAStore.modifyEmployeeInfo(sqlSession, employee);
		return result;
	}

	@Override
	public int resignEmployee(String emplId) {
		int result = eAStore.resignEmployee(sqlSession, emplId);
		return result;
	}

	@Override
	public int modifyLevelEmployee(String emplId) {
		int result = eAStore.updateLevelEmployee(sqlSession, emplId);
		return result;
	}
}
