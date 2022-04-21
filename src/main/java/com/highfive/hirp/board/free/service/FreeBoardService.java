package com.highfive.hirp.board.free.service;

import java.util.List;

import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.common.Search;

public interface FreeBoardService {

			//자유게시판 리스트 조회
			public List<FreeBoard> printAllFree(PageInfo pi);
			//자유게시판 디테일 조회
			public  FreeBoard printOneFree(int freeNo);
			//자유게시판 검색 조회
			public List<FreeBoard>printSearchFree(Search search);
			//자유글 등록
			public int registerFree(FreeBoard freeboard);
			//자유글 수정
			public int modifyFree(FreeBoard freeboard);
			//자유글 삭제
			public int removeFree(int freeNo);
			//자유글 개수
			public int getListCount();
			//조회수 증가
			public int viewCount(int freeNo);
			
			
			
			//댓글 조회
			public List<Reply> printAllFreeReply(Reply reply);
			//댓글 등록
			public int registerFreeReply(Reply reply);
			//댓글 수정
			public int modifyFreeReply(Reply reply);
			//댓글 삭제
			public int removeFreeReply(Reply reply);
}
