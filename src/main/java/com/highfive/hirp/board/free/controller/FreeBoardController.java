package com.highfive.hirp.board.free.controller;

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

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.free.service.FreeBoardService;
import com.highfive.hirp.common.Search;

public class FreeBoardController {

	@Autowired
	private FreeBoardService dService;
	
	@RequestMapping(value="free/writeView.hirp")
	public String freeWriteView(ModelAndView mv) {
		return"anonymous/anonymousWriteView";
	}
	//부서글 전체 조회
	@RequestMapping(value="free/list.hirp",method=RequestMethod.GET)
	public ModelAndView freeListView(ModelAndView mv,@RequestParam(value="page",required=false)Integer page) {
		return mv;
	}
	
	//부서글 디테일 조회
	@RequestMapping(value="free/detail.hirp",method=RequestMethod.GET)
	public ModelAndView freeDetailView(ModelAndView mv, @RequestParam("freeNo")int freeNo) {
		return mv;
	}
	
	//부서글 검색 조회
	@RequestMapping(value="free/searchList.hirp",method=RequestMethod.GET)
	public ModelAndView freeSearchList(ModelAndView mv,@ModelAttribute Search search) {
		return mv;
	}

	//부서글 작성
	@RequestMapping(value="free/register.hirp",method=RequestMethod.POST)
	public ModelAndView freeRegister(ModelAndView mv
			,@ModelAttribute FreeBoard anonymousboard
			,@ModelAttribute BoardAttachedFile attachedFile
			,@RequestParam(value="uploadFile",required=false)MultipartFile uploadFile
			,HttpServletRequest request) {
		return mv;
	}
	
	//부서글 수정
	@RequestMapping(value="free/modify.hirp",method=RequestMethod.POST)
	public ModelAndView freeModify(ModelAndView mv
			,@ModelAttribute FreeBoard anonymousboard
			,@ModelAttribute BoardAttachedFile attachedFile
			,@RequestParam(value="reloadFile",required=false)MultipartFile reloadFile
			,HttpServletRequest request) {
		return mv;
	}
	
	//부서글 삭제
		@RequestMapping(value="free/remove.hirp",method=RequestMethod.GET)
		public ModelAndView freeRemove(ModelAndView mv,@RequestParam("freeNo") int freeNo) {
			return mv;
		}
	
	
	//댓글 조회
	@ResponseBody
	@RequestMapping(value="free/reply/list.hirp",method=RequestMethod.GET)
	public ModelAndView freeReplyView(ModelAndView mv, @ModelAttribute Reply reply,HttpServletResponse response) {
		return mv;
	}
	
	//댓글 등록
	@ResponseBody
	@RequestMapping(value="free/reply/register.hirp",method=RequestMethod.POST)
	public ModelAndView registerfreeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	//댓글 수정
	@ResponseBody
	@RequestMapping(value="free/reply/modify.hirp",method=RequestMethod.POST)
	public ModelAndView modifyfreeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	//댓글 삭제
	@ResponseBody
	@RequestMapping(value="free/reply/remove.hirp",method=RequestMethod.GET)
	public ModelAndView removefreeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	
}
