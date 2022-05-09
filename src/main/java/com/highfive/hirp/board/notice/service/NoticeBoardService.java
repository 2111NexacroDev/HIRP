package com.highfive.hirp.board.notice.service;

import java.util.List;

import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface NoticeBoardService {

	//공지사항 리스트 조회
	public List<NoticeBoard> printAllNotice(PageInfo pi);
	//첨부파일 조회
	public List<BoardAttachedFile> printAllFile();
		
	//공지사항 디테일 조회
	public  NoticeBoard printOneNotice(int noticeNo);
	//공지글 첨부파일 디테일 조회
	public List<BoardAttachedFile> printOneFile(int noticeNo);
	//공지사항 검색 조회
	public List<NoticeBoard>printSearchNotice(Search search);
	//공지글 등록
	public int registerNotice(NoticeBoard noticeboard);
	//공지번호 조회
	public int printNoticeNo();
	//첨부파일 저장
	public int registerNoticeFile(BoardAttachedFile boardFile);
	
	//공지글 수정
	public int modifyNotice(NoticeBoard noticeboard);
	//공지글 삭제
	public int removeNotice(int noticeNo);
	//공지글 개수
	public int getListCount();
	//조회수 증가
	public int viewCount(int noticeNo);
	
	
	
	//댓글 조회
	public List<Reply> printAllNoticeReply(Reply reply);
	//댓글 등록
	public int registerNoticeReply(Reply reply);
	//댓글 수정
	public int modifyNoticeReply(Reply reply);
	//댓글 삭제
	public int removeNoticeReply(int replyNo);
	public int noticeReReply(Reply reply);
	
}
