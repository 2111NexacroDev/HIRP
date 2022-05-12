package com.highfive.hirp.board.reply.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.board.notice.store.NoticeBoardStore;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.board.reply.service.ReplyService;
import com.highfive.hirp.board.reply.store.ReplyStore;
@Service
public class ReplyServiceImpl implements ReplyService{
	
	@Autowired
	private ReplyStore rStore;
	
	@Autowired
	private SqlSession sqlSession;
	
	
	
	//댓글 전체 조회
		@Override
		public List<Reply> printAllReply(Reply reply) {
			List<Reply> nReply = rStore.selectAllReply(sqlSession,reply);
			return nReply;
		}
		//댓글 등록
		@Override
		public int registerReply(Reply reply) {
			int result = rStore.insertReply(sqlSession, reply);
			return result;
		}
		//댓글 수정
		@Override
		public int modifyReply(Reply reply) {
			int result = rStore.updateReply(sqlSession, reply);
			return result;
		}
		//댓글 삭제
		@Override
		public int removeReply(int replyNo) {
			int result = rStore.deleteReply(sqlSession, replyNo);
			return result;
		}
	
	
	
	//답글
		@Override
		public int addReReply(Reply reply) {
			int result = rStore.insertReReply(sqlSession,reply);
			return result;
		}
}
