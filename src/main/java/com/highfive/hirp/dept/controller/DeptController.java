package com.highfive.hirp.dept.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.alram.service.AlarmService;
import com.highfive.hirp.dept.service.DeptService;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;

@Controller
public class DeptController {
	@Autowired
	private DeptService dService;
	
	//부서 관리 페이지
	public NexacroResult deptMainPage() {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	//부서 선택해서 부서 정보 조회 (ajax)
	public NexacroResult selectDeptInfo(
			@ParamVariable(name="in_deptCode") String deptCode) {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	//부서 이름 검색
	public NexacroResult selectDeptSearch(
			@ParamVariable(name="in_searchName") String searchName) {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	//부서 추가
	public NexacroResult insertDept(
			@ParamDataSet(name="in_dept") DataSet dept) {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	//부서정보 수정
	public NexacroResult updateDept(
			@ParamDataSet(name="in_dept") DataSet dept) {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	//부서 삭제
	public NexacroResult deleteDept(
			@ParamVariable(name="in_deptCode") String deptCode) {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	
}
