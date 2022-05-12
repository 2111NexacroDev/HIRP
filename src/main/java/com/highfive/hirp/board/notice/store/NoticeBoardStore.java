package com.highfive.hirp.board.notice.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface NoticeBoardStore {
//공지사항 게시글
	//공지사항 리스트 출력
	public List<NoticeBoard> selectAllNotice(SqlSession sqlSession,PageInfo pi);
	//첨부파일 리스트 조회
	public List<BoardAttachedFile> selectAllFile(SqlSession sqlSession);
	//공지사항 디테일 출력
	public NoticeBoard selectOneNotice(SqlSession sqlSession, int noticeNo);
	//공지글 첨부파일 디테일 출력
	public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession, NoticeBoard noticeboard);
	//공지사항 검색 리스트 출력
	public List<NoticeBoard> selectSearchNotice(SqlSession sqlSession, Search search);
	//공지사항 등록
	public int insertNotice(SqlSession sqlSession, NoticeBoard noticeboard);
	//첨부파일 저장
	public int insertNoticeFile(SqlSession sqlSession, BoardAttachedFile boardFile);
	//공지사항 수정
	public int updateNotice(SqlSession sqlSession, NoticeBoard noticeboard);
	//공지사항 삭제
	public int deleteNotice(SqlSession sqlSession, int noticeNo);
	//공지사항 리스트 개수
	public int selectListCount(SqlSession sqlSession);
	//조회수
	public int updateViewCount(SqlSession sqlSession, int noticeNo);
	
	
	
	
	

	//새로운 공지글 조회(게시판 메인)
	public List<NoticeBoard> selectNewestNotice(SqlSession sqlSession);
	//첨부파일 삭제
	public int deleteBoardFile(SqlSession sqlSession, int fileNo);
	//첨부파일 수정
	public int updateBoardFile(SqlSession sqlSession, BoardAttachedFile boardFile);
	
	
	
	//내가 작성한 공지게시글 조회
	public List<NoticeBoard> selectMyNotice(SqlSession sqlSession,String emplId);
	
	


	
	
}
