package com.highfive.hirp.board.anonymous.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface AnonymousBoardStore {

	//익명게시판 리스트 출력
			public List<AnonymousBoard> selectAllAnonymous(SqlSession sqlSession,PageInfo pi);
			//익명게시판 디테일 출력
			public AnonymousBoard selectOneAnonymous(SqlSession sqlSession, int anonymousNo);
			//익명글 첨부파일 디테일 출력
			public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession, AnonymousBoard anonymousboard);
			//익명게시판 검색 리스트 출력
			public List<AnonymousBoard> selectSearchAnonymous(SqlSession sqlSession, Search search);
			//익명게시판 등록
			public int insertAnonymous(SqlSession sqlSession, AnonymousBoard anonymousboard);
			//첨부파일 저장
			public int insertAnonymousFile(SqlSession sqlSession, BoardAttachedFile boardFile);
			//익명게시판 수정
			public int updateAnonymous(SqlSession sqlSession, AnonymousBoard anonymousboard);
			//익명게시판 삭제
			public int deleteAnonymous(SqlSession sqlSession, int anonymousNo);
			//익명게시판 리스트 개수
			public int selectListCount(SqlSession sqlSession);
			//조회수
			public int updateViewCount(SqlSession sqlSession, int anonymousNo);
			
			//첨부파일 삭제
			public int deleteBoardFile(SqlSession sqlSession, int fileNo);

			public int updateBoardFile(SqlSession sqlSession, BoardAttachedFile boardFile);

}
