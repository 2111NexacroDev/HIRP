package com.highfive.hirp.board.notice.service;

import java.util.List;

import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface NoticeBoardService {

	//공지사항 리스트 조회
	public List<NoticeBoard> printAllNotice(PageInfo pi);
		
	//공지사항 디테일 조회
	public  NoticeBoard printOneNotice(int noticeNo);
	//공지글 하나당 첨부된 첨부파일 전체 조회
	public List<BoardAttachedFile> printOneFile(NoticeBoard noticeboard);
	//공지사항 검색 조회
	public List<NoticeBoard>printSearchNotice(Search search);
	//공지글 등록
	public int registerNotice(NoticeBoard noticeboard);
	//첨부파일 저장
	public int registerNoticeFile(BoardAttachedFile boardFile);
	//공지글 수정
	public int modifyNotice(NoticeBoard noticeboard);
	//공지글 삭제
	public int removeNotice(int noticeNo);
	//첨부파일 삭제
	public int removeBoardFile(int fileNo);
	//공지글 개수
	public int getListCount();
	//조회수 증가
	public int viewCount(int noticeNo);
	
	
	
	
	//최근 공지글 조회(게시판 메인화면)
	public List<NoticeBoard> printNewestNotice();

	//첨부파일 수정
	public int modifyNoticeFile(BoardAttachedFile boardFile);

	//내가 작성한 공지게시글 조회
	public List<NoticeBoard> printMyNotice(String emplId);
	
	
	
}
