package com.highfive.hirp.board.free.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface FreeBoardStore {

	//자유게시판 리스트 출력
		public List<FreeBoard> selectAllFree(SqlSession sqlSession,PageInfo pi);
		//자유게시판 디테일 출력
		public FreeBoard selectOneFree(SqlSession sqlSession, int freeNo);
		//자유글 첨부파일 디테일 출력
		public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession, FreeBoard freeboard);
		//자유게시판 검색 리스트 출력
		public List<FreeBoard> selectSearchFree(SqlSession sqlSession, Search search);
		//자유게시판 등록
		public int insertFree(SqlSession sqlSession, FreeBoard FreeBoard);
		//첨부파일 저장
		public int insertFreeFile(SqlSession sqlSession, BoardAttachedFile boardFile);
		//자유게시판 수정
		public int updateFree(SqlSession sqlSession, FreeBoard FreeBoard);
		//자유게시판 삭제
		public int deleteFree(SqlSession sqlSession, int freeNo);
		//자유게시판 리스트 개수
		public int selectListCount(SqlSession sqlSession);
		//조회수
		public int updateViewCount(SqlSession sqlSession, int freeNo);
		
		//첨부파일 삭제
		public int deleteBoardFile(SqlSession sqlSession, int fileNo);

		public int updateBoardFile(SqlSession sqlSession, BoardAttachedFile boardFile);
		
}
