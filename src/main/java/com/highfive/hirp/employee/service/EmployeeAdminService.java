package com.highfive.hirp.employee.service;

import java.util.List;

import com.highfive.hirp.employee.domain.Employee;
import com.nexacro17.xapi.data.DataSet;

public interface EmployeeAdminService {

	public List<Employee> printAllEmployee();
	public List<Employee> printAllEmployeeWithName();
	public List<Employee> printAllRetiree();
	public List<Employee> printAllTempEmployee();
	public Employee printEmployeeInfo(String emplId);	
	public int modifyEmployeeInfo(Employee employee);
	public int resignEmployee(int empNo);
	public int modifyLevelEmployee(int empNo);

}
