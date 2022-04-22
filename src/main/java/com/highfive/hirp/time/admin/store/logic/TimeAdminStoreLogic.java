package com.highfive.hirp.time.admin.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.highfive.hirp.time.admin.store.TimeAdminStore;

@Repository
public class TimeAdminStoreLogic implements TimeAdminStore {

	//관리자 출근 내역 조회
	@Override
	public List<TimeAdmin> selectStartGroup(SqlSession sqlSession) {
		List<TimeAdmin> timeAdmin = sqlSession.selectList("TimeAdminMapper.selectStart");
		return timeAdmin;
	}

	//관리자 퇴근 내역 조회
	@Override
	public List<TimeAdmin> selectEndGroup(SqlSession sqlSession) {
		List<TimeAdmin> timeAdmin = sqlSession.selectList("TimeAdminMapper.selectEnd");
		return timeAdmin;
	}

	// 관리자 연차 신청 내역 조회
	@Override
	public List<TimeAdmin> selectVacationGroup(SqlSession sqlSession) {
		List<TimeAdmin> timeAdmin = sqlSession.selectList("TimeAdminMapper.selectVacation");
		return timeAdmin;
	}

	// 관리자 근태 조정 신청 내역 조회
	@Override
	public List<TimeAdmin> selectTimeGroup(SqlSession sqlSession) {
		List<TimeAdmin> timeAdmin = sqlSession.selectList("TimeAdminMapper.selectModify");
		return timeAdmin;
	}
}