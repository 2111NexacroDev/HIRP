package com.highfive.hirp.todo.service;

import java.util.List;

import com.highfive.hirp.todo.domain.Memo;
import com.highfive.hirp.todo.domain.Todo;

public interface TodoService {

	public List<Todo> printAllToDo(String emplId);
	public List<Todo> printFinishedToDo(String emplId);
	public int registerToDo(Todo todo);
	public int modifyToDo(Todo todo);
	public int checkedToDo(Todo todo);
	public int removeToDo(int todoNo);
	
	public List<Memo> printAllMemo(String emplId);
	public int registerMemo(Memo memo);
	public int modifyMemo(Memo memo);
	public int removeMemo(int memoNo);

}
