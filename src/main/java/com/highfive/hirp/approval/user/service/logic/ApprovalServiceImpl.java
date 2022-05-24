package com.highfive.hirp.approval.user.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.user.domain.ApprAccept;
import com.highfive.hirp.approval.user.domain.ApprAttachedFile;
import com.highfive.hirp.approval.user.domain.Approval;
import com.highfive.hirp.approval.user.domain.Reference;
import com.highfive.hirp.approval.user.service.ApprovalService;
import com.highfive.hirp.approval.user.store.ApprovalStore;
import com.highfive.hirp.common.Search;

@Service
public class ApprovalServiceImpl implements ApprovalService{

	@Autowired
	private ApprovalStore aStore;
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<ApprForm> printAllApprForm() {
		List<ApprForm> aList = aStore.selectAllApprForm(sqlSession);
		return aList;
	}

	@Override
	public List<ApprForm> printSearchApprForm(Search search) {
		List<ApprForm> aList = aStore.selectSearchApprForm(sqlSession,search);
		return aList;
	}

	@Override
	public ApprForm printApprForm(int formNo) {
		ApprForm apprForm = aStore.selectApprForm(sqlSession,formNo);
		return apprForm;
	}

	@Override
	public int registerApprover(ApprAccept apprAccept) {
		int result = aStore.insertApprover(sqlSession,apprAccept);
		return result;
	}

	@Override
	public int regitserReference(Reference reference) {
		int result = aStore.insertReference(sqlSession,reference);
		return result;
	}

	@Override
	public int registerAppr(Approval approval) {
		int result = aStore.insertAppr(sqlSession,approval);
		return result;
	}

	@Override
	public int registerStoragedAppr(Approval approval) {
		int result = aStore.insertStoragedAppr(sqlSession,approval);
		return result;
	}

	@Override
	public int modifyStoragedAppr(int docNo) {
		int result = aStore.updateStoragedAppr(sqlSession,docNo);
		return result;
	}

	@Override
	public int removeStoragedAppr(int docNo) {
		int result = aStore.deleteStoragedAppr(sqlSession,docNo);
		return result;
	}

	@Override
	public List<Approval> printAllWaitingAppr(String emplId) {
		List<Approval> aList = aStore.selectAllWaitingAppr(sqlSession,emplId);
		return aList;
	}

	@Override
	public Approval printOneWaitngAppr(int docNo) {
		Approval approval = aStore.selectOneWaitingAppr(sqlSession,docNo);
		return approval;
	}

	@Override
	public List<ApprAccept> printApprovalStatus(int docNo) {
		List<ApprAccept> aList = aStore.selectApprovalStatus(sqlSession,docNo);
		return aList;
	}

	@Override
	public int modifyApprStatus(ApprAccept apprAccept) {
		int result = aStore.updateApprStatus(sqlSession,apprAccept);
		return result;
	}

	@Override
	public int modifyApprovalStatus(Approval approval) {
		int result = aStore.updateApprovalStatus(sqlSession,approval);
		return result;
	}

	@Override
	public int removeApproval(int docNo) {
		int result = aStore.deleteApproval(sqlSession,docNo);
		return result;
	}

	@Override
	public int removeApprAccept(int docNo) {
		int result = aStore.deleteApprAccept(sqlSession,docNo);
		return result;
	}

	@Override
	public List<Approval> printAllWrittenAppr(ApprAccept apprAccept) {
		List<Approval> aList = aStore.selectAllWrittenAppr(sqlSession,apprAccept);
		return aList;
	}

	@Override
	public List<Approval> printAllTemporaryStorageAppr(ApprAccept apprAccept) {
		List<Approval> aList= aStore.selectAllTemporaryStorageAppr(sqlSession,apprAccept);
		return aList;
	}

	@Override
	public List<Approval> printAllRejectedAppr(ApprAccept apprAccept) {
		List<Approval> aList= aStore.selectAllRejectedAppr(sqlSession,apprAccept);
		return aList;
	}

	@Override
	public List<Approval> printAllCompletedAppr(ApprAccept apprAccept) {
		List<Approval> aList= aStore.selectAllCompletedAppr(sqlSession,apprAccept);
		return aList;
	}
	@Override
	public Approval printOneAppr(int apprNo) {
		Approval approval = aStore.selectOneAppr(sqlSession,apprNo);
		return approval;
	}

	//양식등록
	@Override
	public int registerApprForm(ApprForm apprForm) {
		int result = aStore.insertApprForm(sqlSession,apprForm);
		return result;
	}

	//최근 등록한 양식번호 조회
	@Override
	public int printRecentApprNo() {
		int apprNo = aStore.selectRecentApprNo(sqlSession);
		return apprNo;
	}

	//결재 첨부파일 등록
	@Override
	public int registerApprFile(ApprAttachedFile apprFile) {
		int result = aStore.insertApprAttachedFile(sqlSession, apprFile);
		return result;
	}

}
