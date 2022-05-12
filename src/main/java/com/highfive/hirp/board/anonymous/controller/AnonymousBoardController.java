package com.highfive.hirp.board.anonymous.controller;

import java.util.List;
import java.util.Map;

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

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.anonymous.service.AnonymousBoardService;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.BoardPagination;
import com.highfive.hirp.board.common.BoardRecommend;
import com.highfive.hirp.board.common.SaveMultipartFile;
import com.highfive.hirp.board.free.domain.FreeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;
@Controller
public class AnonymousBoardController {
	
	@Autowired
	private AnonymousBoardService aService;
	
	@RequestMapping(value="anonymous/writeView.hirp")
	public String AnonymousWriteView(ModelAndView mv) {
		return"board/anonymousBoard/anonymousWriteView";
	}
	
	// 익명게시판 전체 리스트 조회
		@RequestMapping(value = "/anonymous/list.hirp", method = RequestMethod.GET)
		public ModelAndView anonymousListView(ModelAndView mv, @RequestParam(value = "page", required = false) Integer page) {
			int currentPage = (page != null) ? page : 1;
			int totalCount = aService.getListCount();
			PageInfo pi = BoardPagination.getPageInfo(currentPage, totalCount);
			//익명게시판 테이블 조회
			List<AnonymousBoard> aList = aService.printAllAnonymous(pi);
			if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
				mv.addObject("pi", pi);
				mv.setViewName("board/anonymousBoard/anonymousListView");
			} else {
				mv.addObject("msg", "익명게시판 조회 실패");
				mv.setViewName("common/errorPage");
			}
			
			return mv;
		}

		// 익명게시판 디테일 조회
		@RequestMapping(value = "/anonymous/detail.hirp", method = RequestMethod.GET)
		public ModelAndView anonymousDetailView(ModelAndView mv, @RequestParam("anonymousNo") int anonymousNo) {
			AnonymousBoard anonymousboard = aService.printOneAnonymous(anonymousNo);
			Integer AnonymousViewCount = aService.viewCount(anonymousNo);
			if (anonymousboard != null) {
				mv.addObject("anonymous", anonymousboard);
				mv.setViewName("board/anonymousBoard/anonymousDetail");
			} else {
				mv.addObject("msg", "게시글 조회 실패");
				mv.setViewName("common/errorPage");
			}
			
			return mv;
		}

		// 익명게시판 검색 리스트 조회
		@RequestMapping(value = "/anonymous/searchList.hirp", method = RequestMethod.GET)
		public ModelAndView anonymousSearchList(ModelAndView mv, @ModelAttribute Search search) {
		try {
			List<AnonymousBoard> searchList = aService.printSearchAnonymous(search);
			if (!searchList.isEmpty()) {
				mv.addObject("aList", searchList);
				mv.setViewName("board/anonymousBoard/anonymousListView");
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

		// 익명글 등록
		@RequestMapping(value="/anonymous/register.hirp", method=RequestMethod.POST)	
		public ModelAndView registerAnonymous(ModelAndView mv,
				@ModelAttribute AnonymousBoard anonymousboard,
				@RequestParam(value="uploadFiles",required=false)List<MultipartFile> multipartfile
				,HttpServletRequest request
				){

			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			anonymousboard.setEmplId(emplId);

			//익명 테이블 등록
			int result = aService.registerAnonymous(anonymousboard);
			if(multipartfile.size() > 0 && !multipartfile.get(0).getOriginalFilename().equals("")) {

				List<Map<String, String>> fileList = SaveMultipartFile.saveFile(multipartfile, request);  
						for(int i = 0; i < multipartfile.size();i++) {
						String fileName = fileList.get(i).get("fileName");
						String fileRename = fileList.get(i).get("fileRename");
						String filePath = fileList.get(i).get("filePath");
					//첨부파일 테이블 등록
					BoardAttachedFile boardFile = new BoardAttachedFile();
					boardFile.setBoardCode(anonymousboard.getBoardCode());
					boardFile.setFileName(fileName);
					boardFile.setFileRename(fileRename);
					boardFile.setFilePath(filePath);

					int fileResult = aService.registerAnonymousFile(boardFile);
				}
			}
				 try { 
				  if(result > 0) {
					  	mv.setViewName("redirect:/anonymous/list.hirp"); 
				  }else { 
					    mv.addObject("msg","익명사항등록 실패"); 
				  		mv.setViewName("common/errorPage"); } 
				  }catch(Exception e){
				  		mv.setViewName("common/errorPage"); 
				  		mv.addObject("msg",e.toString()); 
				  }
			return mv;	 
			}
			
		//익명글 수정 페이지
		@RequestMapping(value = "/anonymous/modifyView.hirp", method = RequestMethod.GET)
		public ModelAndView anonymousUpdateView(ModelAndView mv
				,@RequestParam("anonymousNo") int anonymousNo) {
			AnonymousBoard anonymousboard = aService.printOneAnonymous(anonymousNo);
			if(anonymousboard !=null) {
				mv.addObject("anonymous", anonymousboard);
				mv.setViewName("board/anonymousBoard/anonymousModifyView");
			}else{
				mv.addObject("msg", "조회 실패");
				mv.setViewName("common/errorPage");
			}
			return mv;
			}
		
		
		
		
		// 익명글 수정
			@RequestMapping(value = "/anonymous/modify.hirp", method = RequestMethod.POST)
			public ModelAndView modifyAnonymous(
					ModelAndView mv
					, @ModelAttribute AnonymousBoard anonymousboard
					, @RequestParam(value = "reloadFile", required = false) List<MultipartFile> reloadFile
					, HttpServletRequest request) {
				try {
					// 프로젝트 경로에 파일 저장(reloadFile, request),기존파일 삭제하고 새파일 업로드
					if (reloadFile.size() > 0 && !reloadFile.get(0).getOriginalFilename().equals("")) {
						//reloadFile.get(0).getOriginalFilename() != ""
						
						List<BoardAttachedFile> aList = aService.printOneFile(anonymousboard);
						// 기존 파일 삭제(기존 파일 이름 필요)
						for (int i = 0; i < aList.size(); i++) {
							int fileNo = aList.get(i).getFileNo();
							System.out.println(fileNo);
							int result = aService.removeBoardFile(fileNo);
							String filePath = aList.get(i).getFilePath();
							SaveMultipartFile.deleteFile(filePath, request);
						}
						List<Map<String, String>> fileList = SaveMultipartFile.saveFile(reloadFile, request);
						BoardAttachedFile bFile = new BoardAttachedFile();
						for (int i = 0; i < reloadFile.size(); i++) {
							String fileName = fileList.get(i).get("fileName");
							String fileRename = fileList.get(i).get("fileRename");
							String filePath = fileList.get(i).get("filePath");
							 //첨부파일 테이블 등록
							bFile.setBoardCode(anonymousboard.getBoardCode());
							bFile.setBoardNo(anonymousboard.getAnonymousNo());
							bFile.setFileName(fileName);
							bFile.setFileRename(fileRename);
							bFile.setFilePath(filePath);

							int fileResult = aService.modifyAnonymousFile(bFile);
						}
					}

					 //디비에 해당 데이터 저장
					int result = aService.modifyAnonymous(anonymousboard);
					
					
					
						if (result > 0) {
						mv.setViewName("board/anonymousBoard/anonymousDetail");
					} else {
						// 실패
						mv.addObject("msg", "익명사항 수정 실패");
						mv.setViewName("common/errorPage");
					}
				} catch (Exception e) {
					mv.addObject("msg", e.toString());
					mv.setViewName("common/errorPage");
				}
				return mv;
			}

		// 익명글 삭제
		@RequestMapping(value = "/anonymous/remove.hirp", method={RequestMethod.GET, RequestMethod.POST})
		public ModelAndView removeAnonymous(ModelAndView mv, @RequestParam("anonymousNo") int anonymousNo) {
			int result = aService.removeAnonymous(anonymousNo);
			if (result > 0) {
				mv.setViewName("redirect:/anonymous/list.hirp");
			} else {
				mv.addObject("msg", "익명사항 삭제 실패");
				mv.setViewName("common/errorPage");
			}
			return mv;
		}
		
		
		
		
		
		

}
