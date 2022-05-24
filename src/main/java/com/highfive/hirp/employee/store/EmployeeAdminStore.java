package com.highfive.hirp.employee.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.employee.domain.Career;
import com.highfive.hirp.employee.domain.Certification;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.domain.JobRole;
import com.highfive.hirp.employee.domain.Language;
import com.highfive.hirp.employee.domain.Military;
import com.nexacro17.xapi.data.DataSet;

public interface EmployeeAdminStore {

	List<Employee> selectBirthdayList(SqlSession sqlSession);
	List<Employee> selectAllEmployee(SqlSession sqlSession);
	List<Employee> selectAllEmployeeWithName(SqlSession sqlSession);
	List<Employee> selectSearchEmplList(SqlSession sqlSession, String keyword);//직원 검색
	List<Employee> selectAllEmployeeWithDeptCode(SqlSession sqlSession, String deptCode);
	List<Employee> selectEmployeeWithDeptCode(SqlSession sqlSession, String deptCode);
	List<Employee> selectAllRetiree(SqlSession sqlSession);
	List<Employee> selectTempEmployee(SqlSession sqlSession);
	Employee selectOneEmployee(SqlSession sqlSession, String emplId);
	
	List<JobRole> selectAllJobById(SqlSession sqlSession, String emplId);
	List<Career> selectAllCareerById(SqlSession sqlSession, String emplId);
	List<Language> selectAllLanguageById(SqlSession sqlSession, String emplId);
	List<Certification> selectAllCertById(SqlSession sqlSession, String emplId);
	List<Military> selectAllMilitaryById(SqlSession sqlSession, String emplId);
	
	int modifyEmployeeInfo(SqlSession sqlSession, Employee employee);
	int resignEmployee(SqlSession sqlSession, String emplId);
	int updateLevelEmployee(SqlSession sqlSession, String emplId);
	int deleteInfoAboutJob(SqlSession sqlSession, int jobNo);
	int deleteInfoAboutCareer(SqlSession sqlSession, int infoNo);
	int deleteInfoAboutLang(SqlSession sqlSession, int infoNo);
	int deleteInfoAboutCert(SqlSession sqlSession, int infoNo);
	int deleteInfoAboutMilitary(SqlSession sqlSession, int infoNo);
	
}
