package com.highfive.hirp.board.anonymous.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.anonymous.store.AnonymousBoardStore;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.common.Search;

@Repository
public class AnonymousBoardStoreLogic implements AnonymousBoardStore {

	@Override
	public List<AnonymousBoard> selectAllAnonymous(SqlSession sqlSession, PageInfo pi) {
		List<AnonymousBoard> aList = sqlSession.selectList("anonymousboard-mapper.selectAllAnonymous",pi);
		return aList;
	}

	@Override
	public List<AnonymousBoard> selectRecommendAnonymous(SqlSession sqlSession, PageInfo pi) {
		List<AnonymousBoard> aList = sqlSession.selectList("anonymousboard-mapper.selectRecommendAnonymous",pi);
		return aList;
	}

	@Override
	public List<AnonymousBoard> selectSearchAnonymous(SqlSession sqlSession, Search search) {
		List<AnonymousBoard> aList = sqlSession.selectList("anonymousboard-mapper.selectSearchAnonymous",search);
		return aList;
	}

	@Override
	public int insertAnonymous(SqlSession sqlSession, AnonymousBoard anonymousboard) {
		int result = sqlSession.insert("anonymousboard-mapper.insertAnonymous",anonymousboard);
		return result;
	}

	@Override
	public int updateAnonymous(SqlSession sqlSession, AnonymousBoard anonymousboard) {
		int result = sqlSession.update("anonymousboard-mapper.updateAnonymous",anonymousboard);
		return result;
	}

	@Override
	public int deleteAnonymous(SqlSession sqlSession, int anonymousNo) {
		int result = sqlSession.delete("anonymousboard-mapper.deleteAnonymous",anonymousNo);
		return result;
	}

	@Override
	public int insertRecommend(SqlSession sqlSession, BoardRecommend recommend) {
		int result = sqlSession.insert("anonymousboard-mapper.insertAnonymousRecommend",recommend);
		return result;
	}

	@Override
	public int updateRecommend(SqlSession sqlSession, BoardRecommend recommend) {
		int result = sqlSession.update("anonymousboard-mapper.updateAnonymousReply",recommend);
		return result;
	}

	@Override
	public List<Reply> selectAllAnonymousReply(SqlSession sqlSession, Reply reply) {
		List<Reply> aReply = sqlSession.selectList("anonymousboard-mapper.selectAllAnonymousReply", reply);
		return aReply;
	}

	@Override
	public int insertAnonymousReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.insert("anonymousboard-mapper.insertAnonymousReply",reply);
		return result;
	}

	@Override
	public int updateAnonymousReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.update("anonymousboard-mapper.updateAnonymousReply",reply);
		return result;
	}

	@Override
	public int deleteAnonymousReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.delete("anonymousboard-mapper.deleteAnonymousReply",reply);
		return result;
	}

	@Override
	public int selectListCount(SqlSession sqlSession) {
		int result = sqlSession.selectOne("anonymousboard-mapper.selectListCount");
		return result;
	}
}