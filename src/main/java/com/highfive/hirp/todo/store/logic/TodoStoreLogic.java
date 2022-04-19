package com.highfive.hirp.todo.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.todo.domain.Todo;
import com.highfive.hirp.todo.store.TodoStore;

@Repository
public class TodoStoreLogic implements TodoStore {
	@Override
	public List<Todo> selectAllToDo(SqlSession sqlSession) {
		List<Todo> tList = sqlSession.selectList("TodoMapper.selectAllToDo");
		return tList;
	}

	@Override
	public int insertToDo(SqlSession sqlSession, Todo todo) {
		int result = sqlSession.insert("TodoMapper.insertToDo");
		return result;
	}

	@Override
	public int updateToDo(SqlSession sqlSession, Todo todo) {
		int result = sqlSession.update("TodoMapper.updateToDo");
		return result;
	}

	@Override
	public int deleteToDo(SqlSession sqlSession, int todoNo) {
		int result = sqlSession.delete("TodoMapper.deleteToDo");
		return result;
	}
}
