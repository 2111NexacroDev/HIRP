package com.highfive.hirp.project.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Pagination;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.project.domain.Board;
import com.highfive.hirp.project.domain.Project;
import com.highfive.hirp.project.service.ProjectService;

@Controller
public class ProjectController {

	@Autowired
	private ProjectService pService;
	@Autowired
	private EmployeeAdminService eaService;
	
	// 프로젝트 목록 보기 화면
	@RequestMapping(value="/project/list.hirp", method=RequestMethod.GET)
	public ModelAndView projectListView(ModelAndView mv
			, @RequestParam(value="page", required=false) Integer page) {
		try {
			int currentPage = (page != null) ? page : 1;
			int totalCount = pService.getListCount();
			PageInfo pi = Pagination.getPageInfo(currentPage, totalCount);
			List<Project> pList = pService.printAll(pi);
			if(!pList.isEmpty()) {
				mv.addObject("pList", pList);
				mv.addObject("pi", pi);
				mv.setViewName("project/projectList");
			}else {
				mv.addObject("msg", "프로젝트 조회 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 프로젝트 상세 조회
	@RequestMapping(value="/project/detail.hirp", method=RequestMethod.GET)
	public ModelAndView projectDetailView(ModelAndView mv
			, @RequestParam("projectNo") Integer projectNo) {
		try {
			Project project = pService.printOneByNo(projectNo);
			if(project != null) {
				mv.addObject("project", project);
				mv.setViewName("project/projectDetailView");
			}else {
				mv.addObject("msg", "프로젝트 상세조회 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 프로젝트 만들기 화면
	@RequestMapping(value="/project/writeView.hirp", method=RequestMethod.GET)
	public ModelAndView projectWriteView(ModelAndView mv) {
		try {
			List<Employee> emplList = eaService.printAllEmployeeWithName();
			if(emplList != null) {
				mv.addObject("emplList", emplList);
				mv.setViewName("project/projectWriteForm");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 프로젝트 정보 입력
	@RequestMapping(value="/project/register.hirp", method=RequestMethod.POST)
	public ModelAndView projectRegister(ModelAndView mv
			, @RequestParam("projectName") String projectName
			, @RequestParam("projectManager") String projectManager
			, @RequestParam("startDate") String startDate
			, @RequestParam("endDate") String endDate) {
		try {
			Project project = new Project();
			project.setProjectName(projectName);
			project.setProjectManager(projectManager);
			project.setStartDate(Date.valueOf(startDate));
			project.setEndDate(Date.valueOf(endDate));
			int result = pService.registerProject(project);
			if(result > 0) {
				mv.setViewName("redirect:/project/list.hirp");
			}else {
				mv.addObject("msg", "프로젝트 등록 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 프로젝트 삭제
	@RequestMapping(value="/project/remove.hirp", method=RequestMethod.GET)
	public ModelAndView deleteProject(ModelAndView mv
			, @RequestParam("projectNo") int projectNo) {
		try {
			int result = pService.removeProject(projectNo);
			if(result > 0) {
				mv.setViewName("redirect:/project/list.hirp");
			}else {
				mv.addObject("msg", "프로젝트 삭제 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 프로젝트 수정
	@RequestMapping(value="/project/modify.hirp", method=RequestMethod.GET)
	public ModelAndView updateProject(ModelAndView mv
			, @RequestParam("projectNo") int projectNo
			, @RequestParam("projectName") String projectName
			, @RequestParam("startDate") String startDate
			, @RequestParam("endDate") String endDate
			, @RequestParam("projectManager") String projectManager) {
		try {
			Project project = new Project();
			project.setProjectNo(projectNo);
			project.setProjectName(projectName);
			project.setStartDate(Date.valueOf(startDate));
			project.setEndDate(Date.valueOf(endDate));
			project.setProjectManager(projectManager);
			int result = pService.updateProject(project);
			if(result > 0) {
				mv.setViewName("redirect:/project/detail.hirp?projectNo="+projectNo);
			}else {
				mv.addObject("msg", "프로젝트 수정 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	// 칸반보드 목록
	@ResponseBody
	@RequestMapping(value = "/project/selectBoard.hirp", method=RequestMethod.GET)
	public String boardList(@RequestParam("projectNo") int projectNo) {
		List<Board> bList = pService.printAllBoard(projectNo);
		if(!bList.isEmpty()) {
			Gson gson = new Gson();
			return gson.toJson(bList);
		}
		return "";
	}
	
	// 칸반보드 추가
	@ResponseBody
	@RequestMapping(value="/project/boardAdd.hirp", method=RequestMethod.POST)
	public String insertBoard(@ModelAttribute Board board) {
		int result = pService.registerBoard(board);
		if(result > 0) {
			return "success";
		}else {
			return "fail";
		}
	}

	// 칸반보드 수정(드래그앤드롭 상태값 변경)
	@ResponseBody
	@RequestMapping(value="/project/updateBoard.hirp", method=RequestMethod.POST)
	public String updateBoard(@ModelAttribute Board board
			, @RequestParam("boardNo") int boardNo
			, @RequestParam("boardStatus") String boardStatus) {
		board.setBoardNo(boardNo);
		board.setBoardStatus(boardStatus);
		int result = pService.modifyBoard(board);
		if(result > 0) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	// 칸반보드 삭제
	@ResponseBody
	@RequestMapping(value="/project/deleteBoard.hirp", method=RequestMethod.GET)
	public String deleteBoard(@RequestParam("boardNo") int boardNo) {
		int result = pService.removeBoard(boardNo);
		if(result > 0) {
			return "success";
		}else {
			return "fail";
		}
	}
		
}
