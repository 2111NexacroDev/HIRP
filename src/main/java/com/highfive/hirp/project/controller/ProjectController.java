package com.highfive.hirp.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.project.domain.Project;
import com.highfive.hirp.project.service.ProjectService;

@Controller
public class ProjectController {

	@Autowired
	private ProjectService pService;
	
	// 프로젝트 목록 보기 화면
	public ModelAndView projectListView(ModelAndView mv
			, @ModelAttribute Project project
			, @RequestParam(value="page", required=false) Integer page) {
		return mv;
	}
	
	// 프로젝트 상세 조회
	public ModelAndView projectDetailView(ModelAndView mv) {
		return mv;
	}
	
	// 프로젝트 만들기 화면
	public ModelAndView projectWriteView(ModelAndView mv) {
		return mv;
	}
	
	// 프로젝트 삭제
	public ModelAndView deleteProject(ModelAndView mv) {
		return mv;
	}
	
	// 프로젝트 수정
	public ModelAndView updateProject(ModelAndView mv
			, @RequestParam("projectNo") int projectNo) {
		return mv;
	}
	
	// 칸반보드 추가
	public ModelAndView insertBoard(ModelAndView mv) {
		return mv;
	}
	
	// 칸반보드 삭제
	public ModelAndView deleteBoard(ModelAndView mv) {
		return mv;
	}
		
}
