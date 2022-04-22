package com.highfive.hirp.board.free.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.free.store.FreeBoardStore;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public class FreeboardStoreLogic implements FreeBoardStore {

	@Override
	public List<FreeBoard> selectAllFree(SqlSession sqlSession, PageInfo pi) {
		List<FreeBoard> fList = sqlSession.selectList("freeboard-mapper.selectAllFree",pi);
		return fList;
	}

	@Override
	public FreeBoard selectOneFree(SqlSession sqlSession, int freeNo) {
		FreeBoard freeboard = sqlSession.selectOne("freeboard-mapper.selectOneFree",freeNo);
		return freeboard;
	}

	@Override
	public List<FreeBoard> selectSearchFree(SqlSession sqlSession, Search search) {
		List<FreeBoard> fList = sqlSession.selectList("freeboard-mapper.selectSearchFree",search);
		return fList;
	}

	@Override
	public int insertFree(SqlSession sqlSession, FreeBoard freeboard) {
		int result = sqlSession.insert("dfreeboard-mapper.insertFree",freeboard);
		return result;
	}

	@Override
	public int updateFree(SqlSession sqlSession, FreeBoard freeboard) {
		int result = sqlSession.update("freeboard-mapper.updateFree",freeboard);
		return result;
	}

	@Override
	public int deleteFree(SqlSession sqlSession, int freeNo) {
		int result = sqlSession.delete("freeboard-mapper.deleteFree",freeNo);
		return result;
	}

	@Override
	public int selectListCount(SqlSession sqlSession) {
		int result = sqlSession.selectOne("freeboard-mapper.selectListCount");
		return result;
	}

	@Override
	public int selectViewCount(SqlSession sqlSession, int freeNo) {
		int result = sqlSession.update("freeboard-mapper.updateViewCount");
		return result;
	}

	@Override
	public List<Reply> selectAllFreeReply(SqlSession sqlSession, Reply reply) {
		List<Reply> nReply = sqlSession.selectList("freeboard-mapper.selectAllFreeReply", reply);
		return nReply;
	}

	@Override
	public int insertFreeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.insert("freeboard-mapper.insertFreeReply",reply);
		return result;
	}

	@Override
	public int updateFreeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.update("freeboard-mapper.updateFreeReply",reply);
		return result;
	}

	@Override
	public int deleteFreeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.delete("freeboard-mapper.deleteFreeReply",reply);
		return result;
	}

}
