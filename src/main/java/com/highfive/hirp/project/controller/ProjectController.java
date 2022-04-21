package com.highfive.hirp.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.project.domain.Project;
import com.highfive.hirp.project.service.ProjectService;

@Controller
public class ProjectController {

	@Autowired
	private ProjectService pService;
	
	// 프로젝트 보기 화면
	public ModelAndView projectView(ModelAndView mv) {
		return mv;
	}
	
	// 프로젝트 전체 정보 조회
	public ModelAndView selectAllProject(ModelAndView mv) {
		return mv;
	}
	
	// 프로젝트 만들기 화면
	public ModelAndView createProjectView(ModelAndView mv) {
		return mv;
	}
	
	// 프로젝트 삭제
	public ModelAndView deleteProject(ModelAndView mv) {
		return mv;
	}
	
	// 프로젝트 수정
	public ModelAndView updateProject(ModelAndView mv) {
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
