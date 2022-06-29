package com.highfive.hirp.board.department.service;

import java.util.List;
import java.util.Map;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public interface DepartmentBoardService {

	//부서게시판 리스트 조회
		public List<DepartmentBoard> printAllDepartment(PageInfo pi);
		
		//부서게시판 디테일 조회
		public DepartmentBoard printOneDepartment(int departmentNo);
		//부서글 디테일 해당 첨부파일 전체 조회
		public List<BoardAttachedFile> printOneFile(DepartmentBoard departmentboard);
		//부서게시판 검색 조회
		public List<DepartmentBoard>printSearchDepartment(Search search);
		//부서글 등록
		public int registerDepartment(DepartmentBoard departmentBoard);
		//첨부파일 저장
		public int registerDepartmentFile(BoardAttachedFile boardFile);
		
		//부서글 수정
		public int modifyDepartment(DepartmentBoard departmentBoard);
		//부서글 삭제
		public int removeDepartment(int departmentNo);
		//첨부파일 삭제
		public int removeBoardFile(int fileNo);
		//부서글 개수
		public int getListCount();
		//조회수 증가
		public int viewCount(int anonymousNo);
		//첨부파일 수정
		public int modifyDepartmentFile(BoardAttachedFile bFile);

		public List<DepartmentBoard> printNewestDepartment();

		//통계
		public List<Map<String,Object>> departmentStatistic(Map dateMap);

		//접속한 아이피 정보 저장
		public int registerRemoteAddrInfo(Map<String, Object> addrMap);

		//접속한 아이피 정보 조회
		public List<Map<String, Object>> remoteApprInfoList(Map<String, Object> dataMap);
}
