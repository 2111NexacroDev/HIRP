package com.highfive.hirp.time.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.highfive.hirp.time.admin.service.TimeAdminService;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

@Controller
public class TimeAdminController {

	@Autowired
	private TimeAdminService taService;

	// 관리자 출근 내역 조회
	public NexacroResult timeStart() {
		NexacroResult result = new NexacroResult();
		List<TimeAdmin> timeAdmin = taService.adminStart();
		return result;
	}

	// 관리자 퇴근 내역 조회
	public NexacroResult timeEnd() {
		NexacroResult result = new NexacroResult();
		List<TimeAdmin> timeAdmin = taService.adminEnd();
		return result;
	}

	// 관리자 연차 신청 내역 조회
	public NexacroResult timeVacation() {
		NexacroResult result = new NexacroResult();
		List<TimeAdmin> timeAdmin = taService.adminTimeView();
		return result;
	}

	// 관리자 근태 조정 신청 내역 조회
	public NexacroResult vacationModify() {
		NexacroResult result = new NexacroResult();
		List<TimeAdmin> timeAdmin = taService.AdminTimeModify();
		return result;
	}
}

//이미 있는 거를 덮어 씌우는 건 update
//없었는데 새로 생기는건 insert

//출퇴근등록 - 시간이 아예 디비에 없다가 등록하면 그 때 생기는 거라서 insert
//근태조정신청 - 시간을 바꿔주는 거라 update