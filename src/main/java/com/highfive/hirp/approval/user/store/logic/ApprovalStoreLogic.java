package com.highfive.hirp.approval.user.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.user.domain.ApprAccept;
import com.highfive.hirp.approval.user.domain.ApprAttachedFile;
import com.highfive.hirp.approval.user.domain.Approval;
import com.highfive.hirp.approval.user.domain.Reference;
import com.highfive.hirp.approval.user.store.ApprovalStore;
import com.highfive.hirp.common.Search;
@Repository
public class ApprovalStoreLogic implements ApprovalStore{

	@Override
	public List<ApprForm> selectAllApprForm(SqlSession sqlSession) {
		List<ApprForm> aList = sqlSession.selectList("ApprMapper.selectAllApprForm");
		return aList;
	}

	@Override
	public List<ApprForm> selectSearchApprForm(SqlSession sqlSession, Search search) {
		List<ApprForm> aList = sqlSession.selectList("",search);
		return aList;
	}

	@Override
	public ApprForm selectApprForm(SqlSession sqlSession, int formNo) {
		ApprForm apprForm = sqlSession.selectOne("ApprMapper.selectApprForm",formNo);
		return apprForm;
	}

	//결재 등록
	@Override
	public int insertAppr(SqlSession sqlSession, Approval approval) {
		int result = sqlSession.insert("ApprMapper.insertAppr",approval);
		return result;
	}
	
	@Override
	public int insertApprover(SqlSession sqlSession, ApprAccept apprAccept) {
		int result = sqlSession.insert("ApprMapper.insertApprover",apprAccept);
		return result;
	}

	@Override
	public int insertReference(SqlSession sqlSession, Reference reference) {
		int result = sqlSession.insert("",reference);
		return result;
	}

	
	//임시저장
	@Override
	public int insertTempAppr(SqlSession sqlSession, Approval approval) {
		int result = sqlSession.insert("ApprMapper.insertTempAppr",approval);
		return result;
	}

	@Override
	public int updateTempAppr(SqlSession sqlSession, Approval approval) {
		int result = sqlSession.update("ApprMapper.updateTempAppr",approval);
		return result;
	}

	@Override
	public int deleteTempAppr(SqlSession sqlSession, int apprNo) {
		int result = sqlSession.delete("ApprMapper.deleteStorageApprAccept",apprNo);
		int result2 = sqlSession.delete("ApprMapper.deleteStorageApprFile",apprNo);
		return result;
	}

	@Override
	public List<Approval> selectAllWaitingAppr(SqlSession sqlSession, String emplId) {
		List<Approval> aList = sqlSession.selectList("ApprMapper.selectAllWaitingAppr",emplId);
		return aList;
	}

	@Override
	public List<Approval> selectAllMyAppr(SqlSession sqlSession, String emplId) {
		List<Approval> aList = sqlSession.selectList("ApprMapper.selectAllMyAppr",emplId);
		return aList;
	}
	
//	@Override
//	public Approval selectOneWaitingAppr(SqlSession sqlSession, int docNo) {
//		Approval approval = sqlSession.selectOne("",docNo);
//		return approval;
//	}

	//결재자 정보 조회
	@Override
	public List<ApprAccept> selectApprovalStatus(SqlSession sqlSession, int apprNo) {
		List<ApprAccept> aList = sqlSession.selectList("ApprMapper.selectAllApprAccept",apprNo);
		return aList;
	}

	//결재 진행
	@Override
	public int modifyApprAccept(SqlSession sqlSession, ApprAccept apprAccept) {
		int result = sqlSession.update("ApprMapper.modifyApprAccept",apprAccept);
		if(apprAccept.getaStatus().equals("반려")) {
		int result2 = sqlSession.update("ApprMapper.modifyRejectAppr");
		}
		return result;
	}

	//결재 테이블 상태 변경
	@Override
	public int updateApprovalStatus(SqlSession sqlSession, Approval approval) {
		int result = sqlSession.update("ApprMapper.modifyApprStatus",approval);
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

	//임시저장 리스트 조회
	@Override
	public List<Approval> selectAllTempAppr(SqlSession sqlSession, String emplId) {
		List<Approval> aList=sqlSession.selectList("ApprMapper.selectAllTempAppr",emplId);
		return aList;
	}

	//반려문서함 조회
	@Override
	public List<Approval> selectAllRejectedAppr(SqlSession sqlSession, String emplId) {
		List<Approval> aList= sqlSession.selectList("ApprMapper.selectAllRejectedAppr",emplId);
		return aList;
	}

	//완료문서함 조회
	@Override
	public List<Approval> selectAllCompletedAppr(SqlSession sqlSession, String emplId) {
		List<Approval> aList= sqlSession.selectList("ApprMapper.selectAllCompletedAppr",emplId);
		return aList;
	}

	@Override
	public Approval selectOneAppr(SqlSession sqlSession,int apprNo) {
		Approval approval = sqlSession.selectOne("ApprMapper.selectOneAppr",apprNo);
		return approval;
	}

	//양식등록
	@Override
	public int insertApprForm(SqlSession sqlSession, ApprForm apprForm) {
		int result = sqlSession.insert("ApprMapper.insertApprForm",apprForm);
		return result;
	}

	//가장 최근 등록한 결재번호 확인
	@Override
	public int selectRecentApprNo(SqlSession sqlSession) {
		int apprNo = sqlSession.selectOne("ApprMapper.selectRecentApprNo");
		return apprNo;
	}

	//결재 첨부파일 등록
	@Override
	public int insertApprAttachedFile(SqlSession sqlSession, ApprAttachedFile apprFile) {
		int result = sqlSession.insert("ApprMapper.insertApprAttachedFile",apprFile);
		return result;
	}




	//반려된 문서 이후의 결재라인 수정
//	@Override
//	public int updateRejectedAppr(SqlSession sqlSession) {
//		return result;
//	}

}
