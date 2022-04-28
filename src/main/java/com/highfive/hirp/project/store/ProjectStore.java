package com.highfive.hirp.project.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.project.domain.Board;
import com.highfive.hirp.project.domain.Project;

public interface ProjectStore {

	int selectListCount(SqlSession sqlSession);
	List<Project> selectAll(SqlSession sqlSession, PageInfo pi);
	Project selectOneByNo(SqlSession sqlSession, int projectNo);
	int insertProject(SqlSession sqlSession, Project project);
	int deleteProject(SqlSession sqlSession, int projectNo);
	int updateProject(SqlSession sqlSession, int projectNo);
	
	List<Board> selectAllBoard(SqlSession sqlSession, int projectNo);
	int insertBoard(SqlSession sqlSession, Board board);
	int deleteBoard(SqlSession sqlSession, int boardNo);

}
