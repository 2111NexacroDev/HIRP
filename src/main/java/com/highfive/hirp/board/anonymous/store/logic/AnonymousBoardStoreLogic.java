package com.highfive.hirp.board.anonymous.store.logic;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.anonymous.store.AnonymousBoardStore;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

@Repository
public class AnonymousBoardStoreLogic implements AnonymousBoardStore {

	
	//자유게시판 전체 조회
	@Override
	public List<AnonymousBoard> selectAllAnonymous(SqlSession sqlSession, PageInfo pi) {
		// 1 -> 1 ~ 10
		// 2 -> 11 ~ 20
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<AnonymousBoard> aList = sqlSession.selectList("AnonymousBoardMapper.selectAllAnonymous",pi,rowBounds);
		return aList;
	}

	//자유게시판 하나 조회
	@Override
	public AnonymousBoard selectOneAnonymous(SqlSession sqlSession, int anonymousNo) {
		AnonymousBoard anonymousboard = sqlSession.selectOne("AnonymousBoardMapper.selectOneAnonymous",anonymousNo);
		return anonymousboard;
	}

	//게시글 디테일 첨부파일 조회
	@Override
	public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession, AnonymousBoard anonymousboard) {
		List<BoardAttachedFile> fList = sqlSession.selectOne("BoardAttachedFileMapper.selectOneFile",anonymousboard);
		return fList;
	}
	
	//자유게시판 검색 조회
	@Override
	public List<AnonymousBoard> selectSearchAnonymous(SqlSession sqlSession, Search search) {
		List<AnonymousBoard> aList = sqlSession.selectList("AnonymousBoardMapper.selectSearchAnonymous",search);
		return aList;
	}

	//게시글 등록
	@Override
	public int insertAnonymous(SqlSession sqlSession, AnonymousBoard anonymousboard) {
		int result = sqlSession.insert("AnonymousBoardMapper.insertAnonymous",anonymousboard);
		return result;
	}
	
	//첨부파일 등록
	@Override
	public int insertAnonymousFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int fileResult = sqlSession.insert("AnonymousBoardMapper.insertBoardFile",boardFile);
		return fileResult;
	}
	
	//게시글 수정
	@Override
	public int updateAnonymous(SqlSession sqlSession, AnonymousBoard anonymousboard) {
		int result = sqlSession.update("AnonymousBoardMapper.updateAnonymous",anonymousboard);
		return result;
	}

	//게시글 삭제
	@Override
	public int deleteAnonymous(SqlSession sqlSession, int anonymousNo) {
		int result = sqlSession.update("AnonymousBoardMapper.deleteAnonymous",anonymousNo);
		return result;
	}

	//게시글 개수
	@Override
	public int selectListCount(SqlSession sqlSession) {
		int result = sqlSession.selectOne("AnonymousBoardMapper.selectListCount");
		return result;
	}
	
	//조회수 증가
	@Override
	public int updateViewCount(SqlSession sqlSession, int anonymousNo) {
		int viewCount = sqlSession.update("AnonymousBoardMapper.updateCount", anonymousNo);
		return viewCount;
	}

	//첨부파일 삭제
	@Override
	public int deleteBoardFile(SqlSession sqlSession, int fileNo) {
		int result = sqlSession.delete("BoardAttachedFileMapper.deleteFile",fileNo);
		return result;
	}

	//첨부파일 수정
	@Override
	public int updateBoardFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int result = sqlSession.insert("AnonymousBoardMapper.updateBoardFile",boardFile);
		return result;
	}

}