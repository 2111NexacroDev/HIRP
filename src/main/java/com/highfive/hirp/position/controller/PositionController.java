package com.highfive.hirp.position.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.position.service.PositionService;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

@Controller
public class PositionController {

	@Autowired
	private PositionService pService;
	
	// 직급목록 전체조회
	public NexacroResult selectAllPosition() {
		return null;
	}
	
	// 직급 추가
	public NexacroResult insertPosition() {
		return null;
	}
	
	// 직급 수정
	public NexacroResult updatePositon() {
		return null;
	}
	
	// 직급 삭제
	public NexacroResult deletePosition() {
		return null;
	}
	
	// 직급 순서바꾸기
	public NexacroResult changePosition() {
		return null;
	}
	
}
