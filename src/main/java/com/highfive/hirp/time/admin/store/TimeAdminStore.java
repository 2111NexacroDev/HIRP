package com.highfive.hirp.time.admin.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

public interface TimeAdminStore {

	//관리자 출근 내역 조회
	List<TimeAdmin> selectStartGroup(SqlSession sqlSession);

	// 관리자 퇴근 내역 조회
	List<TimeAdmin> selectEndGroup(SqlSession sqlSession);

	// 관리자 연차 신청 내역 조회
	List<TimeAdmin> selectVacationGroup(SqlSession sqlSession);

	// 관리자 근태 조정 신청 내역 조회
	List<TimeAdmin> selectTimeGroup(SqlSession sqlSession);
}