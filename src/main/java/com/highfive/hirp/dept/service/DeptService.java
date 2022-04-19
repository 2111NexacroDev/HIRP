package com.highfive.hirp.dept.service;

import java.util.List;

import com.highfive.hirp.dept.domain.Dept;

public interface DeptService {
	//부서 리스트 가져오기
	public List<Dept> selectAllDept();
	
	//부서 선택해서 부서 정보 가져오기
	public Dept selectDeptInfo(String deptCode);
	
	//부서 이름 검색 부서 리스트 가져오기
	public List<Dept> selectDeptSearch(String deptSearchName);
	
	//부서 추가
	public int insertDept(Dept dept);
	
	//부서 정보 수정
	public int updateDept(Dept dept);
	
	//부서 삭제
	public int deleteDept(String deptCode);
}
