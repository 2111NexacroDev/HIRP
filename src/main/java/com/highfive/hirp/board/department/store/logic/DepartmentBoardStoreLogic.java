package com.highfive.hirp.board.department.store.logic;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.department.store.DepartmentBoardStore;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

@Repository
public class DepartmentBoardStoreLogic implements DepartmentBoardStore{

	//자유게시판 전체 조회
	@Override
	public List<DepartmentBoard> selectAllDepartment(SqlSession sqlSession, PageInfo pi) {
		// 1 -> 1 ~ 10
		// 2 -> 11 ~ 20
		int limit = pi.getListLimit();
		int currentPage = pi.getCurrentPage();
		int offset = (currentPage - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		List<DepartmentBoard> dList = sqlSession.selectList("DepartmentBoardMapper.selectAllDepartment",pi,rowBounds);
		return dList;
	}

	//자유게시판 하나 조회
	@Override
	public DepartmentBoard selectOneDepartment(SqlSession sqlSession, int departmentNo) {
		DepartmentBoard departmentboard = sqlSession.selectOne("DepartmentBoardMapper.selectOneDepartment",departmentNo);
		return departmentboard;
	}

	//게시글 디테일 첨부파일 조회
	@Override
	public List<BoardAttachedFile> selectOneFile(SqlSession sqlSession, DepartmentBoard departmentboard) {
		List<BoardAttachedFile> fList = sqlSession.selectOne("BoardAttachedFileMapper.selectOneFile",departmentboard);
		return fList;
	}
	
	//자유게시판 검색 조회
	@Override
	public List<DepartmentBoard> selectSearchDepartment(SqlSession sqlSession, Search search) {
		List<DepartmentBoard> aList = sqlSession.selectList("DepartmentBoardMapper.selectSearchDepartment",search);
		return aList;
	}

	//게시글 등록
	@Override
	public int insertDepartment(SqlSession sqlSession, DepartmentBoard departmentboard) {
		int result = sqlSession.insert("DepartmentBoardMapper.insertDepartment",departmentboard);
		return result;
	}
	
	//첨부파일 등록
	@Override
	public int insertDepartmentFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int fileResult = sqlSession.insert("DepartmentBoardMapper.insertBoardFile",boardFile);
		return fileResult;
	}
	
	//게시글 수정
	@Override
	public int updateDepartment(SqlSession sqlSession, DepartmentBoard departmentboard) {
		int result = sqlSession.update("DepartmentBoardMapper.updateDepartment",departmentboard);
		return result;
	}

	//게시글 삭제
	@Override
	public int deleteDepartment(SqlSession sqlSession, int departmentNo) {
		int result = sqlSession.update("DepartmentBoardMapper.deleteDepartment",departmentNo);
		return result;
	}

	//게시글 개수
	@Override
	public int selectListCount(SqlSession sqlSession) {
		int result = sqlSession.selectOne("DepartmentBoardMapper.selectListCount");
		return result;
	}
	
	//조회수 증가
	@Override
	public int updateViewCount(SqlSession sqlSession, int departmentNo) {
		int viewCount = sqlSession.update("DepartmentBoardMapper.updateCount", departmentNo);
		return viewCount;
	}

	//첨부파일 삭제
	@Override
	public int deleteBoardFile(SqlSession sqlSession, int fileNo) {
		int result = sqlSession.delete("BoardAttachedFileMapper.deleteFile",fileNo);
		return result;
	}

	//첨부파일 수정
	@Override
	public int updateBoardFile(SqlSession sqlSession, BoardAttachedFile boardFile) {
		int result = sqlSession.insert("DepartmentBoardMapper.updateBoardFile",boardFile);
		return result;
	}

	@Override
	public List<DepartmentBoard> selectNewestDepartment(SqlSession sqlSession) {
		List<DepartmentBoard> dList = sqlSession.selectList("DepartmentBoardMapper.selectNewestDepartment");
		return dList;
	}

	//통계
	@Override
	public List<Map<String,Object>> departmentStatistic(Map dateMap, SqlSession sqlSession) {
		List<Map<String,Object>> dList = sqlSession.selectList("DepartmentBoardMapper.departmentStatistic",dateMap);
		return dList;
	}

	//접속한 IP정보 등록
	@Override
	public int insertRemoteAddrInfo(Map<String, Object> addrMap, SqlSession sqlSession) {
		int result = sqlSession.insert("DepartmentBoardMapper.insertRemoteAddrInfo", addrMap);
		return result;
	}

	@Override
	public List<Map<String, Object>> selectRemoteApprInfoList(Map<String, Object> dataMap,SqlSession sqlSession) {
		List<Map<String, Object>> mapList = sqlSession.selectList("DepartmentBoardMapper.selectRemoteApprInfoList",dataMap);
		return mapList;
	}
}
