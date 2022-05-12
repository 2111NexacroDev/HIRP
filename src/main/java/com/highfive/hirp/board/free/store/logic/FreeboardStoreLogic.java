package com.highfive.hirp.board.free.store.logic;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.free.store.FreeBoardStore;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;
@Repository
public class FreeboardStoreLogic implements FreeBoardStore {

	
	//자유게시판 전체 조회
	@Override
	public List<FreeBoard> selectAllFree(SqlSession sqlSession, PageInfo pi) {
		// 1 -> 1 ~ 10
		// 2 -> 11 ~ 20
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<FreeBoard> fList = sqlSession.selectList("FreeBoardMapper.selectAllFree",pi,rowBounds);
		return fList;
	}

	//자유게시판 하나 조회
	@Override
	public FreeBoard selectOneFree(SqlSession sqlSession, int FreeNo) {
		FreeBoard Freeboard = sqlSession.selectOne("FreeBoardMapper.selectOneFree",FreeNo);
		return Freeboard;
	}

	//게시글 디테일 첨부파일 조회
	@Override
	public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession, FreeBoard freeboard) {
		List<BoardAttachedFile> fList = sqlSession.selectOne("BoardAttachedFileMapper.selectOneFile",freeboard);
		return fList;
	}
	
	//자유게시판 검색 조회
	@Override
	public List<FreeBoard> selectSearchFree(SqlSession sqlSession, Search search) {
		List<FreeBoard> nList = sqlSession.selectList("FreeBoardMapper.selectSearchFree",search);
		return nList;
	}

	//게시글 등록
	@Override
	public int insertFree(SqlSession sqlSession, FreeBoard freeboard) {
		int result = sqlSession.insert("FreeBoardMapper.insertFree",freeboard);
		return result;
	}
	
	//첨부파일 등록
	@Override
	public int insertFreeFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int fileResult = sqlSession.insert("FreeBoardMapper.insertBoardFile",boardFile);
		return fileResult;
	}
	
	//게시글 수정
	@Override
	public int updateFree(SqlSession sqlSession, FreeBoard Freeboard) {
		int result = sqlSession.update("FreeBoardMapper.updateFree",Freeboard);
		return result;
	}

	//게시글 삭제
	@Override
	public int deleteFree(SqlSession sqlSession, int FreeNo) {
		int result = sqlSession.update("FreeBoardMapper.deleteFree",FreeNo);
		return result;
	}

	//게시글 개수
	@Override
	public int selectListCount(SqlSession sqlSession) {
		int result = sqlSession.selectOne("FreeBoardMapper.selectListCount");
		return result;
	}
	
	//조회수 증가
	@Override
	public int updateViewCount(SqlSession sqlSession, int FreeNo) {
		int viewCount = sqlSession.update("FreeBoardMapper.updateCount", FreeNo);
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
		int result = sqlSession.insert("FreeBoardMapper.updateBoardFile",boardFile);
		return result;
	}



}
