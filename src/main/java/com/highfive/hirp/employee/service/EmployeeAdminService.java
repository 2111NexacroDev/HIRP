package com.highfive.hirp.employee.service;

import java.util.List;

import com.highfive.hirp.employee.domain.Employee;
import com.nexacro17.xapi.data.DataSet;

public interface EmployeeAdminService {

	public List<Employee> printBirthdayList();
	public List<Employee> printAllEmployee();
	public List<Employee> printAllEmployeeWithName(); //deptname, position name까지 select
	public List<Employee> printAllEmployeeWithDeptCode(String deptCode); //하위부서까지
	public List<Employee> printEmployeeWithDeptCode(String deptCode); //내 부서 소속만
	public List<Employee> printAllRetiree();
	public List<Employee> printAllTempEmployee();
	public Employee printEmployeeInfo(String emplId);	
	public int modifyEmployeeInfo(Employee employee);
	public int resignEmployee(int empNo);
	public int modifyLevelEmployee(int empNo);

}
