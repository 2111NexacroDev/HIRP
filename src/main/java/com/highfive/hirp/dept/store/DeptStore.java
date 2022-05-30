package com.highfive.hirp.dept.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.dept.domain.Dept;

public interface DeptStore {

	//부서 리스트 가져오기
	public List<Dept> selectAllDept(SqlSession sqlSession);

	//부서 추가
	public int insertDept(SqlSession sqlSession, Dept dept);

	//부서 정보 수정
	public int updateDept(SqlSession sqlSession, Dept dept);

	//부서 삭제
	public int deleteDept(SqlSession sqlSession, String deptCode);

}
