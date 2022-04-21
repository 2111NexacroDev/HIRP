package com.highfive.hirp.board.anonymous.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.common.Search;

public interface AnonymousBoardStore {

	List<AnonymousBoard> selectAllAnonymous(SqlSession sqlSession, PageInfo pi);

	List<AnonymousBoard> selectRecommendAnonymous(SqlSession sqlSession, PageInfo pi);

	List<AnonymousBoard> selectSearchAnonymous(SqlSession sqlSession, Search search);

	int insertAnonymous(SqlSession sqlSession, AnonymousBoard anonymousboard);

	int updateAnonymous(SqlSession sqlSession, AnonymousBoard anonymousboard);

	int deleteAnonymous(SqlSession sqlSession, int anonymousNo);

	int insertRecommend(SqlSession sqlSession, BoardRecommend recommend);

	int updateRecommend(SqlSession sqlSession, BoardRecommend recommend);

	List<Reply> selectAllAnonymousReply(SqlSession sqlSession, Reply reply);

	int insertAnonymousReply(SqlSession sqlSession, Reply reply);

	int updateAnonymousReply(SqlSession sqlSession, Reply reply);

	int deleteAnonymousReply(SqlSession sqlSession, Reply reply);

	int selectListCount(SqlSession sqlSession);

}
