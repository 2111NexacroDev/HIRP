package com.highfive.hirp.time.user.service;

import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;

public interface TimeService {

	// 사용자 출근 등록
	public int insertWorkStart(Time time);

	// 사용자 퇴근 등록
	public int insertWorkEnd(Time time);

	// 사용자 연차 내역 조회
	public Time selectTimeView(Vacation vacation);

	// 사용자 근태 조정 신청
	public int updateTimeModify(TimeModify timeModify);
}