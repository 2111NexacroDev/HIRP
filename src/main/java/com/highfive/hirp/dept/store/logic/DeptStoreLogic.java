package com.highfive.hirp.dept.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.dept.store.DeptStore;

@Repository
public class DeptStoreLogic implements DeptStore{

	//부서 리스트 가져오기
	@Override
	public List<Dept> selectAllDept(SqlSession sqlSession) {
		List<Dept> deptList = sqlSession.selectList("DeptMapper.selectAllDept");
		return deptList;
	}

	//부서 추가
	@Override
	public int insertDept(SqlSession sqlSession, Dept dept) {
		int result = sqlSession.insert("DeptMapper.insertDept", dept);
		return result;
	}

	//부서 정보 수정
	@Override
	public int updateDept(SqlSession sqlSession, Dept dept) {
		int result = sqlSession.update("DeptMapper.updateDept", dept);
		return result;
	}

	//부서 삭제
	@Override
	public int deleteDept(SqlSession sqlSession, String deptCode) {
		int result = sqlSession.delete("DeptMapper.deleteDept", deptCode);
		return result;
	}
}