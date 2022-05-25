package com.highfive.hirp.time.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.highfive.hirp.time.admin.service.TimeAdminService;
import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

@Controller
public class TimeAdminController {

	@Autowired
	private TimeAdminService taService;

	// 관리자 출퇴근 내역 조회
	@RequestMapping(value="/admin/timeView.hirp", method=RequestMethod.GET)
	public NexacroResult timeView() {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult(); 
		List<Time> time = taService.inOutTimeView(); // 출퇴근 조회
		if(!time.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCCESS";
			result.addDataSet("outTimeView", time); // <>와 이름 같게. 넥사크로에서 어떻게 부를지 정함
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}

	// 관리자 연차 신청 내역 조회
	@RequestMapping(value="/admin/vacationView.hirp", method=RequestMethod.GET)
	public NexacroResult vacationView() {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		List<Vacation> vacation = taService.vacationView();
		if(!vacation.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCCESS";
			result.addDataSet("outTimeView", vacation); // <>와 이름 같게. 넥사크로에서 어떻게 부를지 정함
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}

	// 관리자 근태 조정 신청 내역 조회
	@RequestMapping(value="/admin/timeModifyView.hirp", method=RequestMethod.GET)
	public NexacroResult timeModifyView() {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		List<TimeModify> timeModify = taService.timeModifyView();
		if(!timeModify.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCCESS";
			result.addDataSet("outTimeView", timeModify); // <>와 이름 같게. 넥사크로에서 어떻게 부를지 정함
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
}

//이미 있는 거를 덮어 씌우는 건 update
//없었는데 새로 생기는건 insert

//출퇴근등록 - 시간이 아예 디비에 없다가 등록하면 그 때 생기는 거라서 insert
//근태조정신청 - 시간을 바꿔주는 거라 update