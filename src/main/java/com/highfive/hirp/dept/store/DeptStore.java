package com.highfive.hirp.dept.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.dept.domain.Dept;

public interface DeptStore {

	//부서 리스트 가져오기
	public List<Dept> selectAllDept(SqlSession sqlSession);

	//부서 선택해서 부서 정보 가져오기
	public Dept selectDeptInfo(SqlSession sqlSession, String deptCode);

	//부서 이름 검색해서 부서 리스트 가져오기
	public List<Dept> selectDeptSearch(SqlSession sqlSession, String deptSearchName);

	//부서 추가
	public int insertDept(SqlSession sqlSession, Dept dept);

	//부서 정보 수정
	public int updateDept(SqlSession sqlSession, Dept dept);

	//부서 삭제
	public int deleteDept(SqlSession sqlSession, String deptCode);

}
