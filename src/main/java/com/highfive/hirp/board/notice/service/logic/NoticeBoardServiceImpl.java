package com.highfive.hirp.board.notice.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.notice.service.NoticeBoardService;
import com.highfive.hirp.board.notice.store.NoticeBoardStore;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;


@Service
public class NoticeBoardServiceImpl implements NoticeBoardService {

	@Autowired
	private NoticeBoardStore nStore;
	
	@Autowired
	private SqlSession sqlSession;
	//전체 공지글 리스트 조회
	@Override
	public List<NoticeBoard> printAllNotice(PageInfo pi) {
		List<NoticeBoard> nList = nStore.selectAllNotice(sqlSession,pi);
		return nList;
	}
	//공지글 한개 조회
	@Override
	public NoticeBoard printOneNotice(int noticeNo) {
		NoticeBoard noticeboard = nStore.selectOneNotice(sqlSession,noticeNo);
		return noticeboard;
	}
	//공지글 검색 조회
	@Override
	public List<NoticeBoard> printSearchNotice(Search search) {
		List<NoticeBoard> nList = nStore.selectSearchNotice(sqlSession,search);
		return nList;
	}
	//게시글 하나당 첨부된 첨부파일 전체 조회
	@Override
	public List<BoardAttachedFile> printOneFile(NoticeBoard noticeboard) {
		List<BoardAttachedFile> fList = nStore.selectOneFile(sqlSession,noticeboard);
		return fList;
	}

	//공지 등록
	@Override
	public int registerNotice(NoticeBoard noticeboard) {
		int result = nStore.insertNotice(sqlSession, noticeboard);
		return result;
	}
	//첨부파일 등록
	@Override
	public int registerNoticeFile(BoardAttachedFile boardFile) {
		int fileResult = nStore.insertNoticeFile(sqlSession, boardFile);
		return fileResult;
	}

	//공지글 수정
	@Override
	public int modifyNotice(NoticeBoard noticeboard) {
		int result = nStore.updateNotice(sqlSession, noticeboard);
		return result;
	}
	//공지글 삭제
	@Override
	public int removeNotice(int noticeNo) {
		int result = nStore.deleteNotice(sqlSession, noticeNo);
		return result;
	}
	
	//첨부파일 삭제
	@Override
	public int removeBoardFile(int fileNo) {
		int result = nStore.deleteBoardFile(sqlSession,fileNo);
		return result;
	}
	
	
	//전체 리스트 개수 조회
	@Override
	public int getListCount() {
		int listCount = nStore.selectListCount(sqlSession);
		return listCount;
	}
	//조회수 증가
	@Override
	public int viewCount(int noticeNo) {
		int viewCount = nStore.updateViewCount(sqlSession,noticeNo);
		return viewCount;
	}
	
	
	
	

	//최신 공지 게시글 조회(메인)
	@Override
	public List<NoticeBoard> printNewestNotice() {
		List<NoticeBoard> nList = nStore.selectNewestNotice(sqlSession);
		return nList;
	}
	@Override
	public int modifyNoticeFile(BoardAttachedFile boardFile) {
		int result = nStore.updateBoardFile(sqlSession, boardFile);
		return result;
	}
	
	//내가 작성한 공지게시글 조회
	@Override
	public List<NoticeBoard> printMyNotice(String emplId) {
		List<NoticeBoard> nList = nStore.selectMyNotice(sqlSession,emplId);
		return nList;
	}
	
	

	
	





}
