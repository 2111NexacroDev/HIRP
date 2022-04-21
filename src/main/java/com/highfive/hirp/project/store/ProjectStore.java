package com.highfive.hirp.project.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.project.domain.Project;

public interface ProjectStore {

	List<Project> selectAllProject(SqlSession sqlSession);
	int deleteProject(SqlSession sqlSession);
	int updateProject(SqlSession sqlSession);
	int insertBoard(SqlSession sqlSession);
	int deleteBoard(SqlSession sqlSession);

}
