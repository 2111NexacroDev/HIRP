package com.highfive.hirp.employee.service;

import java.util.List;

import com.highfive.hirp.employee.domain.Career;
import com.highfive.hirp.employee.domain.Certification;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.domain.JobRole;
import com.highfive.hirp.employee.domain.Language;
import com.highfive.hirp.employee.domain.Military;

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
	public int resignEmployee(String emplId);
	public int modifyLevelEmployee(String tempId);
	
	// 직원 항목별 정보 조회
	public List<JobRole> selectAllJobById(String emplId);
	public List<Career> selectAllCareerById(String emplId);
	public List<Language> selectAllLanguageById(String emplId);
	public List<Certification> selectAllCertById(String emplId);
	public List<Military> selectAllMilitaryById(String emplId);

}
