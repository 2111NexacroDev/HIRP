package com.highfive.hirp.employee.service;

import java.util.List;

import com.highfive.hirp.employee.domain.Career;
import com.highfive.hirp.employee.domain.Certification;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.domain.JobRole;
import com.highfive.hirp.employee.domain.Language;
import com.highfive.hirp.employee.domain.Military;

public interface EmployeeAdminService {
	// 조건별 직원 조회
	public List<Employee> printBirthdayList();
	public List<Employee> printAllEmployee();
	public List<Employee> printAllEmployeeWithName(); //deptname, position name까지 select
	public List<Employee> printAllEmployeeWithDeptCode(String deptCode); //하위부서까지
	public List<Employee> printEmployeeWithDeptCode(String deptCode); //내 부서 소속만
	public List<Employee> printAllRetiree();
	public List<Employee> printAllTempEmployee();
	
	// 직원 항목별 정보 조회
	public Employee printEmployeeInfo(String emplId);	
	public List<JobRole> selectAllJobById(String emplId);
	public List<Career> selectAllCareerById(String emplId);
	public List<Language> selectAllLanguageById(String emplId);
	public List<Certification> selectAllCertById(String emplId);
	public List<Military> selectAllMilitaryById(String emplId);
	
	// 삽입, 수정, 삭제
	public int modifyEmployeeInfo(Employee employee);
	public int resignEmployee(String emplId);
	public int modifyLevelEmployee(String tempId);
	public int removeInfoAboutJob(int jobNo);
	public int removeInfoAboutCareer(int infoNo);
	public int removeInfoAboutLang(int infoNo);
	public int removeInfoAboutCert(int infoNo);
	public int removeInfoAboutMilitary(int infoNo);
}
