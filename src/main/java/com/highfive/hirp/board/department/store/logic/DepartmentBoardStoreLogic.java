package com.highfive.hirp.board.department.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.board.department.store.DepartmentBoardStore;
import com.highfive.hirp.board.notice.domain.NoticeBoard;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Search;

public class DepartmentBoardStoreLogic implements DepartmentBoardStore{

	@Override
	public List<DepartmentBoard> selectAllDepartment(SqlSession sqlSession, PageInfo pi) {
		List<DepartmentBoard> dList = sqlSession.selectList("departmentboard-mapper.selectAllDepartment",pi);
		return dList;
	}

	@Override
	public DepartmentBoard selectOneDepartment(SqlSession sqlSession, int departmentNo) {
		DepartmentBoard departmentboard = sqlSession.selectOne("departmentboard-mapper.selectOneDepartment",departmentNo);
		return departmentboard;
	}

	@Override
	public List<DepartmentBoard> selectSearchDepartment(SqlSession sqlSession, Search search) {
		List<DepartmentBoard> dList = sqlSession.selectList("departmentboard-mapper.selectSearchDepartment",search);
		return dList;
	}

	@Override
	public int insertDepartment(SqlSession sqlSession, DepartmentBoard departmentboard) {
		int result = sqlSession.insert("departmentboard-mapper.insertDepartment",departmentboard);
		return result;
	}

	@Override
	public int updateDepartment(SqlSession sqlSession, DepartmentBoard departmentboard) {
		int result = sqlSession.update("departmentboard-mapper.updateDepartment",departmentboard);
		return result;
	}

	@Override
	public int deleteDepartment(SqlSession sqlSession, int departmentNo) {
		int result = sqlSession.delete("departmentboard-mapper.deleteDepartment",departmentNo);
		return result;
	}

	@Override
	public int selectListCount(SqlSession sqlSession) {
		int result = sqlSession.selectOne("departmentboard-mapper.selectListCount");
		return result;
	}

	@Override
	public int selectViewCount(SqlSession sqlSession, int departmentNo) {
		int result = sqlSession.update("departmentboard-mapper.updateViewCount");
		return result;
	}

	@Override
	public List<Reply> selectAllDepartmentReply(SqlSession sqlSession, Reply reply) {
		List<Reply> nReply = sqlSession.selectList("departmentboard-mapper.selectAllDepartmentReply", reply);
		return nReply;
	}

	@Override
	public int insertDepartmentReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.insert("departmentboard-mapper.insertDepartmentReply",reply);
		return result;
	}

	@Override
	public int updateDepartmentReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.update("departmentboard-mapper.updateDepartmentReply",reply);
		return result;
	}

	@Override
	public int deleteDepartmentReply(SqlSession sqlSession, Reply reply) {
		int result = sqlSession.delete("departmentboard-mapper.deleteDepartmentReply",reply);
		return result;
	}

}
