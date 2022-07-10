package com.highfive.hirp.board.department.service.logic;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.board.anonymous.domain.AnonymousBoard;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.department.service.DepartmentBoardService;
import com.highfive.hirp.board.department.store.DepartmentBoardStore;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

@Service
public class DepartmentBoardServiceImpl implements DepartmentBoardService{

	@Autowired
	private DepartmentBoardStore dStore;
	
	@Autowired
	private SqlSession sqlSession;

	//자유게시판 전체 조회
	@Override
	public List<DepartmentBoard> printAllDepartment(PageInfo pi) {
		List<DepartmentBoard> dList = dStore.selectAllDepartment(sqlSession,pi);
		return dList;
	}
	//자유게시판 하나 조회
	@Override
	public DepartmentBoard printOneDepartment(int DepartmentNo) {
		DepartmentBoard departmentboard = dStore.selectOneDepartment(sqlSession,DepartmentNo);
		return departmentboard;
	}
	
	//게시글 디테일 첨부파일 조회
	@Override
	public List<BoardAttachedFile> printOneFile(DepartmentBoard departmentboard) {
		List<BoardAttachedFile> dList = dStore.selectOneFile(sqlSession,departmentboard);
		return dList;
	}
	
	//자유게시판 검색 조회
	@Override
	public List<DepartmentBoard> printSearchDepartment(Search search) {
		List<DepartmentBoard> dList = dStore.selectSearchDepartment(sqlSession,search);
		return dList;
	}

	//자유게시판 등록
	@Override
	public int registerDepartment(DepartmentBoard departmentboard) {
		int result = dStore.insertDepartment(sqlSession, departmentboard);
		return result;
	}
	//첨부파일 등록
	@Override
	public int registerDepartmentFile(BoardAttachedFile boardFile) {
		int fileResult = dStore.insertDepartmentFile(sqlSession, boardFile);
		return fileResult;
	}

	//자유게시판 수정
	@Override
	public int modifyDepartment(DepartmentBoard departmentboard) {
		int result = dStore.updateDepartment(sqlSession, departmentboard);
		return result;
	}

	//자유게시판 삭제
	@Override
	public int removeDepartment(int departmentNo) {
		int result = dStore.deleteDepartment(sqlSession, departmentNo);
		return result;
	}

	//첨부파일 삭제
	@Override
	public int removeBoardFile(int fileNo) {
		int result = dStore.deleteBoardFile(sqlSession,fileNo);
		return result;
	}
	
	//게시글 개수 조회
	@Override
	public int getListCount() {
		int listCount = dStore.selectListCount(sqlSession);
		return listCount;
	}
	//조회수 증가
	@Override
	public int viewCount(int departmentNo) {
		int viewCount = dStore.updateViewCount(sqlSession,departmentNo);
		return viewCount;
	}
	@Override
	public int modifyDepartmentFile(BoardAttachedFile bFile) {
		int result = dStore.updateBoardFile(sqlSession, bFile);
		return result;
	}
	@Override
	public List<DepartmentBoard> printNewestDepartment() {
		List<DepartmentBoard> dList = dStore.selectNewestDepartment(sqlSession);
		return dList;
	}
	
	//통계
	@Override
	public List<Map<String,Object>> departmentStatistic(Map dateMap) {
		List<Map<String,Object>> dList = dStore.departmentStatistic(dateMap,sqlSession);
		return dList;
	}
	
	//접속한 IP정보
	@Override
	public int registerRemoteAddrInfo(Map<String, Object> addrMap) {
		int result = dStore.insertRemoteAddrInfo(addrMap,sqlSession);
		return result;
	}
	
	//접속한 IP정보 조회
	@Override
	public List<Map<String, Object>> remoteApprInfoList(Map<String, Object> dataMap) {
		List<Map<String, Object>> mapList = dStore.selectRemoteApprInfoList(dataMap,sqlSession);
		return mapList;
	}
	

}
