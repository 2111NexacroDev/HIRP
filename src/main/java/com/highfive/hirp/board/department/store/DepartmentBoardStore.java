package com.highfive.hirp.board.department.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.board.common.PageInfo;
import com.highfive.hirp.board.common.Reply;
import com.highfive.hirp.board.department.domain.DepartmentBoard;
import com.highfive.hirp.common.Search;

public interface DepartmentBoardStore {

	List<DepartmentBoard> selectAllDepartment(SqlSession sqlSession, PageInfo pi);

	DepartmentBoard selectOneDepartment(SqlSession sqlSession, int departmentNo);

	List<DepartmentBoard> selectSearchDepartment(SqlSession sqlSession, Search search);

	int insertDepartment(SqlSession sqlSession, DepartmentBoard departmentboard);

	int updateDepartment(SqlSession sqlSession, DepartmentBoard departmentboard);

	int deleteDepartment(SqlSession sqlSession, int departmentNo);

	int selectListCount(SqlSession sqlSession);

	int selectViewCount(SqlSession sqlSession, int departmentNo);

	List<Reply> selectAllDepartmentReply(SqlSession sqlSession, Reply reply);

	int insertDepartmentReply(SqlSession sqlSession, Reply reply);

	int updateDepartmentReply(SqlSession sqlSession, Reply reply);

	int deleteDepartmentReply(SqlSession sqlSession, Reply reply);



}
