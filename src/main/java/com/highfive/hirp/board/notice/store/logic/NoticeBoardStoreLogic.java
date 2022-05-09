package com.highfive.hirp.board.notice.store.logic;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.notice.store.NoticeBoardStore;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

@Repository
public class NoticeBoardStoreLogic implements NoticeBoardStore {

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

	@Override
	public NoticeBoard selectOneNotice(SqlSession sqlSession, int noticeNo) {
		NoticeBoard noticeboard = sqlSession.selectOne("NoticeBoardMapper.selectOneNotice",noticeNo);
		return noticeboard;
	}

	@Override
	public List<NoticeBoard> selectSearchNotice(SqlSession sqlSession, Search search) {
		List<NoticeBoard> nList = sqlSession.selectList("NoticeBoardMapper.selectSearchNotice",search);
		return nList;
	}

	@Override
	public int insertNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.insert("NoticeBoardMapper.insertNotice",noticeboard);
		return result;
	}
	
	@Override
	public int selectNoticeNo(SqlSession sqlSession) {
		int noticeNo = sqlSession.selectOne("NoticeBoardMapper.selectNoticeNo");
		return noticeNo;
	}

	@Override
	public int updateNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.update("noticeboard-mapper.updateNotice",noticeboard);
		return result;
	}

	@Override
	public int deleteNotice(SqlSession sqlSession, int noticeNo) {
		int result = sqlSession.update("NoticeBoardMapper.deleteNotice",noticeNo);
		return result;
	}

	//댓글 조회
	@Override
	public List<Reply> selectAllNoticeReply(SqlSession sqlSession, Reply reply) {
		List<Reply> nReply = sqlSession.selectList("BoardReplyMapper.selectAllNoticeReply", reply);
		return nReply;
	}
	//댓글 등록
	@Override
	public int insertNoticeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.insert("BoardReplyMapper.insertNoticeReply",reply);
		return result;
	}

	@Override
	public int updateNoticeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.update("BoardReplyMapper.updateNoticeReply",reply);
		return result;
	}
	//댓글 삭제
	@Override
	public int deleteNoticeReply(SqlSession sqlSession, int replyNo) {
		int result = sqlSession.update("BoardReplyMapper.deleteNoticeReply",replyNo);
		return result;
	}

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

	@Override
	public int insertNoticeFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int fileResult = sqlSession.insert("BoardAttachedFileMapper.insertNoticeFile",boardFile);
		return fileResult;
	}

	//첨부파일 리스트 조회
	@Override
	public List<BoardAttachedFile> selectAllFile(SqlSession sqlSession) {
		List <BoardAttachedFile> fList = sqlSession.selectList("BoardAttachedFileMapper.selectAllFile");
		return fList;
	}
	//게시글 디테일 첨부파일 조회
	@Override
	public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession, int noticeNo) {
		List<BoardAttachedFile> fList = sqlSession.selectOne("BoardAttachedFileMapper.selectOneFile");
		return fList;
	}

	@Override
	public int insertReReply(SqlSession sqlSession, Reply reply) {

		int result = sqlSession.insert("BoardReplyMapper.insertReReply",reply);

		return result;
	}



}
