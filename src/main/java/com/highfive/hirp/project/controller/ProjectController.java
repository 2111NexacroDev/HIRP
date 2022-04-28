package com.highfive.hirp.project.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Pagination;
import com.highfive.hirp.project.domain.Board;
import com.highfive.hirp.project.domain.Project;
import com.highfive.hirp.project.service.ProjectService;

@Controller
public class ProjectController {

	@Autowired
	private ProjectService pService;
	
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
				mv.setViewName("project/projectList");
			}else {
				mv.addObject("msg", "프로젝트 조회 실패");
				mv.setViewName("");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("");
		}
		mv.setViewName("project/projectList");
		return mv;
	}
	
	// 프로젝트 상세 조회
	@RequestMapping(value="/project/Detail.hirp", method=RequestMethod.GET)
	public ModelAndView projectDetailView(ModelAndView mv
			, @RequestParam("projectNo") int projectNo) {
		try {
			Project project = pService.printOneByNo(projectNo);
			if(project != null) {
				mv.addObject("project", project);
				mv.setViewName("project/projectDetail");
			}else {
				mv.addObject("msg", "프로젝트 상세조회 실패");
				mv.setViewName("");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("");
		}
		return mv;
	}
	
	// 프로젝트 만들기 화면
	@RequestMapping(value="/project/writeView.hirp", method=RequestMethod.GET)
	public ModelAndView projectWriteView(ModelAndView mv) {
		try {
			mv.setViewName("project/projectWriteForm");
		}catch(Exception e) {
			
		}
		return mv;
	}
	
	// 프로젝트 정보 입력
	@RequestMapping(value="/project/register.hirp", method=RequestMethod.POST)
	public ModelAndView projectRegister(ModelAndView mv
			, @ModelAttribute Project project
			, @RequestParam("projectName") String projectName
			, @RequestParam("projectManager") String projectManager
			, @RequestParam("startDate") Date startDate
			, @RequestParam("endDate") Date endDate) {
		try {
			project.setProjectName(projectName);
			project.setProjectManager(projectManager);
			project.setStartDate(startDate);
			project.setEndDate(endDate);
			int result = pService.registerProject(project);
			if(result > 0) {
				mv.setViewName("redirect:/project/list.hirp");
			}else {
				mv.addObject("msg", "프로젝트 등록 실패");
				mv.setViewName("");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("");
		}
		return mv;
	}
	
	// 프로젝트 삭제
	public ModelAndView deleteProject(ModelAndView mv
			, @RequestParam("projectNo") int projectNo) {
		return mv;
	}
	
	// 프로젝트 수정
	public ModelAndView updateProject(ModelAndView mv
			, @RequestParam("projectNo") int projectNo) {
		return mv;
	}
	
	// 프로젝트 칸반보드 목록
	public ModelAndView boardList(ModelAndView mv
			, @RequestParam("projectNo") int projectNo) {
		return mv;
	}
	
	// 칸반보드 추가
	public ModelAndView insertBoard(ModelAndView mv
			, @ModelAttribute Board board) {
		return mv;
	}
	
	// 칸반보드 삭제
	public ModelAndView deleteBoard(ModelAndView mv
			, @RequestParam("boardNo") int boardNo) {
		return mv;
	}
		
}
