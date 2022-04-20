package com.highfive.hirp.board.department.controller;

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
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.department.service.DepartmentBoardService;
import com.highfive.hirp.common.Search;

public class DepartmentBoardController {

	@Autowired
	private DepartmentBoardService dService;
	
	@RequestMapping(value="department/writeView.hirp")
	public String DepartmentWriteView(ModelAndView mv) {
		return"anonymous/anonymousWriteView";
	}
	//부서글 전체 조회
	@RequestMapping(value="department/list.hirp",method=RequestMethod.GET)
	public ModelAndView DepartmentListView(ModelAndView mv,@RequestParam(value="page",required=false)Integer page) {
		return mv;
	}
	
	//부서글 디테일 조회
	@RequestMapping(value="department/detail.hirp",method=RequestMethod.GET)
	public ModelAndView DepartmentDetailView(ModelAndView mv, @RequestParam("departmentNo")int departmentNo) {
		return mv;
	}
	
	//부서글 검색 조회
	@RequestMapping(value="department/searchList.hirp",method=RequestMethod.GET)
	public ModelAndView DepartmentSearchList(ModelAndView mv,@ModelAttribute Search search) {
		return mv;
	}

	//부서글 작성
	@RequestMapping(value="department/register.hirp",method=RequestMethod.POST)
	public ModelAndView DepartmentRegister(ModelAndView mv
			,@ModelAttribute DepartmentBoard anonymousboard
			,@ModelAttribute BoardAttachedFile attachedFile
			,@RequestParam(value="uploadFile",required=false)MultipartFile uploadFile
			,HttpServletRequest request) {
		return mv;
	}
	
	//부서글 수정
	@RequestMapping(value="department/modify.hirp",method=RequestMethod.POST)
	public ModelAndView departmentModify(ModelAndView mv
			,@ModelAttribute DepartmentBoard anonymousboard
			,@ModelAttribute BoardAttachedFile attachedFile
			,@RequestParam(value="reloadFile",required=false)MultipartFile reloadFile
			,HttpServletRequest request) {
		return mv;
	}
	
	//부서글 삭제
		@RequestMapping(value="department/remove.hirp",method=RequestMethod.GET)
		public ModelAndView DepartmentRemove(ModelAndView mv,@RequestParam("departmentNo") int departmentNo) {
			return mv;
		}
	
	
	//댓글 조회
	@ResponseBody
	@RequestMapping(value="department/reply/list.hirp",method=RequestMethod.GET)
	public ModelAndView DepartmentReplyView(ModelAndView mv, @ModelAttribute Reply reply,HttpServletResponse response) {
		return mv;
	}
	
	//댓글 등록
	@ResponseBody
	@RequestMapping(value="department/reply/register.hirp",method=RequestMethod.POST)
	public ModelAndView registerDepartmentReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	//댓글 수정
	@ResponseBody
	@RequestMapping(value="department/reply/modify.hirp",method=RequestMethod.POST)
	public ModelAndView modifyDepartmentReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	//댓글 삭제
	@ResponseBody
	@RequestMapping(value="department/reply/remove.hirp",method=RequestMethod.GET)
	public ModelAndView removeDepartmentReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}

}
