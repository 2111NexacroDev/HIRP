package com.highfive.hirp.board.notice.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.BoardPagination;
import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.notice.service.NoticeBoardService;
import com.highfive.hirp.common.Search;

@Controller
public class NoticeController {

	@Autowired
	public NoticeBoardService nService;
	
	@RequestMapping(value="notice/writeView.hirp")
	public String noticeWriteView() {
		return "notice/noticeWriteView";
	}
	
	//공지사항 전체 리스트 조회
	@RequestMapping(value="notice/list.hirp",method=RequestMethod.GET)
	public ModelAndView noticeListView(ModelAndView mv
			, @RequestParam(value="page", required=false) Integer page){
		int currentPage = (page != null) ? page : 1;
		int totalCount = nService.getListCount();
		PageInfo pi = BoardPagination.getPageInfo(currentPage, totalCount);
		List<NoticeBoard> nList = nService.printAllNotice(pi);
		if(!nList.isEmpty()) {
			mv.addObject("nList",nList);
			mv.addObject("pi",pi);
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
	@RequestMapping(value="/notice/register.kh", method=RequestMethod.POST)	
	public ModelAndView registerNotice(ModelAndView mv
			,@ModelAttribute NoticeBoard noticeboard
			,@ModelAttribute BoardAttachedFile boardFile
			,@RequestParam(value="uploadFile",required=false)MultipartFile uploadFile
			,HttpServletRequest request) {
		try {
			//프로젝트 경로에 파일 저장
			if(uploadFile !=null && !uploadFile.getOriginalFilename().equals("")) {
				HashMap<String,String> fileMap = saveFile(uploadFile,request);//업로드한 파일 저장하고 경로 리턴 
				String filePath = fileMap.get("filePath");
				String fileRename = fileMap.get("fileName");
				if(filePath !=null && !filePath.equals("")) {
					boardFile.setFileName(uploadFile.getOriginalFilename());
					boardFile.setFileRename(fileRename);
					boardFile.setFilePath(filePath);
				}
			}
			//디비에 해당 데이터 저장
			int result = nService.registerNotice(noticeboard);
			if(result > 0) {
				mv.setViewName("redirect:/notice/list.hirp");
			}else {
				mv.addObject("msg","공지사항 등록 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e){
			mv.setViewName("common/errorPage");
			mv.addObject("msg",e.toString());
		}
		return mv;
	}
	
	//공지사항 첨부파일 저장	
	public HashMap<String,String> saveFile(MultipartFile file, HttpServletRequest request) {
		String filePath="";
		HashMap<String,String> fileMap = new HashMap<String, String>();
		//파일 경로설정(상대경로)
		String root = request.getSession().getServletContext().getRealPath("resources");
		//저장 폴더 선택
		String savePath = root + "\\nuploadFiles";
		//없으면 생성
		File folder = new File(savePath);
		if(!folder.exists()) folder.mkdir();
		//날짜 포맷변경
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		//업로드한 파일명
		String originalFileName = file.getOriginalFilename();
		//파일 확장자명
		String extensionName = originalFileName.substring(originalFileName.lastIndexOf("."));
		//파일명 변경
		String renameFileName = sdf.format(new Date(System.currentTimeMillis()))+extensionName;
		filePath = folder + "\\" + renameFileName;
		//두가지 값을 map에 저장하여 리턴하기
		fileMap.put("filePath", filePath);
		fileMap.put("fileName", renameFileName);
		
		//파일저장
		try {
			file.transferTo(new File(filePath));//경로가 새로 지정될때마다 new를 해줘야한다.(파일저장)
		}catch(Exception e) {
			e.printStackTrace();
		}
		//파일경로 리턴
		return fileMap;
	}
	
	//공지글 수정
	@RequestMapping(value="/notice/modify.kh", method=RequestMethod.POST)
	public ModelAndView modifyNotice(
			ModelAndView mv
			, @ModelAttribute NoticeBoard noticeboard
			,@ModelAttribute BoardAttachedFile boardFile
			,@RequestParam(value="reloadFile",required=false) MultipartFile reloadFile
			,HttpServletRequest request) {
		try {
			//프로젝트 경로에 파일 저장(reloadFile, request),기존파일 삭제하고 새파일 업로드
			if(reloadFile !=null && !reloadFile.isEmpty()) {
				//기존 파일 삭제(기존 파일 이름 필요)
				deleteFile(boardFile.getFilePath(),request);
				//새로운 파일 업로드
				HashMap<String,String> fileMap = saveFile(reloadFile,request);//새롭게 저장
				String savePath = fileMap.get("filePath");
				String fileRename = fileMap.get("fileName");
				if(savePath !=null) {
					boardFile.setFileName(reloadFile.getOriginalFilename());
					boardFile.setFileRename(fileRename);
					boardFile.setFilePath(savePath);//경로 다시 업데이트
				}
			}
			
			//디비에 해당 데이터 저장
			int result = nService.modifyNotice(noticeboard);
			if(result > 0) {
				mv.setViewName("notice/noticeDetail");
			}else {
				//실패
				mv.addObject("msg","공지사항 수정 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e){
			mv.addObject("msg",e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//첨부파일 삭제
	public void deleteFile(String filePath, HttpServletRequest request) {
		File deleteFile = new File(filePath);
		if(deleteFile.exists()) {
			// 파일이 존재하면 파일 삭제
			deleteFile.delete();
		}
	}
	
	
	//공지글 삭제
	@RequestMapping(value="notice/remove.hirp",method=RequestMethod.POST)
	public ModelAndView removeNotice(ModelAndView mv,@RequestParam("noticeNo")int noticeNo) {
		int result = nService.removeNotice(noticeNo);
		if(result > 0) {
			mv.setViewName("notice/noticeList");
		}else {
			mv.addObject("msg","공지사항 삭제 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	
	//공지글의 댓글 조회
	@ResponseBody
	@RequestMapping(value="notice/reply/list.hirp",method=RequestMethod.GET)
	public ModelAndView NoticeReplyView(ModelAndView mv, @ModelAttribute Reply reply,HttpServletResponse response) {
		return mv;
	}
	
	//공지글의 댓글 등록
	@ResponseBody
	@RequestMapping(value="notice/reply/register.hirp",method=RequestMethod.POST)
	public ModelAndView registerNoticeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	//공지글의 댓글 수정
	@ResponseBody
	@RequestMapping(value="notice/reply/modify.hirp",method=RequestMethod.POST)
	public ModelAndView modifyNoticeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	//공지글의 댓글 삭제
	@ResponseBody
	@RequestMapping(value="notice/reply/remove.hirp",method=RequestMethod.GET)
	public ModelAndView removeNoticeReply(ModelAndView mv,@ModelAttribute Reply reply) {
		return mv;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
