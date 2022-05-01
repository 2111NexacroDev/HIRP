package com.highfive.hirp.board.notice.store.logic;

import java.util.List;

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
		List<NoticeBoard> nList = sqlSession.selectList("noticeboard-mapper.selectAllNotice",pi);
		return nList;
	}

	@Override
	public NoticeBoard selectOneNotice(SqlSession sqlSession, int noticeNo) {
		NoticeBoard noticeboard = sqlSession.selectOne("noticeboard-mapper.selectOneNotice",noticeNo);
		return noticeboard;
	}

	@Override
	public List<NoticeBoard> selectSearchNotice(SqlSession sqlSession, Search search) {
		List<NoticeBoard> nList = sqlSession.selectList("noticeboard-mapper.selectSearchNotice",search);
		return nList;
	}

	@Override
	public int insertNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.insert("NoticeBoardMapper.insertNotice",noticeboard);
		return result;
	}
	
	@Override
	public int selectNoticeNo(SqlSession sqlSession, NoticeBoard noticeboard) {
		int noticeNo = sqlSession.selectOne("NoticeBoardMapper.selectNoticeNo", noticeboard);
		return noticeNo;
	}

	@Override
	public int updateNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.update("noticeboard-mapper.updateNotice",noticeboard);
		return result;
	}

	@Override
	public int deleteNotice(SqlSession sqlSession, int noticeNo) {
		int result = sqlSession.delete("noticeboard-mapper.deleteNotice",noticeNo);
		return result;
	}


	@Override
	public List<Reply> selectAllNoticeReply(SqlSession sqlSession, Reply reply) {
		List<Reply> nReply = sqlSession.selectList("noticeboard-mapper.selectAllNoticeReply", reply);
		return nReply;
	}

	@Override
	public int insertNoticeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.insert("noticeboard-mapper.insertNoticeReply",reply);
		return result;
	}

	@Override
	public int updateNoticeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.update("noticeboard-mapper.updateNoticeReply",reply);
		return result;
	}

	@Override
	public int deleteNoticeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.delete("noticeboard-mapper.deleteNoticeReply",reply);
		return result;
	}

	@Override
	public int selectListCount(SqlSession sqlSession) {
		int result = sqlSession.selectOne("noticeboard-mapper.selectListCount");
		return result;
	}

	@Override
	public int selectViewCount(SqlSession sqlSession, int noticeNo) {
		int result = sqlSession.update("noticeboard-mapper.updateViewCount");
		return result;
	}

	@Override
	public int insertNoticeFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int fileResult = sqlSession.insert("NoticeBoardMapper.insertNoticeFile",boardFile);
		return fileResult;
	}



}
