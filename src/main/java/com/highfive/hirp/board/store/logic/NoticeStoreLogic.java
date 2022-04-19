package com.highfive.hirp.board.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.board.domain.NoticeBoard;
import com.highfive.hirp.board.domain.Reply;
import com.highfive.hirp.common.Search;
import com.highfive.hirp.board.store.NoticeStore;

@Repository
public class NoticeStoreLogic implements NoticeStore {

	@Override
	public List<NoticeBoard> selectAllNotice(SqlSession sqlSession) {
		List<NoticeBoard> nList = sqlSession.selectList("board-mapper.selectAllNotice");
		return nList;
	}

	@Override
	public NoticeBoard selectOneNotice(SqlSession sqlSession, int noticeNo) {
		NoticeBoard noticeboard = sqlSession.selectOne("board-mapper.selectOneNotice",noticeNo);
		return noticeboard;
	}

	@Override
	public List<NoticeBoard> selectSearchNotice(SqlSession sqlSession, Search search) {
		List<NoticeBoard> nList = sqlSession.selectList("board-mapper.selectSearchNotice",search);
		return nList;
	}

	@Override
	public int insertNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.insert("board-mapper.insertNotice",noticeboard);
		return result;
	}

	@Override
	public int updateNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.update("board-mapper.updateNotice",noticeboard);
		return result;
	}

	@Override
	public int deleteNotice(SqlSession sqlSession, NoticeBoard noticeboard) {
		int result = sqlSession.delete("board-mapper.deleteNotice",noticeboard);
		return result;
	}


	@Override
	public List<Reply> selectAllNoticeReply(SqlSession sqlSession, Reply reply) {
		List<Reply> nReply = sqlSession.selectList("board-mapper.selectAllNoticeReply", reply);
		return nReply;
	}

	@Override
	public int insertNoticeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.insert("board-mapper.insertNoticeReply",reply);
		return result;
	}

	@Override
	public int updateNoticeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.update("board-mapper.updateNoticeReply",reply);
		return result;
	}

	@Override
	public int deleteNoticeReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.delete("board-mapper.deleteNoticeReply",reply);
		return result;
	}

}
