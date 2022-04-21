package com.highfive.hirp.board.free.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface FreeBoardStore {

	List<FreeBoard> selectAllFree(SqlSession sqlSession, PageInfo pi);

	FreeBoard selectOneFree(SqlSession sqlSession, int freeNo);

	List<FreeBoard> selectSearchFree(SqlSession sqlSession, Search search);

	int insertFree(SqlSession sqlSession, FreeBoard freeboard);

	int updateFree(SqlSession sqlSession, FreeBoard freeboard);

	int deleteFree(SqlSession sqlSession, int freeNo);

	int selectListCount(SqlSession sqlSession);

	int selectViewCount(SqlSession sqlSession, int freeNo);

	List<Reply> selectAllFreeReply(SqlSession sqlSession, Reply reply);

	int insertFreeReply(SqlSession sqlSession, Reply reply);

	int updateFreeReply(SqlSession sqlSession, Reply reply);

	int deleteFreeReply(SqlSession sqlSession, Reply reply);

}
