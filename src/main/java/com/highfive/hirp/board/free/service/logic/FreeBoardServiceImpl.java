package com.highfive.hirp.board.free.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.free.service.FreeBoardService;
import com.highfive.hirp.board.free.store.FreeBoardStore;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.free.store.FreeBoardStore;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.free.store.FreeBoardStore;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;
@Service
public class FreeBoardServiceImpl implements FreeBoardService{

	@Autowired
	private FreeBoardStore fStore;
	
	@Autowired
	private SqlSession sqlSession;

	//자유게시판 전체 조회
	@Override
	public List<FreeBoard> printAllFree(PageInfo pi) {
		List<FreeBoard> fList = fStore.selectAllFree(sqlSession,pi);
		return fList;
	}
	//자유게시판 하나 조회
	@Override
	public FreeBoard printOneFree(int FreeNo) {
		FreeBoard FreeBoard = fStore.selectOneFree(sqlSession,FreeNo);
		return FreeBoard;
	}
	
	//게시글 디테일 첨부파일 조회
	@Override
	public List<BoardAttachedFile> printOneFile(FreeBoard freeboard) {
		List<BoardAttachedFile> fList = fStore.selectOneFile(sqlSession,freeboard);
		return fList;
	}
	
	//자유게시판 검색 조회
	@Override
	public List<FreeBoard> printSearchFree(Search search) {
		List<FreeBoard> fList = fStore.selectSearchFree(sqlSession,search);
		return fList;
	}

	//자유게시판 등록
	@Override
	public int registerFree(FreeBoard FreeBoard) {
		int result = fStore.insertFree(sqlSession, FreeBoard);
		return result;
	}
	//첨부파일 등록
	@Override
	public int registerFreeFile(BoardAttachedFile boardFile) {
		int fileResult = fStore.insertFreeFile(sqlSession, boardFile);
		return fileResult;
	}

	//자유게시판 수정
	@Override
	public int modifyFree(FreeBoard FreeBoard) {
		int result = fStore.updateFree(sqlSession, FreeBoard);
		return result;
	}

	//자유게시판 삭제
	@Override
	public int removeFree(int FreeNo) {
		int result = fStore.deleteFree(sqlSession, FreeNo);
		return result;
	}

	//첨부파일 삭제
	@Override
	public int removeBoardFile(int fileNo) {
		int result = fStore.deleteBoardFile(sqlSession,fileNo);
		return result;
	}
	
	//게시글 개수 조회
	@Override
	public int getListCount() {
		int listCount = fStore.selectListCount(sqlSession);
		return listCount;
	}
	//조회수 증가
	@Override
	public int viewCount(int FreeNo) {
		int viewCount = fStore.updateViewCount(sqlSession,FreeNo);
		return viewCount;
	}
	@Override
	public int modifyFreeFile(BoardAttachedFile bFile) {
		int result = fStore.updateBoardFile(sqlSession, bFile);
		return result;
	}


}
