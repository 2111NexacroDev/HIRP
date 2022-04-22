package com.highfive.hirp.approval.admin.service;

import java.util.List;

import com.highfive.hirp.approval.admin.domain.ApprForm;

public interface ApprFormService {

	//폼 리스트 조회
	public List<ApprForm> printAllForm();
	//폼 디테일 조회
	public ApprForm printOneForm();
	//폼 등록
	public int registerForm(ApprForm form);
	//폼 수정
	public int modifyForm(ApprForm form);
	//폼 삭제
	public int removeForm(String formNo);
}
