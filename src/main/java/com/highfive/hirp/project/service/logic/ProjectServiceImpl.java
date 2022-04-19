package com.highfive.hirp.project.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.project.domain.Project;
import com.highfive.hirp.project.service.ProjectService;
import com.highfive.hirp.project.store.ProjectStore;
@Service
public class ProjectServiceImpl implements ProjectService{

	@Autowired
	private ProjectStore pStore;
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<Project> selectAllProject() {
		List<Project> pList = pStore.selectAllProject(sqlSession);
		return pList;
	}
	
	@Override
	public int deleteProject() {
		int result = pStore.deleteProject(sqlSession);
		return result;
	}
	
	@Override
	public int updateProject() {
		int result = pStore.updateProject(sqlSession);
		return result;
	}
	
	@Override
	public int insertBoard() {
		int result = pStore.insertBoard(sqlSession);
		return result;
	}
	
	@Override
	public int deleteBoard() {
		int result = pStore.deleteBoard(sqlSession);
		return result;
	}
	
}
