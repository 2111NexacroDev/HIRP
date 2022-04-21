package com.highfive.hirp.board.free.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.free.service.FreeBoardService;
import com.highfive.hirp.board.free.store.FreeBoardStore;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.notice.store.NoticeBoardStore;
import com.highfive.hirp.common.Search;

public class FreeBoardServiceImpl implements FreeBoardService{

	@Autowired
	private FreeBoardStore fStore;
	
	@Autowired
	private SqlSession sqlSession;

	
	@Override
	public List<FreeBoard> printAllFree(PageInfo pi) {
		List<FreeBoard> fList = fStore.selectAllFree(sqlSession,pi);
		return fList;
	}

	@Override
	public FreeBoard printOneFree(int freeNo) {
		FreeBoard freeboard = fStore.selectOneFree(sqlSession,freeNo);
		return freeboard;
	}

	@Override
	public List<FreeBoard> printSearchFree(Search search) {
		List<FreeBoard> fList = fStore.selectSearchFree(sqlSession,search);
		return fList;
	}

	@Override
	public int registerFree(FreeBoard freeboard) {
		int result = fStore.insertFree(sqlSession, freeboard);
		return result;
	}

	@Override
	public int modifyFree(FreeBoard freeboard) {
		int result = fStore.updateFree(sqlSession, freeboard);
		return result;
	}

	@Override
	public int removeFree(int freeNo) {
		int result = fStore.deleteFree(sqlSession, freeNo);
		return result;
	}

	@Override
	public int getListCount() {
		int listCount = fStore.selectListCount(sqlSession);
		return listCount;
	}

	@Override
	public int viewCount(int freeNo) {
		int viewCount = fStore.selectViewCount(sqlSession,freeNo);
		return viewCount;
	}

	@Override
	public List<Reply> printAllFreeReply(Reply reply) {
		List<Reply> nReply = fStore.selectAllFreeReply(sqlSession,reply);
		return nReply;
	}

	@Override
	public int registerFreeReply(Reply reply) {
		int result = fStore.insertFreeReply(sqlSession, reply);
		return result;
	}

	@Override
	public int modifyFreeReply(Reply reply) {
		int result = fStore.updateFreeReply(sqlSession, reply);
		return result;
	}

	@Override
	public int removeFreeReply(Reply reply) {
		int result = fStore.deleteFreeReply(sqlSession, reply);
		return result;
	}

}
