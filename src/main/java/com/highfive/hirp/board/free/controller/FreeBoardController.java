package com.highfive.hirp.board.free.controller;

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
import com.highfive.hirp.board.common.SaveMultipartFile;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.free.service.FreeBoardService;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;

import com.highfive.hirp.common.Search;

@Controller
public class FreeBoardController {

	@Autowired
	public FreeBoardService fService;
	

	//자유게시판 글쓰기 화면
	@RequestMapping(value = "/free/writeView.hirp")
	public String boardWriteView() {
		return "/board/freeBoard/freeWriteView";
	}

	
	// 자유게시판 전체 리스트 조회
	@RequestMapping(value = "/free/list.hirp", method = RequestMethod.GET)
	public ModelAndView freeListView(ModelAndView mv, @RequestParam(value = "page", required = false) Integer page) {
		int currentPage = (page != null) ? page : 1;
		int totalCount = fService.getListCount();
		PageInfo pi = BoardPagination.getPageInfo(currentPage, totalCount);
		//자유게시판 테이블 조회
		List<FreeBoard> fList = fService.printAllFree(pi);
		if (!fList.isEmpty()) {
			mv.addObject("fList", fList);
			mv.addObject("pi", pi);
			mv.setViewName("board/freeBoard/freeListView");
		} else {
			mv.addObject("msg", "공지게시판 조회 실패");
			mv.setViewName("common/errorPage");
		}
		
		return mv;
	}

	// 자유게시판 디테일 조회
	@RequestMapping(value = "/free/detail.hirp", method = RequestMethod.GET)
	public ModelAndView freeDetailView(ModelAndView mv, @RequestParam("freeNo") int freeNo) {
		FreeBoard freeboard = fService.printOneFree(freeNo);
		Integer FreeViewCount = fService.viewCount(freeNo);
		if (freeboard != null) {
			mv.addObject("free", freeboard);
			mv.setViewName("board/freeBoard/freeDetail");
		} else {
			mv.addObject("msg", "게시글 조회 실패");
			mv.setViewName("common/errorPage");
		}
		
		return mv;
	}

	// 자유게시판 검색 리스트 조회
	@RequestMapping(value = "/free/searchList.hirp", method = RequestMethod.GET)
	public ModelAndView freeSearchList(ModelAndView mv, @ModelAttribute Search search) {
	try {
		List<FreeBoard> searchList = fService.printSearchFree(search);
		if (!searchList.isEmpty()) {
			mv.addObject("fList", searchList);
			mv.setViewName("board/freeBoard/freeListView");
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
	@RequestMapping(value="/free/register.hirp", method=RequestMethod.POST)	
	public ModelAndView registerFree(ModelAndView mv,
			@ModelAttribute FreeBoard freeboard,
			@RequestParam(value="uploadFiles",required=false)List<MultipartFile> multipartfile
			,HttpServletRequest request
			){

		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		freeboard.setEmplId(emplId);

		//공지 테이블 등록
		int result = fService.registerFree(freeboard);
		if(multipartfile.size() > 0 && !multipartfile.get(0).getOriginalFilename().equals("")) {

			List<Map<String, String>> fileList = SaveMultipartFile.saveFile(multipartfile, request);  
					for(int i = 0; i < multipartfile.size();i++) {
					String fileName = fileList.get(i).get("fileName");
					String fileRename = fileList.get(i).get("fileRename");
					String filePath = fileList.get(i).get("filePath");
				//첨부파일 테이블 등록
				BoardAttachedFile boardFile = new BoardAttachedFile();
				boardFile.setBoardCode(freeboard.getBoardCode());
				boardFile.setFileName(fileName);
				boardFile.setFileRename(fileRename);
				boardFile.setFilePath(filePath);

				int fileResult = fService.registerFreeFile(boardFile);
			}
		}
			 try { 
			  if(result > 0) {
				  	mv.setViewName("redirect:/free/list.hirp"); 
			  }else { 
				    mv.addObject("msg","공지사항등록 실패"); 
			  		mv.setViewName("common/errorPage"); } 
			  }catch(Exception e){
			  		mv.setViewName("common/errorPage"); 
			  		mv.addObject("msg",e.toString()); 
			  }
		return mv;	 
		}
		
	//공지글 수정 페이지
	@RequestMapping(value = "/free/modifyView.hirp", method = RequestMethod.GET)
	public ModelAndView freeUpdateView(ModelAndView mv
			,@RequestParam("freeNo") int freeNo) {
		FreeBoard freeboard = fService.printOneFree(freeNo);
		if(freeboard !=null) {
			mv.addObject("free", freeboard);
			mv.setViewName("board/freeBoard/freeModifyView");
		}else{
			mv.addObject("msg", "조회 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
		}
	
	
	
	
	// 공지글 수정
		@RequestMapping(value = "/free/modify.hirp", method = RequestMethod.POST)
		public ModelAndView modifyFree(
				ModelAndView mv
				, @ModelAttribute FreeBoard freeboard
				, @RequestParam(value = "reloadFile", required = false) List<MultipartFile> reloadFile
				, HttpServletRequest request) {
			try {
				// 프로젝트 경로에 파일 저장(reloadFile, request),기존파일 삭제하고 새파일 업로드
				if (reloadFile.size() > 0 && !reloadFile.get(0).getOriginalFilename().equals("")) {
					//reloadFile.get(0).getOriginalFilename() != ""
					
					List<BoardAttachedFile> fList = fService.printOneFile(freeboard);
					// 기존 파일 삭제(기존 파일 이름 필요)
					for (int i = 0; i < fList.size(); i++) {
						int fileNo = fList.get(i).getFileNo();
						System.out.println(fileNo);
						int result = fService.removeBoardFile(fileNo);
						String filePath = fList.get(i).getFilePath();
						SaveMultipartFile.deleteFile(filePath, request);
					}
					List<Map<String, String>> fileList = SaveMultipartFile.saveFile(reloadFile, request);
					BoardAttachedFile bFile = new BoardAttachedFile();
					for (int i = 0; i < reloadFile.size(); i++) {
						String fileName = fileList.get(i).get("fileName");
						String fileRename = fileList.get(i).get("fileRename");
						String filePath = fileList.get(i).get("filePath");
						 //첨부파일 테이블 등록
						bFile.setBoardCode(freeboard.getBoardCode());
						bFile.setBoardNo(freeboard.getFreeNo());
						bFile.setFileName(fileName);
						bFile.setFileRename(fileRename);
						bFile.setFilePath(filePath);

						int fileResult = fService.modifyFreeFile(bFile);
					}
				}

				 //디비에 해당 데이터 저장
				int result = fService.modifyFree(freeboard);
				
				
				
					if (result > 0) {
					mv.setViewName("board/freeBoard/freeDetail");
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
	@RequestMapping(value = "/free/remove.hirp", method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView removeFree(ModelAndView mv, @RequestParam("freeNo") int freeNo) {
		int result = fService.removeFree(freeNo);
		if (result > 0) {
			mv.setViewName("redirect:/free/list.hirp");
		} else {
			mv.addObject("msg", "공지사항 삭제 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	
	
	


}
