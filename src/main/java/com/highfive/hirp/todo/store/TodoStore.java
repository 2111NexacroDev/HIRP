package com.highfive.hirp.todo.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.todo.domain.Memo;
import com.highfive.hirp.todo.domain.Todo;

public interface TodoStore {

	List<Todo> selectAllToDo(SqlSession sqlSession, String emplId);
	List<Todo> selectToDoByDate(SqlSession sqlSession, Todo todo);
	List<Todo> selectFinishedToDo(SqlSession sqlSession, String emplId);
	int insertToDo(SqlSession sqlSession, Todo todo);
	int updateToDo(SqlSession sqlSession, Todo todo);
	int checkedToDo(SqlSession sqlSession, Todo todo);
	int deleteToDo(SqlSession sqlSession, int todoNo);
	
	List<Memo> selectAllMemo(SqlSession sqlSession, String emplId);
	int insertMemo(SqlSession sqlSession, Memo memo);
	int updateMemo(SqlSession sqlSession, Memo memo);
	int deleteMemo(SqlSession sqlSession, int memoNo);

}
