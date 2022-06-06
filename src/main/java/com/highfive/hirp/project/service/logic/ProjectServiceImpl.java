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
public class ProjectServiceImpl implements ProjectService {
	@Autowired
	private ProjectStore pStore;
	@Autowired
	private SqlSession sqlSession;

	// 전체 프로젝트 갯수
	@Override
	public int getListCount() {
		int totalCount = pStore.selectListCount(sqlSession);
		return totalCount;
	}
	
	// 프로젝트 전체 조회
	@Override
	public List<Project> printAll(PageInfo pi) {
		List<Project> pList = pStore.selectAll(sqlSession, pi);
		return pList;
	}

	// 프로젝트 상세 조회
	@Override
	public Project printOneByNo(int projectNo) {
		Project project = pStore.selectOneByNo(sqlSession, projectNo);
		return project;
	}

	// 프로젝트 생성
	@Override
	public int registerProject(Project project) {
		int result = pStore.insertProject(sqlSession, project);
		return result;
	}
	
	// 프로젝트 삭제
	@Override
	public int removeProject(int projectNo) {
		int result = pStore.deleteProject(sqlSession, projectNo);
		return result;
	}

	// 프로젝트 수정
	@Override
	public int updateProject(Project project) {
		int result = pStore.updateProject(sqlSession, project);
		return result;
	}

	// 칸반보드 목록 조회
	@Override
	public List<Board> printAllBoard(int projectNo) {
		List<Board> bList = pStore.selectAllBoard(sqlSession, projectNo);
		return bList;
	}

	// 칸반보드 추가
	@Override
	public int registerBoard(Board board) {
		int result = pStore.insertBoard(sqlSession, board);
		return result;
	}

	// 칸반보드 상태값 수정
	@Override
	public int modifyBoard(Board board) {
		int result = pStore.updateBoard(sqlSession, board);
		return result;
	}
	
	// 칸반보드 삭제
	@Override
	public int removeBoard(int boardNo) {
		int result = pStore.deleteBoard(sqlSession, boardNo);
		return result;
	}

}
