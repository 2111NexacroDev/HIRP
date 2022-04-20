package com.highfive.hirp.board.anonymous.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.anonymous.service.AnonymousBoardService;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.common.Search;

public class AnonymousBoardController {
	
	@Autowired
	private AnonymousBoardService aService;
	
	@RequestMapping(value="anonymous/writeView.hirp")
	public String AnonymousWriteView(ModelAndView mv) {
		return"anonymous/anonymousWriteView";
	}
	
	//익명글 리스트 조회
	@RequestMapping(value="anonymous/list.hirp",method=RequestMethod.GET)
	public ModelAndView AnonymousListView(ModelAndView mv,@RequestParam(value="page",required=false)Integer page) {
		//등록순 조회
		
		//추천순 조회
		
		return mv;
	}
	
	//익명글 검색 조회
	@RequestMapping(value="anonymous/searchList.hirp",method=RequestMethod.GET)
	public ModelAndView AnonymousSearchList(ModelAndView mv,@ModelAttribute Search search) {
		return mv;
	}
	
	
	
	//익명글 등록
	@RequestMapping(value="anonymous/register.hirp",method=RequestMethod.POST)
	public ModelAndView Anonymousregister(ModelAndView mv
			,@ModelAttribute AnonymousBoard anonymousboard
			,@ModelAttribute BoardAttachedFile attachedFile
			,@RequestParam(value="uploadFile",required=false)MultipartFile uploadFile
			,HttpServletRequest request) {
		return mv;
	}
	
	//익명글 수정
	@RequestMapping(value="anonymous/modify.hirp",method=RequestMethod.POST)
	public ModelAndView AnonymousModify(ModelAndView mv
			,@ModelAttribute AnonymousBoard anonymousboard
			,@ModelAttribute BoardAttachedFile attachedFile
			,@RequestParam(value="reloadFile",required=false)MultipartFile reloadFile
			,HttpServletRequest request) {
		return mv;
	}
	

	//익명글 삭제
	@RequestMapping(value="anonymous/remove.hirp",method=RequestMethod.GET)
	public ModelAndView Anonymousremove(ModelAndView mv,@RequestParam("anonymousNo") int anonymousNo) {
		return mv;
	}
	
	//익명글 추천
	@RequestMapping(value="anonymous/reccomend.hirp",method=RequestMethod.GET)
	public ModelAndView AnonymousRecommend(ModelAndView mv) {
		//추천
		
		//추천 취소
		
		return mv;
	}
	
	
	//댓글 조회
	@ResponseBody
	@RequestMapping(value="anonymous/reply/list.hirp",method=RequestMethod.GET)
	public ModelAndView NoticeReplyView(ModelAndView mv, @ModelAttribute Reply reply,HttpServletResponse response) {
		return mv;
	}
	
	//댓글 등록
	@ResponseBody
	@RequestMapping(value="anonymous/reply/register.hirp",method=RequestMethod.POST)
	public ModelAndView registerNoticeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	//댓글 수정
	@ResponseBody
	@RequestMapping(value="anonymous/reply/modify.hirp",method=RequestMethod.POST)
	public ModelAndView modifyNoticeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	//댓글 삭제
	@ResponseBody
	@RequestMapping(value="anonymous/reply/remove.hirp",method=RequestMethod.GET)
	public ModelAndView removeNoticeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}

}
