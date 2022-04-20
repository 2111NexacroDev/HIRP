package com.highfive.hirp.board.notice.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.common.Search;

public interface NoticeBoardStore {
//공지사항 게시글
	//공지사항 리스트 출력
	public List<NoticeBoard> selectAllNotice(SqlSession sqlSession,PageInfo pi);
	//공지사항 디테일 출력
	public NoticeBoard selectOneNotice(SqlSession sqlSession, int noticeNo);
	//공지사항 검색 리스트 출력
	public List<NoticeBoard> selectSearchNotice(SqlSession sqlSession, Search search);
	//공지사항 등록
	public int insertNotice(SqlSession sqlSession, NoticeBoard noticeboard);
	//공지사항 수정
	public int updateNotice(SqlSession sqlSession, NoticeBoard noticeboard);
	//공지사항 삭제
	public int deleteNotice(SqlSession sqlSession, int noticeNo);
	//공지사항 리스트 개수
	public int selectListCount(SqlSession sqlSession);
	//조회수
	public int selectViewCount(SqlSession sqlSession, int noticeNo);
	
	
	
	
	
//공지사항 댓글
	//공지사항 댓글 조회
	public List<Reply> selectAllNoticeReply(SqlSession sqlSession, Reply reply);
	//공지사항 댓글 등록
	public int insertNoticeReply(SqlSession sqlSession, Reply reply);
	//공지사항 댓글 수정
	public int updateNoticeReply(SqlSession sqlSession, Reply reply);
	//공지사항 댓글 삭제
	public int deleteNoticeReply(SqlSession sqlSession, Reply reply);

}
