package com.highfive.hirp.todo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.todo.domain.Memo;
import com.highfive.hirp.todo.domain.Todo;
import com.highfive.hirp.todo.service.TodoService;

@Controller
public class TodoController {
	@Autowired
	private TodoService tService;

	// 할일 조회
	@RequestMapping(value="/todo/list.hirp", method=RequestMethod.GET)
	public ModelAndView todoListView(ModelAndView mv) {
		try {
			List<Todo> tList = tService.printAllToDo();
			List<Memo> mList = tService.printAllMemo();
			// 지금 모든 항목 다 불러오는 쿼리로 써놔서 로그인 세션 만든 후에
			// 아이디 같을 때, 날짜 일치할 때 불러오는 조건 추가로 걸어줘야함. 
			if(!tList.isEmpty() && !mList.isEmpty()) {
				mv.addObject("tList", tList);
				mv.addObject("mList", mList);
			} else if(!tList.isEmpty() && mList.isEmpty()) {
				mv.addObject("tList", tList);
			} else if(tList.isEmpty() && !mList.isEmpty()) {
				mv.addObject("mList", mList);
			} else {
				// 아무 것도 없을 때
			}
			mv.setViewName("todo/todoList");
		} catch(Exception e) {
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 할일 등록(ajax)
	@ResponseBody
	@RequestMapping(value="/todo/write.hirp", method=RequestMethod.POST)
	public String todoRegister(
			@ModelAttribute Todo todo
			,@RequestParam("todoConts") String todoConts
			,HttpServletRequest request) {
		todo.setEmplId("user1");
		// 임시 처리, 후에 세션으로 수정해야함.
		// 날짜를 추가해줘야해서 Todo 객체 이용하는 것으로 코딩함.
		todo.setTodoConts(todoConts);
		int result = tService.registerToDo(todo);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 할일 수정(ajax)		
	@ResponseBody
	@RequestMapping(value="/todo/modify.hirp", method=RequestMethod.POST)
	public String todoUpdate(
			@ModelAttribute Todo todo
			,@RequestParam("todoNo") int todoNo
			,@RequestParam("todoConts") String todoConts
			,HttpServletRequest request) {
		todo.setTodoNo(todoNo);
		todo.setTodoConts(todoConts);
		int result = tService.modifyToDo(todo);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}

	
	// 할일 체크(ajax)		
	@ResponseBody
	@RequestMapping(value="/todo/checked.hirp", method=RequestMethod.POST)
	public String todoChecked(
			@ModelAttribute Todo todo
			,@RequestParam("isFinished") String isFinished
			,@RequestParam("todoNo") int todoNo
			,HttpServletRequest request) {
		todo.setIsFinished(isFinished);
		todo.setTodoNo(todoNo);
		int result = tService.checkedToDo(todo);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 할일 삭제(ajax)	
	@ResponseBody
	@RequestMapping(value="/todo/remove.hirp", method=RequestMethod.GET)
	public String todoDelete(
			@RequestParam("todoNo") int todoNo) {
		int result = tService.removeToDo(todoNo);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 메모 등록(ajax)	
	@ResponseBody
	@RequestMapping(value="/memo/write.hirp", method=RequestMethod.POST)
	public String memoRegister(
			@ModelAttribute Memo memo
			,@RequestParam("memoConts") String memoConts
			,HttpServletRequest request) {
		memo.setEmplId("user1");
		memo.setMemoConts(memoConts);
		int result = tService.registerMemo(memo);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 메모 수정(ajax)	
	@ResponseBody
	@RequestMapping(value="/memo/modify.hirp", method=RequestMethod.POST)
	public String memoUpdate(
			@ModelAttribute Memo memo
			,@RequestParam("memoNo") int memoNo
			,@RequestParam("memoConts") String memoConts) {
		memo.setMemoNo(memoNo);
		memo.setMemoConts(memoConts);
		int result = tService.modifyMemo(memo);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 메모 삭제(ajax)	
	@ResponseBody
	@RequestMapping(value="/memo/remove.hirp", method=RequestMethod.GET)
	public String memoDelete(
			@RequestParam("memoNo") int memoNo) {
		int result = tService.removeMemo(memoNo);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
}
