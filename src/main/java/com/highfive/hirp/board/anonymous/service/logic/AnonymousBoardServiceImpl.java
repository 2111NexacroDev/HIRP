package com.highfive.hirp.board.anonymous.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.anonymous.service.AnonymousBoardService;
import com.highfive.hirp.board.anonymous.store.AnonymousBoardStore;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.common.Search;

@Service
public class AnonymousBoardServiceImpl implements AnonymousBoardService {

	@Autowired
	private AnonymousBoardStore aStore;
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<AnonymousBoard> printAllAnonymous(PageInfo pi) {
		List<AnonymousBoard> aList = aStore.selectAllAnonymous(sqlSession, pi);
		return aList;
	}

	@Override
	public List<AnonymousBoard> printRecommendAnonymous(PageInfo pi) {
		List<AnonymousBoard> aList = aStore.selectRecommendAnonymous(sqlSession,pi);
		return aList;
	}

	@Override
	public List<AnonymousBoard> printSearchAnonymous(Search search) {
		List<AnonymousBoard> aList = aStore.selectSearchAnonymous(sqlSession,search);
		return aList;
	}

	@Override
	public int registerAnonymous(AnonymousBoard anonymousboard) {
		int result = aStore.insertAnonymous(sqlSession, anonymousboard);
		return result;
	}

	@Override
	public int modifyAnonymous(AnonymousBoard anonymousboard) {
		int result = aStore.updateAnonymous(sqlSession,anonymousboard);
		return result;
	}

	@Override
	public int removeAnonymous(int anonymousNo) {
		int result = aStore.deleteAnonymous(sqlSession,anonymousNo);
		return result;
	}

	@Override
	public int registerRecommend(BoardRecommend recommend) {
		int result = aStore.insertRecommend(sqlSession,recommend);
		return result;
	}

	@Override
	public int modifyRecommend(BoardRecommend recommend) {
		int result = aStore.updateRecommend(sqlSession,recommend);
		return result;
	}

	@Override
	public List<Reply> printAllAnonymousReply(Reply reply) {
		List<Reply> aReply = aStore.selectAllAnonymousReply(sqlSession,reply);
		return aReply;
	}

	@Override
	public int registerAnonymousReply(Reply reply) {
		int result = aStore.insertAnonymousReply(sqlSession,reply);
		return result;
	}

	@Override
	public int modifyAnonymousReply(Reply reply) {
		int result = aStore.updateAnonymousReply(sqlSession,reply);
		return result;
	}

	@Override
	public int removeAnonymousReply(Reply reply) {
		int result = aStore.deleteAnonymousReply(sqlSession,reply);
		return result;
	}

	@Override
	public int getListCount() {
		int result = aStore.selectListCount(sqlSession);
		return result;
	}

}
