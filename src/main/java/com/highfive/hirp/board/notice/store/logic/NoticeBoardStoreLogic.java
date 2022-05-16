package com.highfive.hirp.board.notice.store.logic;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.notice.store.NoticeBoardStore;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

@Repository
public class NoticeBoardStoreLogic implements NoticeBoardStore {

	
	//공지게시판 전체 조회
	@Override
	public List<NoticeBoard> selectAllNotice(SqlSession sqlSession, PageInfo pi) {
		// 1 -> 1 ~ 10
		// 2 -> 11 ~ 20
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<NoticeBoard> nList = sqlSession.selectList("NoticeBoardMapper.selectAllNotice",pi,rowBounds);
		return nList;
	}

	//공지글 한개 조회
	@Override
	public NoticeBoard selectOneNotice(SqlSession sqlSession, int noticeNo) {
		NoticeBoard noticeboard = sqlSession.selectOne("NoticeBoardMapper.selectOneNotice",noticeNo);
		return noticeboard;
	}

	//공지게시판 검색 조회
	@Override
	public List<NoticeBoard> selectSearchNotice(SqlSession sqlSession, Search search) {
		List<NoticeBoard> nList = sqlSession.selectList("NoticeBoardMapper.selectSearchNotice",search);
		return nList;
	}

	//공지글 등록
	@Override
	public int insertNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.insert("NoticeBoardMapper.insertNotice",noticeboard);
		return result;
	}
	//첨부파일 등록
	@Override
	public int insertNoticeFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int fileResult = sqlSession.insert("BoardAttachedFileMapper.insertBoardFile",boardFile);
		return fileResult;
	}
	
	
	
	//공지글 수정
	@Override
	public int updateNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.update("NoticeBoardMapper.updateNotice",noticeboard);
		return result;
	}

	//공지글 삭제
	@Override
	public int deleteNotice(SqlSession sqlSession, int noticeNo) {
		int result = sqlSession.update("NoticeBoardMapper.deleteNotice",noticeNo);
		return result;
	}

	
	
	
	//전체 개수 조회
	@Override
	public int selectListCount(SqlSession sqlSession) {
		int result = sqlSession.selectOne("NoticeBoardMapper.selectListCount");
		return result;
	}
	//조회수 증가
	@Override
	public int updateViewCount(SqlSession sqlSession, int noticeNo) {
		int viewCount = sqlSession.update("NoticeBoardMapper.updateCount", noticeNo);
		return viewCount;
	}

	

	//첨부파일 리스트 조회
	@Override
	public List<BoardAttachedFile> selectAllFile(SqlSession sqlSession) {
		List <BoardAttachedFile> fList = sqlSession.selectList("BoardAttachedFileMapper.selectAllFile");
		return fList;
	}
	//공지글 한개에 첨부된 파일 전체 조회
	@Override
	public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession,NoticeBoard noticeboard) {
		List<BoardAttachedFile> fList = sqlSession.selectList("NoticeBoardMapper.selectOneFile", noticeboard);
		return fList;
	}

	

	//최신 공지게시글 조회(게시판 메인)
	@Override
	public List<NoticeBoard> selectNewestNotice(SqlSession sqlSession) {
		List<NoticeBoard> nList = sqlSession.selectList("NoticeBoardMapper.selectNewestNotice");
		return nList;
	}

	//첨부파일 삭제
	@Override
	public int deleteBoardFile(SqlSession sqlSession, int fileNo) {
		int result = sqlSession.delete("NoticeBoardMapper.deleteFile",fileNo);
		return result;
	}

	//첨부파일 수정
	@Override
	public int updateBoardFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int result = sqlSession.insert("NoticeBoardMapper.updateBoardFile",boardFile);
		return result;
	}

	//내가 작성한 공지게시글 조회
	@Override
	public List<NoticeBoard> selectMyNotice(SqlSession sqlSession,String emplId) {
		List<NoticeBoard> nList = sqlSession.selectList("NoticeBoardMapper.selectMyNotice",emplId);
		return nList;
	}


}
