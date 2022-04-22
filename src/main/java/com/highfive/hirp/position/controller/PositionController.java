package com.highfive.hirp.position.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.position.service.PositionService;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;

@Controller
public class PositionController {

	@Autowired
	private PositionService pService;
	
	// 직급 목록 페이지
	public NexacroResult positionListView() {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	// 직급 추가
	public NexacroResult insertPosition(@ParamDataSet(name="in_position") DataSet position) {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	// 직급 수정
	public NexacroResult updatePositon(@ParamDataSet(name="in_position") DataSet position) {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	// 직급 삭제
	public NexacroResult deletePosition(@ParamVariable(name="in_positionCode") String positionCode) {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	// 직급 순서바꾸기
	public NexacroResult changePosition(@ParamVariable(name="in_positionSequence") String positionSequence) {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
}
