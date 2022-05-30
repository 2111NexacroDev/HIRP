package com.highfive.hirp.dept.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.dept.service.DeptService;
import com.highfive.hirp.dept.store.DeptStore;

@Service
public class DeptServiceImpl implements DeptService{
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private DeptStore dStore;
	//부서 리스트 가져오기
	@Override
	public List<Dept> selectAllDept() {
		List<Dept> deptList = dStore.selectAllDept(sqlSession);
		return deptList;
	}
	//부서 추가
	@Override
	public int insertDept(Dept dept) {
		int result = dStore.insertDept(sqlSession, dept);
		return result;
	}
	//부서 정보 수정
	@Override
	public int updateDept(Dept dept) {
		int result = dStore.updateDept(sqlSession, dept);
		return result;
	}
	//부서 삭제
	@Override
	public int deleteDept(String deptCode) {
		int result = dStore.deleteDept(sqlSession, deptCode);
		return result;
	}

	
}
