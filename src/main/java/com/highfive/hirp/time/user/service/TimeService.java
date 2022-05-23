package com.highfive.hirp.time.user.service;

import java.util.List;

import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;

public interface TimeService {

	// 사용자 출근 등록
	public int timeStart(Time time);

	// 사용자 퇴근 등록
	public int timeEnd(Time time);

	// 사용자 출,퇴근 내역 화면
	public Time selectTime(String emplId);

	// 사용자 연차 내역 조회
	public List<Vacation> selectTimeView(String emplId);

}