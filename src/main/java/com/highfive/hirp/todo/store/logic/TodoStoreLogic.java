package com.highfive.hirp.todo.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.todo.domain.Memo;
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

	@Override
	public List<Memo> selectAllMemo(SqlSession sqlSession) {
		List<Memo> mList = sqlSession.selectList("TodoMapper.selectAllMemo");
		return mList;
	}

	@Override
	public int insertMemo(SqlSession sqlSession, Memo memo) {
		int result = sqlSession.insert("TodoMapper.insertMemo");
		return result;
	}

	@Override
	public int updateMemo(SqlSession sqlSession, Memo memo) {
		int result = sqlSession.update("TodoMapper.updateMemo");
		return result;
	}

	@Override
	public int deleteMemo(SqlSession sqlSession, int memoNo) {
		int result = sqlSession.delete("TodoMapper.deleteMemo");
		return result;
	}
}
