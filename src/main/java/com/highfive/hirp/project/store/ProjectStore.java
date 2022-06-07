package com.highfive.hirp.project.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.project.domain.Board;
import com.highfive.hirp.project.domain.Project;

public interface ProjectStore {

	int selectListCount(SqlSession sqlSession); // 전체 프로젝트 갯수
	List<Project> selectAll(SqlSession sqlSession, PageInfo pi); // 프로젝트 전체 조회
	Project selectOneByNo(SqlSession sqlSession, int projectNo); // 프로젝트 상세 조회
	int insertProject(SqlSession sqlSession, Project project); // 프로젝트 생성
	int deleteProject(SqlSession sqlSession, int projectNo); // 프로젝트 삭제
	int updateProject(SqlSession sqlSession, Project project); // 프로젝트 수정
	
	List<Board> selectAllBoard(SqlSession sqlSession, int boardNo); // 칸반보드 전체 조회
	int insertBoard(SqlSession sqlSession, Board board); // 칸반보드 추가
	int deleteBoard(SqlSession sqlSession, int boardNo); // 칸반보드 삭제
	int updateBoard(SqlSession sqlSession, Board board); // 칸반보드 수정

}
