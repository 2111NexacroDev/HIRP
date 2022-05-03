package com.highfive.hirp.time.user.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;

public interface TimeStore {

	// 사용자 출근 등록
	int insertWorkStart(SqlSession sqlSession, Time time);

	// 사용자 퇴근 등록
	int insertWorkEnd(SqlSession sqlSession, Time time);

	// 사용자 연차 내역 조회
	List<Time> selectTimeView(SqlSession sqlSession, Vacation vacation);

	// 사용자 근태 조정 신청
	int updateTimeModify(SqlSession sqlSession, TimeModify timeModify);
}