package com.highfive.hirp.project.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.project.domain.Board;
import com.highfive.hirp.project.domain.Project;
import com.highfive.hirp.project.store.ProjectStore;

@Repository
public class ProjectStoreLogic implements ProjectStore{

	@Override
	public List<Project> selectAll(SqlSession sqlSession, PageInfo pi) {
		List<Project> pList = sqlSession.selectList("ProjectMapper.selectAllList", pi);
		return pList;
	}

	@Override
	public int selectOneByNo(SqlSession sqlSession, int projectNo) {
		int result = sqlSession.selectOne("ProjectMapper.selectOneByNo", projectNo);
		return result;
	}

	@Override
	public int deleteProject(SqlSession sqlSession, int projectNo) {
		int result = sqlSession.delete("ProjectMapper.deleteProject", projectNo);
		return result;
	}

	@Override
	public int updateProject(SqlSession sqlSession, int projectNo) {
		int result = sqlSession.update("ProjectMapper.updateProject", projectNo);
		return result;
	}

	@Override
	public List<Board> selectAllBoard(SqlSession sqlSession, int projectNo) {
		List<Board> bList = sqlSession.selectList("ProjectMapper.selectAllBoard", projectNo);
		return bList;
	}

	@Override
	public int insertBoard(SqlSession sqlSession, Board board) {
		int result = sqlSession.insert("ProjectMapper.insertBoard", board);
		return result;
	}

	@Override
	public int deleteBoard(SqlSession sqlSession, int boardNo) {
		int result = sqlSession.delete("ProjectMapper.deleteBoard", boardNo);
		return result;
	}

}
