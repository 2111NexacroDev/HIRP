package com.highfive.hirp.approval.admin.controller;

import com.highfive.hirp.approval.admin.service.logic.ApprFormServiceImpl;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;

public class ApprFormController {

	private ApprFormServiceImpl aService;
	
	//전자결재 폼 전체 조회
	public NexacroResult printAllApprForm() {
		NexacroResult result = new NexacroResult();
		return result;
	} 
	
	//전자결재 폼 상세 조회
	public NexacroResult apprFromDetailView() {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	//전자결재 폼 등록
	public NexacroResult registerApprForm(
			@ParamDataSet(name="in_apprform") DataSet apprform) {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	
	//전자결재 폼 수정
	public NexacroResult modifyApprForm(
			@ParamDataSet(name="in_apprform") DataSet apprform) {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	
	//전자결재 폼 삭제
	public NexacroResult removeApprForm(
			@ParamVariable(name="in_formNo")int formNo) {
		NexacroResult result = new NexacroResult();
		return result;
	}
	
}
