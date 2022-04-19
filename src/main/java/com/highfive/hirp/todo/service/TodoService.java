package com.highfive.hirp.todo.service;

import java.util.List;

import com.highfive.hirp.todo.domain.Todo;

public interface TodoService {

	public List<Todo> printAllToDo();
	public int registerToDo(Todo todo);
	public int modifyToDo(Todo todo);
	public int removeToDo(int todoNo);

}
