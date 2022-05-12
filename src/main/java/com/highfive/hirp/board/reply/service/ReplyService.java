package com.highfive.hirp.board.reply.service;

import java.util.List;

import com.highfive.hirp.board.reply.domain.Reply;

public interface ReplyService {
	//댓글 조회
		public List<Reply> printAllReply(Reply reply);
		//댓글 등록
		public int registerReply(Reply reply);
		//댓글 수정
		public int modifyReply(Reply reply);
		//댓글 삭제
		public int removeReply(int replyNo);
		public int addReReply(Reply reply);
}
