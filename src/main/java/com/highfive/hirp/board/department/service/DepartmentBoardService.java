package com.highfive.hirp.board.department.service;

import java.util.List;

import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface DepartmentBoardService {

		//부서게시판 리스트 조회
		public List<DepartmentBoard> printAllDepartment(PageInfo pi);
		//부서게시판 디테일 조회
		public  DepartmentBoard printOneDepartment(int departmentNo);
		//부서게시판 검색 조회
		public List<DepartmentBoard>printSearchDepartment(Search search);
		//부서글 등록
		public int registerDepartment(DepartmentBoard departmentboard);
		//부서글 수정
		public int modifyDepartment(DepartmentBoard departmentboard);
		//부서글 삭제
		public int removeDepartment(int departmentNo);
		//부서글 개수
		public int getListCount();
		//조회수 증가
		public int viewCount(int departmentNo);
		
		
		
		//댓글 조회
		public List<Reply> printAllDepartmentReply(Reply reply);
		//댓글 등록
		public int registerDepartmentReply(Reply reply);
		//댓글 수정
		public int modifyDepartmentReply(Reply reply);
		//댓글 삭제
		public int removeDepartmentReply(Reply reply);
}
