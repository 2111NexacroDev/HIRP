package com.highfive.hirp.approval.admin.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.admin.store.ApprFormStore;

@Repository
public class ApprFormStoreLogic implements ApprFormStore {

	@Override
	public List<ApprForm> selectAllForm(SqlSession sqlSession) {
		List<ApprForm> aList = sqlSession.selectList("");
		return aList;
	}

	@Override
	public ApprForm selectOneForm(SqlSession sqlSession) {
		ApprForm form = sqlSession.selectOne("");
		return form;
	}

	@Override
	public int insertForm(SqlSession sqlSession, ApprForm form) {
		int result = sqlSession.insert("",form);
		return result;
	}

	@Override
	public int updateForm(SqlSession sqlSession, ApprForm form) {
		int result = sqlSession.update("",form);
		return result;
	}

	@Override
	public int deleteForm(SqlSession sqlSession, int formNo) {
		int result = sqlSession.delete("",formNo);
		return result;
	}

}
