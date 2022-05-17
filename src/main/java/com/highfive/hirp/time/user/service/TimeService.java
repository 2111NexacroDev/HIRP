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


}