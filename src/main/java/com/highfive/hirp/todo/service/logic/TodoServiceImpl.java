package com.highfive.hirp.todo.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.todo.domain.Todo;
import com.highfive.hirp.todo.service.TodoService;
import com.highfive.hirp.todo.store.TodoStore;

@Service
public class TodoServiceImpl implements TodoService {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private TodoStore tStore;

	@Override
	public List<Todo> printAllToDo() {
		List<Todo> tList = tStore.selectAllToDo(sqlSession);
		return tList;
	}

	@Override
	public int registerToDo(Todo todo) {
		int result = tStore.insertToDo(sqlSession, todo);
		return result;
	}

	@Override
	public int modifyToDo(Todo todo) {
		int result = tStore.updateToDo(sqlSession, todo);
		return result;
	}

	@Override
	public int removeToDo(int todoNo) {
		int result = tStore.deleteToDo(sqlSession, todoNo);
		return result;
	}
}
