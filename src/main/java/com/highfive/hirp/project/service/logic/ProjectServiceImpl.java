package com.highfive.hirp.project.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.project.domain.Board;
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
	public int getListCount() {
		int totalCount = pStore.selectListCount(sqlSession);
		return totalCount;
	}
	
	@Override
	public List<Project> printAll(PageInfo pi) {
		List<Project> pList = pStore.selectAll(sqlSession, pi);
		return pList;
	}
	
	@Override
	public int registerProject(Project project) {
		int result = pStore.insertProject(sqlSession, project);
		return result;
	}

	@Override
	public Project printOneByNo(int projectNo) {
		Project project = pStore.selectOneByNo(sqlSession, projectNo);
		return project;
	}

	@Override
	public int removeProject(int projectNo) {
		int result = pStore.deleteProject(sqlSession, projectNo);
		return result;
	}

	@Override
	public int updateProject(Project project) {
		int result = pStore.updateProject(sqlSession, project);
		return result;
	}

	@Override
	public List<Board> printAllBoard(int projectNo) {
		List<Board> bList = pStore.selectAllBoard(sqlSession, projectNo);
		return bList;
	}

	@Override
	public int registerBoard(Board board) {
		int result = pStore.insertBoard(sqlSession, board);
		return result;
	}

	@Override
	public int modifyBoard(Board board) {
		int result = pStore.updateBoard(sqlSession, board);
		return result;
	}
	
	@Override
	public int removeBoard(int boardNo) {
		int result = pStore.deleteBoard(sqlSession, boardNo);
		return result;
	}

}
