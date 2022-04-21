package com.highfive.hirp.board.department.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.department.service.DepartmentBoardService;
import com.highfive.hirp.board.department.store.DepartmentBoardStore;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public class DepartmentBoardServiceImpl implements DepartmentBoardService{

	@Autowired
	private DepartmentBoardStore dStore;
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<DepartmentBoard> printAllDepartment(PageInfo pi) {
		List<DepartmentBoard> dList = dStore.selectAllDepartment(sqlSession,pi);
		return dList;
	}

	@Override
	public DepartmentBoard printOneDepartment(int departmentNo) {
		DepartmentBoard departmentboard = dStore.selectOneDepartment(sqlSession,departmentNo);
		return departmentboard;
	}

	@Override
	public List<DepartmentBoard> printSearchDepartment(Search search) {
		List<DepartmentBoard> dList = dStore.selectSearchDepartment(sqlSession,search);
		return dList;
	}

	@Override
	public int registerDepartment(DepartmentBoard departmentboard) {
		int result = dStore.insertDepartment(sqlSession, departmentboard);
		return result;
	}

	@Override
	public int modifyDepartment(DepartmentBoard departmentboard) {
		int result = dStore.updateDepartment(sqlSession, departmentboard);
		return result;
	}

	@Override
	public int removeDepartment(int departmentNo) {
		int result = dStore.deleteDepartment(sqlSession, departmentNo);
		return result;
	}

	@Override
	public int getListCount() {
		int listCount = dStore.selectListCount(sqlSession);
		return listCount;
	}

	@Override
	public int viewCount(int departmentNo) {
		int viewCount = dStore.selectViewCount(sqlSession,departmentNo);
		return viewCount;
	}

	@Override
	public List<Reply> printAllDepartmentReply(Reply reply) {
		List<Reply> dReply = dStore.selectAllDepartmentReply(sqlSession,reply);
		return dReply;
	}

	@Override
	public int registerDepartmentReply(Reply reply) {
		int result = dStore.insertDepartmentReply(sqlSession, reply);
		return result;
	}

	@Override
	public int modifyDepartmentReply(Reply reply) {
		int result = dStore.updateDepartmentReply(sqlSession, reply);
		return result;
	}

	@Override
	public int removeDepartmentReply(Reply reply) {
		int result = dStore.deleteDepartmentReply(sqlSession, reply);
		return result;
	}
	
	

}
