package com.highfive.hirp.board.notice.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.BoardPagination;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.notice.service.NoticeBoardService;

import com.highfive.hirp.common.SaveAttachedFile;

import com.highfive.hirp.common.PageInfo;

import com.highfive.hirp.common.Search;

@Controller
public class NoticeController {

	@Autowired
	public NoticeBoardService nService;

	@RequestMapping(value = "board/main.hirp")
	public String boardMain() {
		return "/board/boardMain";
	}

	@RequestMapping(value = "board/writeView.hirp")
	public String boardWriteView() {
		return "/board/boardWriteView";
	}

	
	
	
	
	// 공지사항 전체 리스트 조회
	@RequestMapping(value = "/notice/list.hirp", method = RequestMethod.GET)
	public ModelAndView noticeListView(ModelAndView mv, @RequestParam(value = "page", required = false) Integer page) {
		int currentPage = (page != null) ? page : 1;
		int totalCount = nService.getListCount();
		PageInfo pi = BoardPagination.getPageInfo(currentPage, totalCount);
		//공지 테이블 조회
		List<NoticeBoard> nList = nService.printAllNotice(pi);
		if (!nList.isEmpty()) {
			mv.addObject("nList", nList);
			mv.addObject("pi", pi);
			mv.setViewName("board/noticeBoard/noticeListView");
		} else {
			mv.addObject("msg", "공지게시판 조회 실패");
			mv.setViewName("common/errorPage");
		}
		//첨부파일 테이블 조회
		List<BoardAttachedFile> fList = nService.printAllFile();
		if (!fList.isEmpty()) {
			mv.addObject("fList", fList);
		} else {
			mv.addObject("msg", "공지게시판 조회 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 공지사항 게시글 디테일 조회
	@RequestMapping(value = "/notice/detail.hirp", method = RequestMethod.GET)
	public ModelAndView noticeDetailView(ModelAndView mv, @RequestParam("noticeNo") int noticeNo) {
		NoticeBoard noticeboard = nService.printOneNotice(noticeNo);
		List<BoardAttachedFile> fList = nService.printOneFile(noticeNo);
		Integer NoticeViewCount = nService.viewCount(noticeNo);
		if (noticeboard != null) {
			mv.addObject("notice", noticeboard);
			mv.addObject("fList", fList);
			mv.setViewName("board/noticeBoard/noticeDetail");
		} else {
			mv.addObject("msg", "게시글 조회 실패");
			mv.setViewName("common/errorPage");
		}
		
		return mv;
	}

	// 공지사항 검색 리스트 조회
	@RequestMapping(value = "/notice/searchList.hirp", method = RequestMethod.GET)
	public ModelAndView noticeSearchList(ModelAndView mv, @ModelAttribute Search search) {
	try {
		List<NoticeBoard> searchList = nService.printSearchNotice(search);
		if (!searchList.isEmpty()) {
			mv.addObject("nList", searchList);
			mv.setViewName("board/noticeBoard/noticeListView");
		} else {
			mv.addObject("msg", "검색조회 실패");
			mv.setViewName("common/errorPage");
		}
	}catch(Exception e) {
		mv.addObject("msg",e.toString());
		mv.setViewName("common/errorPage");
	}
		return mv;
	}

	// 공지글 등록
	@RequestMapping(value="/notice/register.hirp", method=RequestMethod.POST)	
	public ModelAndView registerNotice(ModelAndView mv,
			@ModelAttribute NoticeBoard noticeboard,
			@RequestParam(value="uploadFiles",required=false)List<MultipartFile> uploadFiles
			,HttpServletRequest request
			){

		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		noticeboard.setEmplId(emplId);
		//공지 테이블 등록
		int result = nService.registerNotice(noticeboard);
		if(uploadFiles.size() > 0 && !uploadFiles.get(0).getOriginalFilename().equals("")) {
			List<BoardAttachedFile> boardFiles = new ArrayList<BoardAttachedFile>(); 

			String path = request.getSession().getServletContext().getRealPath("resources");
			String root = path + "\\" + "uploadFiles";
			File fileCheck = new File(root);
			if(!fileCheck.exists()) fileCheck.mkdirs();
			List<Map<String, String>> fileList = new ArrayList();

			for(int i = 0; i < uploadFiles.size();i++) {
				String originFileName = uploadFiles.get(i).getOriginalFilename();
				String ext = originFileName.substring(originFileName.lastIndexOf("."));
				String fileRename = UUID.randomUUID().toString() + ext;
				String filePath= fileCheck + "\\" + fileRename;

				Map<String, String> map = new HashMap();
				map.put("fileName", originFileName);
				map.put("fileRename", fileRename);
				fileList.add(map);
				
				//첨부파일 테이블 등록
				BoardAttachedFile boardFile = new BoardAttachedFile();
				boardFile.setBoardCode(noticeboard.getBoardCode());
				boardFile.setFileName(originFileName);
				boardFile.setFileRename(fileRename);
				boardFile.setFilePath(filePath);

				int fileResult = nService.registerNoticeFile(boardFile);
			}
		
			try { 
				for(int i = 0; i < uploadFiles.size();i++) { 
					File file = new File(root+"\\" + fileList.get(i).get("fileRename"));
					uploadFiles.get(i).transferTo(file); 
					} 
				System.out.println("다중 파일 업로드 성공");
			  }catch(Exception e) { 
				  System.out.println("다중 파일 업로드 실패"); 
				  for(int i = 0;i<uploadFiles.size();i++) { 
					  new File(root + "\\" + fileList.get(i).get("fileRename")).delete(); 
					  } e.printStackTrace(); 
					  }

			 try { 
			  if(result > 0) {
				  	mv.setViewName("redirect:/board/main.hirp"); 
			  }else { mv.addObject("msg","공지사항등록 실패"); 
			  		mv.setViewName("common/errorPage"); } 
			  }catch(Exception e){
			  		mv.setViewName("common/errorPage"); mv.addObject("msg",e.toString()); 
			  }}
		return mv;	 
		}
		
	//공지글 수정 페이지
	@RequestMapping(value = "/notice/modifyView.hirp", method = RequestMethod.GET)
	public ModelAndView noticeUpdateView(ModelAndView mv
			,@RequestParam("noticeNo") int noticeNo) {
		NoticeBoard noticeboard = nService.printOneNotice(noticeNo);
		List<BoardAttachedFile> fList = nService.printOneFile(noticeNo);
		if(noticeboard !=null) {
			mv.addObject("notice", noticeboard);
			mv.addObject("fList", fList);
			mv.setViewName("board/noticeBoard/noticeModifyView");
		}else{
			mv.addObject("msg", "조회 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
		}
	
	
	
	
	//첨부파일 삭제
			public static void deleteFile(String filePath, HttpServletRequest request) {
				File deleteFile = new File(filePath);
				if(deleteFile.exists()) {
					// 파일이 존재하면 파일 삭제
					deleteFile.delete();
				}
			}
	
	
	
	
	// 공지글 수정
	@RequestMapping(value = "/notice/modify.hirp", method = RequestMethod.POST)
	public ModelAndView modifyNotice(ModelAndView mv, @ModelAttribute NoticeBoard noticeboard,
			@ModelAttribute BoardAttachedFile boardFile,
			@RequestParam(value = "reloadFile", required = false) List<MultipartFile> reloadFile,
			HttpServletRequest request) {
		try {
			// 프로젝트 경로에 파일 저장(reloadFile, request),기존파일 삭제하고 새파일 업로드
			if (reloadFile != null && !reloadFile.isEmpty()) {
				List<BoardAttachedFile> fList = nService.printOneFile(noticeboard.getNoticeNo());
				// 기존 파일 삭제(기존 파일 이름 필요)
				for(BoardAttachedFile boardAttachedFile : fList) {
					String filePath = boardAttachedFile.getFilePath();
					deleteFile(filePath, request);
				}
				String path = request.getSession().getServletContext().getRealPath("resources");
				String root = path + "\\" + "uploadFiles";
				File fileCheck = new File(root);
				if(!fileCheck.exists()) fileCheck.mkdirs();
				List<Map<String, String>> fileList = new ArrayList();

				for(int i = 0; i < reloadFile.size();i++) {
					String originFileName = reloadFile.get(i).getOriginalFilename();
					String ext = originFileName.substring(originFileName.lastIndexOf("."));
					String fileRename = UUID.randomUUID().toString() + ext;
					String filePath= fileCheck + "\\" + fileRename;

					Map<String, String> map = new HashMap();
					map.put("fileName", originFileName);
					map.put("fileRename", fileRename);
					fileList.add(map);
					
					//첨부파일 테이블 등록
					BoardAttachedFile updateFile = new BoardAttachedFile();
					updateFile.setBoardCode(noticeboard.getBoardCode());
					updateFile.setFileName(originFileName);
					updateFile.setFileRename(fileRename);
					updateFile.setFilePath(filePath);
					
					int fileResult = nService.registerNoticeFile(updateFile);
				}
			}
				

			// 디비에 해당 데이터 저장
			int result = nService.modifyNotice(noticeboard);
			if (result > 0) {
				mv.setViewName("notice/noticeDetail");
			} else {
				// 실패
				mv.addObject("msg", "공지사항 수정 실패");
				mv.setViewName("common/errorPage");
			}
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 공지글 삭제
	@RequestMapping(value = "/notice/remove.hirp", method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView removeNotice(ModelAndView mv, @RequestParam("noticeNo") int noticeNo) {
		int result = nService.removeNotice(noticeNo);
		if (result > 0) {
			mv.setViewName("redirect:/notice/list.hirp");
		} else {
			mv.addObject("msg", "공지사항 삭제 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	
	
	
	// 공지글의 댓글 조회
	@ResponseBody
	@RequestMapping(value = "/notice/replyList.hirp", method = RequestMethod.GET)
	public void NoticeReplyView(@ModelAttribute Reply reply
			,HttpServletResponse response) throws JsonIOException, IOException {
		
		List<Reply> nReplyList = nService.printAllNoticeReply(reply);
		if(!nReplyList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			gson.toJson(nReplyList,response.getWriter());
			
		}
		
	}

	
	// 공지글의 댓글 등록
	@ResponseBody
	@RequestMapping(value = "/notice/replyAdd.hirp", method = RequestMethod.POST)
	public String registerNoticeReply(@ModelAttribute Reply reply,HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		reply.setEmplId(emplId);
		int result = nService.registerNoticeReply(reply);
		if(result > 0) {
			return "success";
		}else {
			return"fail";
		}
	}

	// 공지글의 댓글 수정
	@ResponseBody
	@RequestMapping(value = "/notice/modifyReply.hirp", method = RequestMethod.POST)
	public String modifyNoticeReply(@ModelAttribute Reply reply) {
		int result = nService.modifyNoticeReply(reply);
		if(result > 0) {
			return "success";
		}else {
			return "fail";
		}
	}

	@ResponseBody
	@RequestMapping(value="/notice/registerReReply.hirp", method = RequestMethod.POST)
	public String noticeReReply(@ModelAttribute Reply reply,HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		reply.setEmplId(emplId);
		int result = nService.noticeReReply(reply);
		if(result > 0) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	
	
	
	// 공지글의 댓글 삭제
	@ResponseBody
	@RequestMapping(value = "/notice/deleteReply.hirp", method=RequestMethod.GET)
	public String removeNoticeReply(@RequestParam("replyNo") int replyNo) {
		int result = nService.removeNoticeReply(replyNo);
		if(result > 0) {
			return "success";
		}else {
			return "fail";
		}
	}

}
