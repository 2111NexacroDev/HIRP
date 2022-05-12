package com.highfive.hirp.board.reply.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.board.reply.store.ReplyStore;
@Repository
public class ReplyStoreLogic implements ReplyStore{
	//댓글 조회
		@Override
		public List<Reply> selectAllReply(SqlSession sqlSession, Reply reply) {
			List<Reply> nReply = sqlSession.selectList("BoardReplyMapper.selectAllReply", reply);
			return nReply;
		}
		//댓글 등록
		@Override
		public int insertReply(SqlSession sqlSession, Reply reply) {
			int result = sqlSession.insert("BoardReplyMapper.insertReply",reply);
			return result;
		}

		//댓글 수정
		@Override
		public int updateReply(SqlSession sqlSession, Reply reply) {
			int result = sqlSession.update("BoardReplyMapper.updateReply",reply);
			return result;
		}
		//댓글 삭제
		@Override
		public int deleteReply(SqlSession sqlSession, int replyNo) {
			int result = sqlSession.update("BoardReplyMapper.deleteReply",replyNo);
			return result;
		}

		//답댓글
		@Override
		public int insertReReply(SqlSession sqlSession, Reply reply) {
			int result = sqlSession.insert("BoardReplyMapper.insertReReply",reply);
			return result;
		}
}
