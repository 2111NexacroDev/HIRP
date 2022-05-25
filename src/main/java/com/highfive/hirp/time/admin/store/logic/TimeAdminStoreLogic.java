package com.highfive.hirp.time.admin.store.logic;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.highfive.hirp.time.admin.store.TimeAdminStore;
import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;

@Repository
public class TimeAdminStoreLogic implements TimeAdminStore {

	// 관리자 출퇴근 내역 조회
	@Override
	public List<Time> selectInOutTimeView(SqlSession sqlSession) {
		List<Time> resultTaList = sqlSession.selectList("timeAdminMapper.selectInOutTimeView");
		return resultTaList;
	}

	// 관리자 연차 신청 내역 조회
	@Override
	public List<Vacation> selectVacationView(SqlSession sqlSession) {
		List<Vacation> resultTaList = sqlSession.selectList("timeAdminMapper.selectVacationView");
		return resultTaList;
	}

	// 관리자 근태 조정 신청 내역 조회
	@Override
	public List<TimeModify> selectTimeModifyView(SqlSession sqlSession) {
		List<TimeModify> resultTaList = sqlSession.selectList("timeAdminMapper.selectTimeModifyView");
		return resultTaList;
	}
}