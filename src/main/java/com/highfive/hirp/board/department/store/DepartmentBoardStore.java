package com.highfive.hirp.board.department.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface DepartmentBoardStore {

	//부서게시판 리스트 출력
	public List<DepartmentBoard> selectAllDepartment(SqlSession sqlSession,PageInfo pi);
	//부서게시판 디테일 출력
	public DepartmentBoard selectOneDepartment(SqlSession sqlSession, int departmentNo);
	//부서글 첨부파일 디테일 출력
	public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession, DepartmentBoard departmentboard);
	//부서게시판 검색 리스트 출력
	public List<DepartmentBoard> selectSearchDepartment(SqlSession sqlSession, Search search);
	//부서게시판 등록
	public int insertDepartment(SqlSession sqlSession, DepartmentBoard departmentboard);
	//첨부파일 저장
	public int insertDepartmentFile(SqlSession sqlSession, BoardAttachedFile boardFile);
	//부서게시판 수정
	public int updateDepartment(SqlSession sqlSession, DepartmentBoard departmentboard);
	//부서게시판 삭제
	public int deleteDepartment(SqlSession sqlSession, int departmentNo);
	//부서게시판 리스트 개수
	public int selectListCount(SqlSession sqlSession);
	//조회수
	public int updateViewCount(SqlSession sqlSession, int departmentNo);
	
	//첨부파일 삭제
	public int deleteBoardFile(SqlSession sqlSession, int fileNo);

	public int updateBoardFile(SqlSession sqlSession, BoardAttachedFile boardFile);
	public List<DepartmentBoard> selectNewestDepartment(SqlSession sqlSession);


}
