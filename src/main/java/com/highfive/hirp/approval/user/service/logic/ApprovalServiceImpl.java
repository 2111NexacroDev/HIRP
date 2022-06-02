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

	//결재자 등록
	@Override
	public int registerApprover(ApprAccept apprAccept) {
		int result = aStore.insertApprover(sqlSession,apprAccept);
		return result;
	}

	//참조자등록
	@Override
	public int regitserReference(Reference reference) {
		int result = aStore.insertReference(sqlSession,reference);
		return result;
	}

	//결재등록
	@Override
	public int registerAppr(Approval approval) {
		int result = aStore.insertAppr(sqlSession,approval);
		return result;
	}

	@Override
	public int registerTempAppr(Approval approval) {
		int result = aStore.insertTempAppr(sqlSession,approval);
		return result;
	}

	@Override
	public int modifyTempAppr(Approval approval) {
		int result = aStore.updateTempAppr(sqlSession,approval);
		return result;
	}

	@Override
	public int removeTempAppr(int apprNo) {
		int result = aStore.deleteTempAppr(sqlSession,apprNo);
		return result;
	}
	//결재대기함
	@Override
	public List<Approval> printAllWaitingAppr(String emplId) {
		List<Approval> aList = aStore.selectAllWaitingAppr(sqlSession,emplId);
		return aList;
	}

	//상신문서함
	@Override
	public List<Approval> printAllMyAppr(String emplId) {
		List<Approval> aList = aStore.selectAllMyAppr(sqlSession,emplId);
		return aList;
	}
	
//	
//	@Override
//	public Approval printOneWaitngAppr(int docNo) {
//		Approval approval = aStore.selectOneWaitingAppr(sqlSession,docNo);
//		return approval;
//	}

	@Override
	public List<ApprAccept> printApprovalStatus(int apprNo) {
		List<ApprAccept> aList = aStore.selectApprovalStatus(sqlSession,apprNo);
		return aList;
	}

	//결재자 상태 변경
	@Override
	public int modifyApprAccept(ApprAccept apprAccept) {
		int result = aStore.modifyApprAccept(sqlSession,apprAccept);
		return result;
	}

	//결재 상태 변경
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

	//임시저장함
	@Override
	public List<Approval> printAllTempAppr(String emplId) {
		List<Approval> aList= aStore.selectAllTempAppr(sqlSession,emplId);
		return aList;
	}

	//완료
	@Override
	public List<Approval> printAllRejectedAppr(String emplId) {
		List<Approval> aList= aStore.selectAllRejectedAppr(sqlSession,emplId);
		return aList;
	}

	
	//완료
	@Override
	public List<Approval> printAllCompletedAppr(String emplId) {
		List<Approval> aList= aStore.selectAllCompletedAppr(sqlSession,emplId);
		return aList;
	}
	//문서 상세보기
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

	@Override
	public List<Reference> printAllRefApprList(Reference reference) {
		List<Reference> rList = aStore.selectAllRefApprList(reference);
		return null;
	}

	@Override
	public List<Reference> printAllViewApprList(Reference reference) {
		List<Reference> rList = aStore.selectAllViewApprList(reference);
		return null;
	}



}
