package com.highfive.hirp.project.store.logic;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.project.domain.Board;
import com.highfive.hirp.project.domain.Project;
import com.highfive.hirp.project.store.ProjectStore;

@Repository
public class ProjectStoreLogic implements ProjectStore {

	// 전체 프로젝트 갯수
	@Override
	public int selectListCount(SqlSession sqlSession) {
		int totalCount = sqlSession.selectOne("ProjectMapper.selectListCount");
		return totalCount;
	}
	
	// 프로젝트 전체 조회
	@Override
	public List<Project> selectAll(SqlSession sqlSession, PageInfo pi) {
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1)*limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<Project> pList = sqlSession.selectList("ProjectMapper.selectAllList", pi, rowBounds);
		return pList;
	}
	
	// 프로젝트 상세 조회
	@Override
	public Project selectOneByNo(SqlSession sqlSession, int projectNo) {
		Project project = sqlSession.selectOne("ProjectMapper.selectOneByNo", projectNo);
		return project;
	}
	
	// 프로젝트 생성
	@Override
	public int insertProject(SqlSession sqlSession, Project project) {
		int result = sqlSession.insert("ProjectMapper.insertProject", project);
		return result;
	}

	// 프로젝트 삭제
	@Override
	public int deleteProject(SqlSession sqlSession, int projectNo) {
		int result = sqlSession.delete("ProjectMapper.deleteProject", projectNo);
		return result;
	}

	// 프로젝트 수정
	@Override
	public int updateProject(SqlSession sqlSession, Project project) {
		int result = sqlSession.update("ProjectMapper.updateProject", project);
		return result;
	}

	// 칸반보드 목록 조회
	@Override
	public List<Board> selectAllBoard(SqlSession sqlSession, int boardNo) {
		List<Board> bList = sqlSession.selectList("ProjectMapper.selectAllBoard", boardNo);
		return bList;
	}

	// 칸반보드 추가
	@Override
	public int insertBoard(SqlSession sqlSession, Board board) {
		int result = sqlSession.insert("ProjectMapper.insertBoard", board);
		return result;
	}

	// 칸반보드 상태값 수정
	@Override
	public int updateBoard(SqlSession sqlSession, Board board) {
		int result = sqlSession.update("ProjectMapper.updateBoard", board);
		return result;
	}
	
	// 칸반보드 삭제
	@Override
	public int deleteBoard(SqlSession sqlSession, int boardNo) {
		int result = sqlSession.delete("ProjectMapper.deleteBoard", boardNo);
		return result;
	}

}
