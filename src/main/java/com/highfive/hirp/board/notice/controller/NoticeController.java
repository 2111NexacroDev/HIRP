package com.highfive.hirp.board.notice.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
		List<NoticeBoard> nList = nService.printAllNotice(pi);
		if (!nList.isEmpty()) {
			mv.addObject("nList", nList);
			mv.addObject("pi", pi);
			mv.setViewName("board/boardListView");
		} else {
			mv.addObject("msg", "공지게시판 조회 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 공지사항 게시글 조회
	@RequestMapping(value = "notice/detail.hirp", method = RequestMethod.GET)
	public ModelAndView noticeDetailView(ModelAndView mv, @RequestParam("noticeNo") int noticeNo) {
		NoticeBoard noticeboard = nService.printNoticeDetail(noticeNo);
		if (noticeboard != null) {
			mv.addObject("noticeboard", noticeboard);
			mv.setViewName("notice/noticeDetail");
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
			mv.setViewName("board/boardListView");
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
	public ModelAndView registerNotice(ModelAndView mv
			,@ModelAttribute NoticeBoard noticeboard
			,@RequestParam(value="uploadFiles",required=false)List<MultipartFile> uploadFiles
			,HttpServletRequest request
			){
		//공지 테이블 등록
		int result = nService.registerNotice(noticeboard);
		if(uploadFiles.size() > 0 && !uploadFiles.get(0).getOriginalFilename().equals("")) {
			List<BoardAttachedFile> boardFiles = new ArrayList<BoardAttachedFile>(); 
			//공지 게시글 번호 가져오기
			int noticeNo = nService.printNoticeNo();

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
				boardFile.setBoardNo(noticeNo);

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
			  		}
		}
			  return mv; 
		}

	// 공지글 수정
	@RequestMapping(value = "/notice/modify.kh", method = RequestMethod.POST)
	public ModelAndView modifyNotice(ModelAndView mv, @ModelAttribute NoticeBoard noticeboard,
			@ModelAttribute BoardAttachedFile boardFile,
			@RequestParam(value = "reloadFile", required = false) MultipartFile reloadFile,
			HttpServletRequest request) {
		try {
			// 프로젝트 경로에 파일 저장(reloadFile, request),기존파일 삭제하고 새파일 업로드
			if (reloadFile != null && !reloadFile.isEmpty()) {
				// 기존 파일 삭제(기존 파일 이름 필요)
				SaveAttachedFile.deleteFile(boardFile.getFilePath(), request);
				// 새로운 파일 업로드
				HashMap<String, String> fileMap = SaveAttachedFile.saveFile(reloadFile, request);// 새롭게 저장
				String savePath = fileMap.get("filePath");
				String fileRename = fileMap.get("fileName");
				if (savePath != null) {
					boardFile.setFileName(reloadFile.getOriginalFilename());
					boardFile.setFileRename(fileRename);
					boardFile.setFilePath(savePath);// 경로 다시 업데이트
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
	@RequestMapping(value = "notice/remove.hirp", method = RequestMethod.POST)
	public ModelAndView removeNotice(ModelAndView mv, @RequestParam("noticeNo") int noticeNo) {
		int result = nService.removeNotice(noticeNo);
		if (result > 0) {
			mv.setViewName("notice/noticeList");
		} else {
			mv.addObject("msg", "공지사항 삭제 실패");
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 공지글의 댓글 조회
	@ResponseBody
	@RequestMapping(value = "notice/reply/list.hirp", method = RequestMethod.GET)
	public ModelAndView NoticeReplyView(ModelAndView mv, @ModelAttribute Reply reply, HttpServletResponse response) {
		return mv;
	}

	// 공지글의 댓글 등록
	@ResponseBody
	@RequestMapping(value = "notice/reply/register.hirp", method = RequestMethod.POST)
	public ModelAndView registerNoticeReply(ModelAndView mv, @ModelAttribute Reply reply) {
		return mv;
	}

	// 공지글의 댓글 수정
	@ResponseBody
	@RequestMapping(value = "notice/reply/modify.hirp", method = RequestMethod.POST)
	public ModelAndView modifyNoticeReply(ModelAndView mv, @ModelAttribute Reply reply) {
		return mv;
	}

	// 공지글의 댓글 삭제
	@ResponseBody
	@RequestMapping(value = "notice/reply/remove.hirp", method = RequestMethod.GET)
	public ModelAndView removeNoticeReply(ModelAndView mv, @ModelAttribute Reply reply) {
		return mv;
	}

}
