package com.highfive.hirp.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

@Controller
public class EmployeeAdminController {
	@Autowired
	private EmployeeAdminService eAService;
	
	// 재직자 조회
	public NexacroResult empListView() {
		NexacroResult result = new NexacroResult(); 
		return result;
	}
	
	// 퇴사자 조회
	public NexacroResult retireeListView() {
		NexacroResult result = new NexacroResult(); 
		return result;
	}
	
	// 사원 검색 (와이어프레임엔 없음)
	public NexacroResult empSearchListView() {
		NexacroResult result = new NexacroResult(); 
		return result;
	}
	
	// 사원 정보 상세 조회
	public NexacroResult empDetailView() {
		NexacroResult result = new NexacroResult(); 
		return result;
	}
	
	// 사원 정보 수정
	public NexacroResult empUpdate() {
		NexacroResult result = new NexacroResult(); 
		return result;
	}
	
	// 사원 퇴직 처리
	public NexacroResult empResign() {
		NexacroResult result = new NexacroResult(); 
		return result;
	}
	
	// 임시회원 조회(융경 쪽에서 데이터 받아야함)
	public NexacroResult tempEmpListView() {
		NexacroResult result = new NexacroResult(); 
		return result;
	}
	
	// 사원 가입 승인
	public NexacroResult signUpTempEmp() {
		NexacroResult result = new NexacroResult(); 
		return result;
	}
}
