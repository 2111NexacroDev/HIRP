package com.highfive.hirp.time.user.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;

public interface TimeStore {

	// 사용자 출근 등록
	int insertWorkStart(SqlSession sqlSession, Time time);

	// 사용자 퇴근 등록
	int updateWorkEnd(SqlSession sqlSession, Time time);

	// 사용자 출,퇴근 내역 화면
	Time selectTime(SqlSession sqlSession, String emplId);

	// 사용자 출퇴근 내역 조회
	List<Time> selectWorkView(SqlSession sqlSession, String emplId);
	
	// 사용자 연차 내역 조회
	List<Vacation> selectTimeView(SqlSession sqlSession, String emplId);

	// 사용자 근태 조정 조회
	List<TimeModify> selectModifyView(SqlSession sqlSession, String emplId);
}