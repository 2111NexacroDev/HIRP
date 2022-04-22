package com.highfive.hirp.approval.admin.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.approval.admin.domain.ApprForm;

public interface ApprFormStore {

	List<ApprForm> selectAllForm(SqlSession sqlSession);

	ApprForm selectOneForm(SqlSession sqlSession);

	int insertForm(SqlSession sqlSession, ApprForm form);

	int updateForm(SqlSession sqlSession, ApprForm form);

	int deleteForm(SqlSession sqlSession, int formNo);

}
