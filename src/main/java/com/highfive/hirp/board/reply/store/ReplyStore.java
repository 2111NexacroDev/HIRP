package com.highfive.hirp.board.reply.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.reply.domain.Reply;

public interface ReplyStore {
	//공지사항 댓글
		//공지사항 댓글 조회
		public List<Reply> selectAllReply(SqlSession sqlSession, Reply reply);
		//공지사항 댓글 등록
		public int insertReply(SqlSession sqlSession, Reply reply);
		//공지사항 댓글 수정
		public int updateReply(SqlSession sqlSession, Reply reply);
		//공지사항 댓글 삭제
		public int deleteReply(SqlSession sqlSession, int replyNo);
		//대댓글
		public int insertReReply(SqlSession sqlSession, Reply reply);
}
