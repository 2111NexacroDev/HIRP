package com.highfive.hirp.board.free.service;

import java.util.List;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface FreeBoardService {

	//자유게시판 리스트 조회
	public List<FreeBoard> printAllFree(PageInfo pi);
	
	//자유게시판 디테일 조회
	public  FreeBoard printOneFree(int freeNo);
	//자유글 디테일 해당 첨부파일 전체 조회
	public List<BoardAttachedFile> printOneFile(FreeBoard freeboard);
	//자유게시판 검색 조회
	public List<FreeBoard>printSearchFree(Search search);
	//자유글 등록
	public int registerFree(FreeBoard FreeBoard);
	//첨부파일 저장
	public int registerFreeFile(BoardAttachedFile boardFile);
	
	//자유글 수정
	public int modifyFree(FreeBoard FreeBoard);
	//자유글 삭제
	public int removeFree(int freeNo);
	//첨부파일 삭제
	public int removeBoardFile(int fileNo);
	//자유글 개수
	public int getListCount();
	//조회수 증가
	public int viewCount(int freeNo);
	//첨부파일 수정
	public int modifyFreeFile(BoardAttachedFile bFile);
	
	
	

	
	
	
}
