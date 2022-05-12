package com.highfive.hirp.board.anonymous.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.anonymous.service.AnonymousBoardService;
import com.highfive.hirp.board.anonymous.store.AnonymousBoardStore;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

@Service
public class AnonymousBoardServiceImpl implements AnonymousBoardService {

	@Autowired
	private AnonymousBoardStore aStore;
	
	@Autowired
	private SqlSession sqlSession;
	
	//자유게시판 전체 조회
		@Override
		public List<AnonymousBoard> printAllAnonymous(PageInfo pi) {
			List<AnonymousBoard> aList = aStore.selectAllAnonymous(sqlSession,pi);
			return aList;
		}
		//자유게시판 하나 조회
		@Override
		public AnonymousBoard printOneAnonymous(int AnonymousNo) {
			AnonymousBoard anonymousboard = aStore.selectOneAnonymous(sqlSession,AnonymousNo);
			return anonymousboard;
		}
		
		//게시글 디테일 첨부파일 조회
		@Override
		public List<BoardAttachedFile> printOneFile(AnonymousBoard anonymousboard) {
			List<BoardAttachedFile> aList = aStore.selectOneFile(sqlSession,anonymousboard);
			return aList;
		}
		
		//자유게시판 검색 조회
		@Override
		public List<AnonymousBoard> printSearchAnonymous(Search search) {
			List<AnonymousBoard> aList = aStore.selectSearchAnonymous(sqlSession,search);
			return aList;
		}

		//자유게시판 등록
		@Override
		public int registerAnonymous(AnonymousBoard anonymousboard) {
			int result = aStore.insertAnonymous(sqlSession, anonymousboard);
			return result;
		}
		//첨부파일 등록
		@Override
		public int registerAnonymousFile(BoardAttachedFile boardFile) {
			int fileResult = aStore.insertAnonymousFile(sqlSession, boardFile);
			return fileResult;
		}

		//자유게시판 수정
		@Override
		public int modifyAnonymous(AnonymousBoard anonymousboard) {
			int result = aStore.updateAnonymous(sqlSession, anonymousboard);
			return result;
		}

		//자유게시판 삭제
		@Override
		public int removeAnonymous(int anonymousNo) {
			int result = aStore.deleteAnonymous(sqlSession, anonymousNo);
			return result;
		}

		//첨부파일 삭제
		@Override
		public int removeBoardFile(int fileNo) {
			int result = aStore.deleteBoardFile(sqlSession,fileNo);
			return result;
		}
		
		//게시글 개수 조회
		@Override
		public int getListCount() {
			int listCount = aStore.selectListCount(sqlSession);
			return listCount;
		}
		//조회수 증가
		@Override
		public int viewCount(int anonymousNo) {
			int viewCount = aStore.updateViewCount(sqlSession,anonymousNo);
			return viewCount;
		}
		@Override
		public int modifyAnonymousFile(BoardAttachedFile bFile) {
			int result = aStore.updateBoardFile(sqlSession, bFile);
			return result;
		}


}
