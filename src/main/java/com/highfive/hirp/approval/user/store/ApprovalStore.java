package com.highfive.hirp.approval.user.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.user.domain.ApprAccept;
import com.highfive.hirp.approval.user.domain.ApprAttachedFile;
import com.highfive.hirp.approval.user.domain.Approval;
import com.highfive.hirp.approval.user.domain.Reference;
import com.highfive.hirp.common.Search;

public interface ApprovalStore {

	//폼 전체 조회
	List<ApprForm> selectAllApprForm(SqlSession sqlSession);

	List<ApprForm> selectSearchApprForm(SqlSession sqlSession, Search search);

	ApprForm selectApprForm(SqlSession sqlSession, int formNo);

	int insertApprover(SqlSession sqlSession, ApprAccept apprAccept);

	int insertReference(SqlSession sqlSession, Reference reference);

	int insertAppr(SqlSession sqlSession, Approval approval);

	int insertStoragedAppr(SqlSession sqlSession, Approval approval);

	int updateStoragedAppr(SqlSession sqlSession, int docNo);

	int deleteStoragedAppr(SqlSession sqlSession, int docNo);

	List<Approval> selectAllWaitingAppr(SqlSession sqlSession, String emplId);

	Approval selectOneWaitingAppr(SqlSession sqlSession, int docNo);

	//결재자정보 조회
	List<ApprAccept> selectApprovalStatus(SqlSession sqlSession, int apprNo);

	int updateApprStatus(SqlSession sqlSession, ApprAccept apprAccept);

	int updateApprovalStatus(SqlSession sqlSession, Approval approval);

	int deleteApproval(SqlSession sqlSession, int docNo);

	int deleteApprAccept(SqlSession sqlSession, int docNo);

	List<Approval> selectAllWrittenAppr(SqlSession sqlSession, ApprAccept apprAccept);

	List<Approval> selectAllTemporaryStorageAppr(SqlSession sqlSession, ApprAccept apprAccept);

	List<Approval> selectAllRejectedAppr(SqlSession sqlSession, ApprAccept apprAccept);

	List<Approval> selectAllCompletedAppr(SqlSession sqlSession, ApprAccept apprAccept);

	//결재문서 보기
	Approval selectOneAppr(SqlSession sqlSession,int apprNo);

	//양식등록
	int insertApprForm(SqlSession sqlSession, ApprForm apprForm);

	//최근등록한 결재번호 확인
	int selectRecentApprNo(SqlSession sqlSession);

	//결재 첨부파일 등록
	int insertApprAttachedFile(SqlSession sqlSession, ApprAttachedFile apprFile);

}
