package com.highfive.hirp.board.notice.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.notice.service.NoticeBoardService;
import com.highfive.hirp.board.notice.store.NoticeBoardStore;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;


@Service
public class NoticeBoardServiceImpl implements NoticeBoardService {

	@Autowired
	private NoticeBoardStore nStore;
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<NoticeBoard> printAllNotice(PageInfo pi) {
		List<NoticeBoard> nList = nStore.selectAllNotice(sqlSession,pi);
		return nList;
	}

	@Override
	public NoticeBoard printNoticeDetail(int noticeNo) {
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
	public int printNoticeNo() {
		int noticeNo = nStore.selectNoticeNo(sqlSession);
		return noticeNo;
	}
	
	@Override
	public int modifyNotice(NoticeBoard noticeboard) {
		int result = nStore.updateNotice(sqlSession, noticeboard);
		return result;
	}

	@Override
	public int removeNotice(int noticeNo) {
		int result = nStore.deleteNotice(sqlSession, noticeNo);
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
	public int modifyNoticeReply(Reply reply) {
		int result = nStore.updateNoticeReply(sqlSession, reply);
		return result;
	}

	@Override
	public int removeNoticeReply(Reply reply) {
		int result = nStore.deleteNoticeReply(sqlSession, reply);
		return result;
	}

	@Override
	public int getListCount() {
		int listCount = nStore.selectListCount(sqlSession);
		return listCount;
	}

	@Override
	public int viewCount(int noticeNo) {
		int viewCount = nStore.selectViewCount(sqlSession,noticeNo);
		return viewCount;
	}

	@Override
	public int registerNoticeFile(BoardAttachedFile boardFile) {
		int fileResult = nStore.insertNoticeFile(sqlSession, boardFile);
		return fileResult;
	}





}
