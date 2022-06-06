package com.highfive.hirp.todo.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.highfive.hirp.todo.domain.Memo;
import com.highfive.hirp.todo.domain.Todo;
import com.highfive.hirp.todo.service.TodoService;

@Controller
public class TodoController {
	@Autowired
	private TodoService tService;

	// 할일 조회
	@RequestMapping(value="/todo/list.hirp", method=RequestMethod.GET)
	public ModelAndView todoListView(ModelAndView mv
			, @ModelAttribute Todo todo
			, HttpServletRequest request) {
		try {
			// 세션 아이디 세팅
			HttpSession session = request.getSession();
			String emplId  = (String) session.getAttribute("emplId");
			todo.setEmplId(emplId);
			
			// 모든 일자의 할 일 조회
			List<Todo> tList = tService.printAllToDo(emplId);
			
			// 모든 일자의 메모 조회
			List<Memo> mList = tService.printAllMemo(emplId);
			
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
			
			// 오늘 날짜 세팅
			Date now = Date.valueOf(LocalDate.now());
			todo.setTodoDate(now);
			
			// 오늘 날짜의 할 일 조회
			List<Todo> todayList = tService.printToDoByDate(todo);
			
			// 오늘 날짜로 할 일 있을 때만 세팅
			if(!todayList.isEmpty()) {
				mv.addObject("todayList", todayList);				
			}
			
			mv.setViewName("todo/todoList");
		} catch(Exception e) {
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 일자별 할 일 조회(ajax)
	@ResponseBody
	@RequestMapping(value="/todo/listByDate.hirp", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public String todoListByDate(@ModelAttribute Todo todo
			,@RequestParam("selectedDate") String selectedDate
			,HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		todo.setEmplId(emplId);

		// String -> Date 형변환
		Date day = Date.valueOf(selectedDate);
		todo.setTodoDate(day);
		List<Todo> tList = tService.printToDoByDate(todo);
		if(!tList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(tList);
		} else {
			return "fail";
		}
	}

	// 완료 목록 조회
	@RequestMapping(value="/todo/doneList.hirp", method=RequestMethod.GET)
	public ModelAndView doneListView(ModelAndView mv, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			List<Todo> fList = tService.printFinishedToDo(emplId);
			if(!fList.isEmpty()) {
				mv.addObject("fList", fList);
			} else {
				mv.addObject("msg", "완료 내역 없음");
			}
			mv.setViewName("todo/done");
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
			,@RequestParam("selectedDate") String selectedDate
			,HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		if(selectedDate.equals("TODAY") || selectedDate.equals("오늘의 업무")) {
			Date now = Date.valueOf(LocalDate.now());
			todo.setTodoDate(now);
		} else {
			Date day = Date.valueOf(selectedDate);
			todo.setTodoDate(day);
		}
		todo.setEmplId(emplId);
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
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		memo.setEmplId(emplId);
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
