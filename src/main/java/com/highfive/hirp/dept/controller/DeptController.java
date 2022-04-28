package com.highfive.hirp.dept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.dept.service.DeptService;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;

@Controller
public class DeptController {
	@Autowired
	private DeptService dService;
	
	//부서 관리 페이지 이동
	public NexacroResult deptMainPage() {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	//부서 전체 list 조회
	@RequestMapping(value="/admin/deptlist.hirp", method=RequestMethod.GET)
	public NexacroResult selectDeptList() {
		// ErrorCode, ErrorMsg, Dataset 선언
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		List<Dept> deptList = dService.selectAllDept();
		System.out.println(deptList);
		if(!deptList.isEmpty()) {
			nErrorCode 	= 0;
			strErrorMsg = "SUCC";
		}else {
			nErrorCode 	= -1;
			strErrorMsg = "Fail";
		}
		result.addDataSet("out_dept", deptList);
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		
		return result;
	}
	
	//부서 이름 검색 //넥사에서 해결
//	public NexacroResult selectDeptSearch(
//			@ParamVariable(name="in_searchName") String searchName) {
//		
//		NexacroResult result = new NexacroResult();
//		return result;
//	}
	
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
