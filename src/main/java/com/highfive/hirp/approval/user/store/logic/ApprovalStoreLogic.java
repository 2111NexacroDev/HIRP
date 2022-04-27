package com.highfive.hirp.approval.user.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.user.domain.ApprAccept;
import com.highfive.hirp.approval.user.domain.Approval;
import com.highfive.hirp.approval.user.domain.Reference;
import com.highfive.hirp.approval.user.store.ApprovalStore;
import com.highfive.hirp.common.Search;
@Repository
public class ApprovalStoreLogic implements ApprovalStore{

	@Override
	public List<ApprForm> selectAllApprForm(SqlSession sqlSession) {
		List<ApprForm> aList = sqlSession.selectList("");
		return aList;
	}

	@Override
	public List<ApprForm> selectSearchApprForm(SqlSession sqlSession, Search search) {
		List<ApprForm> aList = sqlSession.selectList("",search);
		return aList;
	}

	@Override
	public ApprForm selectApprForm(SqlSession sqlSession, int formNo) {
		ApprForm apprForm = sqlSession.selectOne("",formNo);
		return apprForm;
	}

	@Override
	public int insertApprover(SqlSession sqlSession, ApprAccept apprAccept) {
		int result = sqlSession.insert("",apprAccept);
		return result;
	}

	@Override
	public int insertReference(SqlSession sqlSession, Reference reference) {
		int result = sqlSession.insert("",reference);
		return result;
	}

	@Override
	public int insertAppr(SqlSession sqlSession, Approval approval) {
		int result = sqlSession.insert("",approval);
		return result;
	}

	@Override
	public int insertStoragedAppr(SqlSession sqlSession, Approval approval) {
		int result = sqlSession.insert("",approval);
		return result;
	}

	@Override
	public int updateStoragedAppr(SqlSession sqlSession, int docNo) {
		int result = sqlSession.update("",docNo);
		return result;
	}

	@Override
	public int deleteStoragedAppr(SqlSession sqlSession, int docNo) {
		int result = sqlSession.delete("",docNo);
		return result;
	}

	@Override
	public List<Approval> selectAllWaitingAppr(SqlSession sqlSession, ApprAccept apprAccept) {
		List<Approval> aList = sqlSession.selectList("",apprAccept);
		return aList;
	}

	@Override
	public Approval selectOneWaitingAppr(SqlSession sqlSession, int docNo) {
		Approval approval = sqlSession.selectOne("",docNo);
		return approval;
	}

	@Override
	public List<ApprAccept> selectApprovalStatus(SqlSession sqlSession, int docNo) {
		List<ApprAccept> aList = sqlSession.selectList("",docNo);
		return aList;
	}

	@Override
	public int updateApprStatus(SqlSession sqlSession, ApprAccept apprAccept) {
		int result = sqlSession.update("",apprAccept);
		return result;
	}

	@Override
	public int updateApprovalStatus(SqlSession sqlSession, Approval approval) {
		int result = sqlSession.update("",approval);
		return result;
	}

	@Override
	public int deleteApproval(SqlSession sqlSession, int docNo) {
		int result = sqlSession.delete("",docNo);
		return result;
	}

	@Override
	public int deleteApprAccept(SqlSession sqlSession, int docNo) {
		int result = sqlSession.delete("",docNo);
		return result;
	}

	@Override
	public List<Approval> selectAllWrittenAppr(SqlSession sqlSession, ApprAccept apprAccept) {
		List<Approval> aList =sqlSession.selectList("",apprAccept);
		return aList;
	}

	@Override
	public List<Approval> selectAllTemporaryStorageAppr(SqlSession sqlSession, ApprAccept apprAccept) {
		List<Approval> aList=sqlSession.selectList("",apprAccept);
		return aList;
	}

	@Override
	public List<Approval> selectAllRejectedAppr(SqlSession sqlSession, ApprAccept apprAccept) {
		List<Approval> aList= sqlSession.selectList("",apprAccept);
		return aList;
	}

	@Override
	public List<Approval> selectAllCompletedAppr(SqlSession sqlSession, ApprAccept apprAccept) {
		List<Approval> aList= sqlSession.selectList("",apprAccept);
		return aList;
	}

	@Override
	public Approval selectOneAppr(SqlSession sqlSession,int docNo) {
		Approval approval = sqlSession.selectOne("",docNo);
		return approval;
	}

}
