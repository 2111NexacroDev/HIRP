package com.highfive.hirp.board.service;

import java.util.List;

import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.domain.NoticeBoard;
import com.highfive.hirp.board.domain.Reply;
import com.highfive.hirp.common.Search;

public interface NoticeService {

	//공지사항 리스트 조회
	public List<NoticeBoard> printAllNotice();
	//공지사항 디테일 조회
	public  NoticeBoard printOneNotice(int noticeNo);
	//공지사항 검색 조회
	public List<NoticeBoard>printSearchNotice(Search search);
	//공지사항 등록
	public int registerNotice(NoticeBoard noticeboard);
	//공지사항 수정
	public int modifyNotice(NoticeBoard noticeboard);
	//공지사항 삭제
	public int removeNotice(NoticeBoard noticeboard);
	
	
	//댓글 조회
	public List<Reply> printAllNoticeReply(Reply reply);
	//댓글 등록
	public int registerNoticeReply(Reply reply);
	//댓글 수정
	public int modifyNotice(Reply reply);
	//댓글 삭제
	public int removeNotice(Reply reply);
	
}
