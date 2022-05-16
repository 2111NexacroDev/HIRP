package com.highfive.hirp.board.anonymous.service;

import java.util.List;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface AnonymousBoardService {

	//익명게시판 리스트 조회
	public List<AnonymousBoard> printAllAnonymous(PageInfo pi);
	
	//익명게시판 디테일 조회
	public  AnonymousBoard printOneAnonymous(int anonymousNo);
	//익명글 디테일 해당 첨부파일 전체 조회
	public List<BoardAttachedFile> printOneFile(AnonymousBoard anonymousboard);
	//익명게시판 검색 조회
	public List<AnonymousBoard>printSearchAnonymous(Search search);
	//익명글 등록
	public int registerAnonymous(AnonymousBoard anonymousBoard);
	//첨부파일 저장
	public int registerAnonymousFile(BoardAttachedFile boardFile);
	
	//익명글 수정
	public int modifyAnonymous(AnonymousBoard anonymousBoard);
	//익명글 삭제
	public int removeAnonymous(int anonymousNo);
	//첨부파일 삭제
	public int removeBoardFile(int fileNo);
	//익명글 개수
	public int getListCount();
	//조회수 증가
	public int viewCount(int anonymousNo);
	//첨부파일 수정
	public int modifyAnonymousFile(BoardAttachedFile bFile);
}
