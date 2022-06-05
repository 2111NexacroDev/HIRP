package com.highfive.hirp.board.department.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
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

import com.highfive.hirp.alarm.domain.Alarm;
import com.highfive.hirp.alarm.service.AlarmService;
import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.BoardPagination;
import com.highfive.hirp.board.common.SaveMultipartFile;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.department.service.DepartmentBoardService;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;

@Controller
public class DepartmentBoardController {

	@Autowired
	private DepartmentBoardService dService;
	
	@Autowired
	public AlarmService aService;
	
	@Autowired
	public EmployeeAdminService eaService;
	
	@RequestMapping(value="department/writeView.hirp")
	public String DepartmentWriteView(ModelAndView mv) {
		return"board/departmentBoard/departmentWriteView";
	}
	// 부서게시판 전체 리스트 조회
			@RequestMapping(value = "/department/list.hirp", method = RequestMethod.GET)
			public ModelAndView departmentListView(ModelAndView mv, @RequestParam(value = "page", required = false) Integer page) {
				int currentPage = (page != null) ? page : 1;
				int totalCount = dService.getListCount();
				PageInfo pi = BoardPagination.getPageInfo(currentPage, totalCount);
				//부서게시판 테이블 조회
				List<DepartmentBoard> dList = dService.printAllDepartment(pi);
				if (!dList.isEmpty()) {
					mv.addObject("dList", dList);
					mv.addObject("pi", pi);
					mv.setViewName("board/departmentBoard/departmentListView");
				} else {
					mv.addObject("msg", "부서게시판 조회 실패");
					mv.setViewName("common/errorPage");
				}
				
				return mv;
			}

			// 부서게시판 디테일 조회
			@RequestMapping(value = "/department/detail.hirp", method = RequestMethod.GET)
			public ModelAndView departmentDetailView(ModelAndView mv, @RequestParam("deptNo") int deptNo) {
				DepartmentBoard departmentboard = dService.printOneDepartment(deptNo);
				Integer DepartmentViewCount = dService.viewCount(deptNo);
				if (departmentboard != null) {
					mv.addObject("dept", departmentboard);
					mv.setViewName("board/departmentBoard/departmentDetail");
				} else {
					mv.addObject("msg", "게시글 조회 실패");
					mv.setViewName("common/errorPage");
				}
				
				return mv;
			}

			// 부서게시판 검색 리스트 조회
			@RequestMapping(value = "/department/searchList.hirp", method = RequestMethod.GET)
			public ModelAndView departmentSearchList(ModelAndView mv, @ModelAttribute Search search) {
			try {
				List<DepartmentBoard> searchList = dService.printSearchDepartment(search);
				if (!searchList.isEmpty()) {
					mv.addObject("dList", searchList);
					mv.setViewName("board/DepartmentBoard/DepartmentListView");
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

			// 부서글 등록
			@RequestMapping(value="/department/register.hirp", method=RequestMethod.POST)	
			public ModelAndView registerDepartment(ModelAndView mv,
					@ModelAttribute DepartmentBoard departmentboard,
					@RequestParam(value="uploadFiles",required=false)List<MultipartFile> multipartfile
					,HttpServletRequest request
					){

				HttpSession session = request.getSession();
				String emplId = (String) session.getAttribute("emplId");
				String deptCode = (String)session.getAttribute("deptCode");
				departmentboard.setEmplId(emplId);
				departmentboard.setDeptCode(deptCode);
				
				//오늘 날짜, oracle date형태로 넣으려면 이러케 넣어야 함.
				Date date = new Date();
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				String today = formatter.format(date);
				System.out.println("today: " + today);

				//부서 테이블 등록
				int result = dService.registerDepartment(departmentboard);
				if(multipartfile.size() > 0 && !multipartfile.get(0).getOriginalFilename().equals("")) {

					List<Map<String, String>> fileList = SaveMultipartFile.saveFile(multipartfile, request);  
							for(int i = 0; i < multipartfile.size();i++) {
							String fileName = fileList.get(i).get("fileName");
							String fileRename = fileList.get(i).get("fileRename");
							String filePath = fileList.get(i).get("filePath");
						//첨부파일 테이블 등록
						BoardAttachedFile boardFile = new BoardAttachedFile();
						boardFile.setBoardCode(departmentboard.getBoardCode());
						boardFile.setFileName(fileName);
						boardFile.setFileRename(fileRename);
						boardFile.setFilePath(filePath);

						int fileResult = dService.registerDepartmentFile(boardFile);
					}
				}
					 try { 
					  if(result > 0) {
						  //부서 게시판 알림
//						  List<Employee> deptEmplList = eaService.printEmployeeWithDeptCode(deptCode);
//						  if(!deptEmplList.isEmpty()) {
//								for(int i=0; i<deptEmplList.size(); i++) {
//									if(!deptEmplList.get(i).getEmplId().equals(emplId)) {
//										//공지게시판 알림 추가
//										Alarm alarm = new Alarm(deptEmplList.get(i).getEmplId(), today, "[부서게시판] '"+departmentboard.getDeptTitle()+"' 글이 등록되었습니다.",
//												"10", "N", emplId);
//										int result2 = aService.insertAlarm(alarm);
//										if(result2 > 0) {
//											System.out.println(departmentboard.getDeptTitle()+"글의 알림이 추가되었습니다.");
//										}
//									}
//								}
//							}
						  	mv.setViewName("redirect:/department/list.hirp"); 
					  }else { 
						    mv.addObject("msg","부서사항등록 실패"); 
					  		mv.setViewName("common/errorPage"); } 
					  }catch(Exception e){
					  		mv.setViewName("common/errorPage"); 
					  		mv.addObject("msg",e.toString()); 
					  }
				return mv;	 
				}
				
			//부서글 수정 페이지
			@RequestMapping(value = "/department/modifyView.hirp", method = RequestMethod.GET)
			public ModelAndView departmentUpdateView(ModelAndView mv
					,@RequestParam("deptNo") int deptNo) {
				DepartmentBoard departmentboard = dService.printOneDepartment(deptNo);
				if(departmentboard !=null) {
					mv.addObject("department", departmentboard);
					mv.setViewName("board/departmentBoard/departmentModifyView");
				}else{
					mv.addObject("msg", "조회 실패");
					mv.setViewName("common/errorPage");
				}
				return mv;
				}
			
			
			
			
			// 부서글 수정
				@RequestMapping(value = "/department/modify.hirp", method = RequestMethod.POST)
				public ModelAndView modifyDepartment(
						ModelAndView mv
						, @ModelAttribute DepartmentBoard departmentboard
						, @RequestParam(value = "reloadFile", required = false) List<MultipartFile> reloadFile
						, HttpServletRequest request) {
					try {
						// 프로젝트 경로에 파일 저장(reloadFile, request),기존파일 삭제하고 새파일 업로드
						if (reloadFile.size() > 0 && !reloadFile.get(0).getOriginalFilename().equals("")) {
							//reloadFile.get(0).getOriginalFilename() != ""
							
							List<BoardAttachedFile> dList = dService.printOneFile(departmentboard);
							// 기존 파일 삭제(기존 파일 이름 필요)
							for (int i = 0; i < dList.size(); i++) {
								int fileNo = dList.get(i).getFileNo();
								System.out.println(fileNo);
								int result = dService.removeBoardFile(fileNo);
								String filePath = dList.get(i).getFilePath();
								SaveMultipartFile.deleteFile(filePath, request);
							}
							List<Map<String, String>> fileList = SaveMultipartFile.saveFile(reloadFile, request);
							BoardAttachedFile bFile = new BoardAttachedFile();
							for (int i = 0; i < reloadFile.size(); i++) {
								String fileName = fileList.get(i).get("fileName");
								String fileRename = fileList.get(i).get("fileRename");
								String filePath = fileList.get(i).get("filePath");
								 //첨부파일 테이블 등록
								bFile.setBoardCode(departmentboard.getBoardCode());
								bFile.setBoardNo(departmentboard.getDeptNo());
								bFile.setFileName(fileName);
								bFile.setFileRename(fileRename);
								bFile.setFilePath(filePath);

								int fileResult = dService.modifyDepartmentFile(bFile);
							}
						}

						 //디비에 해당 데이터 저장
						int result = dService.modifyDepartment(departmentboard);
						
						
						
							if (result > 0) {
							mv.setViewName("board/departmentBoard/departmentDetail");
						} else {
							// 실패
							mv.addObject("msg", "부서사항 수정 실패");
							mv.setViewName("common/errorPage");
						}
					} catch (Exception e) {
						mv.addObject("msg", e.toString());
						mv.setViewName("common/errorPage");
					}
					return mv;
				}

			// 부서글 삭제
			@RequestMapping(value = "/department/remove.hirp", method={RequestMethod.GET, RequestMethod.POST})
			public ModelAndView removeDepartment(ModelAndView mv, @RequestParam("deptNo") int deptNo) {
				int result = dService.removeDepartment(deptNo);
				if (result > 0) {
					mv.setViewName("redirect:/department/list.hirp");
				} else {
					mv.addObject("msg", "부서사항 삭제 실패");
					mv.setViewName("common/errorPage");
				}
				return mv;
			}

}
