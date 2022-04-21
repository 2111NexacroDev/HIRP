package com.highfive.hirp.project.service;

import java.util.List;

import com.highfive.hirp.project.domain.Project;

public interface ProjectService {

	public List<Project> selectAllProject();
	public int deleteProject();
	public int updateProject();
	
	public int insertBoard();
	public int deleteBoard();
}
