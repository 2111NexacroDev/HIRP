package com.highfive.hirp.time.admin.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

public interface TimeAdminStore {

	// 관리자 출퇴근 내역 조회
	List<Time> selectInOutTimeView(SqlSession sqlSession);

	// 관리자 연차 신청 내역 조회
	List<Vacation> selectVacationView(SqlSession sqlSession);

	// 관리자 근태 조정 신청 내역 조회
	List<TimeModify> selectTimeModifyView(SqlSession sqlSession);
}