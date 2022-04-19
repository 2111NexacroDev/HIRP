package com.highfive.hirp.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.domain.NoticeBoard;
import com.highfive.hirp.board.service.NoticeService;
import com.highfive.hirp.common.Search;

@Controller
public class BoardController {

	@Autowired
	public NoticeService nService;
	
	@RequestMapping(value="notice/writeView.hirp")
	public String noticeWriteView() {
		return "notice/noticeWriteView";
	}
	
	//공지사항 전체 리스트 조회
	@RequestMapping(value="notice/list.hirp",method=RequestMethod.GET)
	public ModelAndView noticeListView(ModelAndView mv){
		List<NoticeBoard> nList = nService.printAllNotice();
		if(!nList.isEmpty()) {
			mv.addObject("nList",nList);
			mv.setViewName("notice/noticeList");
		}else {
			mv.addObject("msg","공지게시판 조회 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//공지사항 게시글 조회
	@RequestMapping(value="notice/detail.hirp",method=RequestMethod.GET)
	public ModelAndView noticeDetailView(ModelAndView mv, @RequestParam("noticeNo")int noticeNo) {
		NoticeBoard noticeboard = nService.printOneNotice(noticeNo);
		if(noticeboard != null) {
			mv.addObject("noticeboard",noticeboard);
			mv.setViewName("notice/noticeDetail");
		}else {
			mv.addObject("msg","게시글 조회 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//공지사항 검색 리스트 조회
	@RequestMapping(value="notice/searchList.hirp",method=RequestMethod.GET)
	public ModelAndView noticeSearchList(ModelAndView mv,@ModelAttribute Search search) {
		List<NoticeBoard> nList = nService.printSearchNotice(search);
		if(!nList.isEmpty()) {
			mv.addObject("nList",nList);
			mv.setViewName("notice/noticeSearchList");
		}else {
			mv.addObject("msg","검색조회 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//공지글 등록
	@RequestMapping(value="notice/register.hirp",method=RequestMethod.POST)
	public ModelAndView registerNotice(ModelAndView mv,@ModelAttribute NoticeBoard noticeboard) {
		int result = nService.registerNotice(noticeboard);
		if(result>0) {
		
			
		}
		
		return mv;
	}
}
