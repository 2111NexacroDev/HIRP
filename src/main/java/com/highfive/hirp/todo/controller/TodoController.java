package com.highfive.hirp.todo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.todo.domain.Memo;
import com.highfive.hirp.todo.domain.Todo;
import com.highfive.hirp.todo.service.TodoService;

@Controller
public class TodoController {
	@Autowired
	private TodoService tService;
	
	// 할일 조회
	public ModelAndView todoListView(ModelAndView mv) {
		List<Todo> tList = tService.printAllToDo();
		return mv;
	}
	
	// 할일 등록(ajax)
	public ModelAndView todoRegister(ModelAndView mv
			,@ModelAttribute Todo todo
			,HttpServletRequest request) {
		int result = tService.registerToDo(todo);
		return mv;
	}
	
	// 할일 수정(ajax)
	public ModelAndView todoUpdate(ModelAndView mv
			,@ModelAttribute Todo todo) {
		int result = tService.modifyToDo(todo);
		return mv;
	}
	
	// 할일 삭제(ajax)
	public ModelAndView todoDelete(ModelAndView mv
			,@RequestParam("todoNo") int todoNo) {
		int result = tService.removeToDo(todoNo);
		return mv;
	}
	
	// 메모 조회
	public ModelAndView memoListView(ModelAndView mv) {
		return mv;
	}
	
	// 메모 등록(ajax)
	public ModelAndView memoRegister(ModelAndView mv
			,@ModelAttribute Memo memo
			,HttpServletRequest request) {
		return mv;
	}
	
	// 메모 삭제(ajax)
	public ModelAndView memoDelete(ModelAndView mv
			,@RequestParam("memoNo") int memoNo) {
		return mv;
	}
	
	// 메모 수정(ajax)
	public ModelAndView memoUpdate(ModelAndView mv
			,@RequestParam("memoNo") int memoNo) {
		return mv;
	}
}
