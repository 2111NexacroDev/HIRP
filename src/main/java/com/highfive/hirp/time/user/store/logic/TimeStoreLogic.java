package com.highfive.hirp.time.user.store.logic;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;
import com.highfive.hirp.time.user.store.TimeStore;

@Repository
public class TimeStoreLogic implements TimeStore{

	// 사용자 출근 등록
	@Override
	public int insertWorkStart(SqlSession sqlSession, Time time) {
		int result = sqlSession.insert("TimeMapper.insertWorkStart", time);
		return result;
	}

	// 사용자 퇴근 등록
	@Override
	public int updateWorkEnd(SqlSession sqlSession, Time time) {
		int result = sqlSession.insert("TimeMapper.updateWorkEnd", time);
		return result;
	}

	// 사용자 출,퇴근 내역 화면
	@Override
	public Time selectTime(SqlSession sqlSession, String emplId) {
		Time selectTime = sqlSession.selectOne("TimeMapper.selectTime", emplId);
		return selectTime;
	}

	// 사용자 연차 내역 조회
	@Override
	public List<Vacation> selectTimeView(SqlSession sqlSession, String emplId) {
		List<Vacation> vacation = sqlSession.selectList("TimeMapper.selectTimeView", emplId);
		return vacation;
	}

//
//	// 사용자 근태 조정 신청
//	@Override
//	public int updateTimeModify(SqlSession sqlSession, TimeModify timeModify) {
//		int result = sqlSession.update("TimeMapper.updateTimeModify", timeModify);
//		return result;
//	}
}