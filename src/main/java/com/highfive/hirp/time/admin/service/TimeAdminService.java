package com.highfive.hirp.time.admin.service;

import java.util.List;

import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;

public interface TimeAdminService {

	// 관리자 출퇴근 내역 조회
	public List<Time> inOutTimeView();

	// 관리자 연차 신청 내역 조회
	public List<Vacation> vacationView();

	// 관리자 근태 조정 신청 내역 조회
	public List<TimeModify> timeModifyView();
}