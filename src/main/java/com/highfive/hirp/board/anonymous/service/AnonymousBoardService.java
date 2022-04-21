package com.highfive.hirp.board.anonymous.service;

import java.util.List;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.common.Search;

public interface AnonymousBoardService {

	//익명글 리스트 등록순 조회
	public List<AnonymousBoard> printAllAnonymous(PageInfo pi);
	//익명글 리스트 추천순 조회
	public List<AnonymousBoard> printRecommendAnonymous(PageInfo pi);
	//익명글 리스트 검색 조회
	public List<AnonymousBoard> printSearchAnonymous(Search search);
	//익명글 등록
	public int registerAnonymous(AnonymousBoard anonymousboard);
	//익명글 수정
	public int modifyAnonymous(AnonymousBoard anonymousboard);
	//익명글 삭제
	public int removeAnonymous(int anonymousNo);
	//익명글 추천
	public int registerRecommend(BoardRecommend recommend);
	//익명글 추천 여부 변경
	public int modifyRecommend(BoardRecommend recommend);
	//익명글 개수
	public int getListCount();
	//댓글 조회
	public List<Reply> printAllAnonymousReply(Reply reply);
	//댓글 등록
	public  int registerAnonymousReply(Reply reply);
	//댓글 수정
	public int modifyAnonymousReply(Reply reply);
	//댓글 삭제
	public int removeAnonymousReply(Reply reply);
}
