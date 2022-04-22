package com.highfive.hirp.time.admin.service;

import java.util.List;

import com.highfive.hirp.time.admin.domain.TimeAdmin;

public interface TimeAdminService {

	// 관리자 출근 내역 조회
	public List<TimeAdmin> adminStart();

	// 관리자 퇴근 내역 조회
	public List<TimeAdmin> adminEnd();

	// 관리자 연차 신청 내역 조회
	public List<TimeAdmin> adminTimeView();

	// 관리자 근태 조정 신청 내역 조회
	public List<TimeAdmin> AdminTimeModify();
}