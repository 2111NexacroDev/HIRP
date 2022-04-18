package com.highfive.hirp.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.todo.service.TodoService;

@Controller
public class TodoController {
	@Autowired
	private TodoService tService;
	
	// 할일 조회
	public ModelAndView todoListView(ModelAndView mv) {
		return mv;
	}
	
	// 할일 등록(ajax)
	public ModelAndView todoRegister(ModelAndView mv) {
		return mv;
	}
	
	// 할일 삭제(ajax)
	public ModelAndView todoDelete(ModelAndView mv) {
		return mv;
	}
	
	// 할일 수정(ajax)
	public ModelAndView todoUpdate(ModelAndView mv) {
		return mv;
	}
	
	// 메모 조회
	public ModelAndView memoListView(ModelAndView mv) {
		return mv;
	}
	
	// 메모 등록(ajax)
	public ModelAndView memoRegister(ModelAndView mv) {
		return mv;
	}
	
	// 메모 삭제(ajax)
	public ModelAndView memoDelete(ModelAndView mv) {
		return mv;
	}
	
	// 메모 수정(ajax)
	public ModelAndView memoUpdate(ModelAndView mv) {
		return mv;
	}
}
