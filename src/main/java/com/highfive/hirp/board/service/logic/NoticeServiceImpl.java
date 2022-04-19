package com.highfive.hirp.board.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.domain.NoticeBoard;
import com.highfive.hirp.board.domain.Reply;

import com.highfive.hirp.board.service.NoticeService;
import com.highfive.hirp.board.store.NoticeStore;
import com.highfive.hirp.common.Search;


@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeStore nStore;
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<NoticeBoard> printAllNotice() {
		List<NoticeBoard> nList = nStore.selectAllNotice(sqlSession);
		return nList;
	}

	@Override
	public NoticeBoard printOneNotice(int noticeNo) {
		NoticeBoard noticeboard = nStore.selectOneNotice(sqlSession,noticeNo);
		return noticeboard;
	}

	@Override
	public List<NoticeBoard> printSearchNotice(Search search) {
		List<NoticeBoard> nList = nStore.selectSearchNotice(sqlSession,search);
		return nList;
	}

	@Override
	public int registerNotice(NoticeBoard noticeboard) {
		int result = nStore.insertNotice(sqlSession, noticeboard);
		return result;
	}

	@Override
	public int modifyNotice(NoticeBoard noticeboard) {
		int result = nStore.updateNotice(sqlSession, noticeboard);
		return result;
	}

	@Override
	public int removeNotice(NoticeBoard noticeboard) {
		int result = nStore.deleteNotice(sqlSession, noticeboard);
		return result;
	}

	@Override
	public List<Reply> printAllNoticeReply(Reply reply) {
		List<Reply> nReply = nStore.selectAllNoticeReply(sqlSession,reply);
		return nReply;
	}

	@Override
	public int registerNoticeReply(Reply reply) {
		int result = nStore.insertNoticeReply(sqlSession, reply);
		return result;
	}

	@Override
	public int modifyNotice(Reply reply) {
		int result = nStore.updateNoticeReply(sqlSession, reply);
		return result;
	}

	@Override
	public int removeNotice(Reply reply) {
		int result = nStore.deleteNoticeReply(sqlSession, reply);
		return result;
	}


}
