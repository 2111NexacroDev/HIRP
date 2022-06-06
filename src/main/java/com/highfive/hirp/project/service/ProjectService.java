package com.highfive.hirp.project.service;

import java.util.List;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.project.domain.Board;
import com.highfive.hirp.project.domain.Project;

public interface ProjectService {

	public int getListCount(); // 전체 프로젝트 갯수
	public List<Project> printAll(PageInfo pi); // 프로젝트 전체 조회
	public Project printOneByNo(int projectNo); // 프로젝트 상세 조회
	public int registerProject(Project project); // 프로젝트 생성
	public int removeProject(int projectNo); // 프로젝트 삭제
	public int updateProject(Project project); // 프로젝트 수정
	
	public List<Board> printAllBoard(int projectNo); // 칸반보드 전체 조회
	public int registerBoard(Board board); // 칸반보드 추가
	public int modifyBoard(Board board); // 칸반보드 수정
	public int removeBoard(int boardNo); // 칸반보드 삭제
}
