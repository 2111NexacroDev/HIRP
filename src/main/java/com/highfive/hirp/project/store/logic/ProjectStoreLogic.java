package com.highfive.hirp.project.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.project.domain.Project;
import com.highfive.hirp.project.store.ProjectStore;

@Repository
public class ProjectStoreLogic implements ProjectStore{

	@Override
	public List<Project> selectAllProject(SqlSession sqlSession) {
		List<Project> pList = sqlSession.selectList("");
		return pList;
	}

	@Override
	public int deleteProject(SqlSession sqlSession) {
		int result = sqlSession.delete("");
		return result;
	}

	@Override
	public int updateProject(SqlSession sqlSession) {
		int result = sqlSession.update("");
		return result;
	}

	@Override
	public int insertBoard(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int deleteBoard(SqlSession sqlSession) {
		int result = sqlSession.delete("");
		return result;
	}

}
