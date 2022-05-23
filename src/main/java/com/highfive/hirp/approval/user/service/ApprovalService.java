package com.highfive.hirp.approval.user.service;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.user.domain.ApprAccept;
import com.highfive.hirp.approval.user.domain.ApprAttachedFile;
import com.highfive.hirp.approval.user.domain.Approval;
import com.highfive.hirp.approval.user.domain.Reference;
import com.highfive.hirp.common.Search;
import com.highfive.hirp.group.domain.Group;

public interface ApprovalService {

		//폼 선택 화면
		public List<ApprForm> printAllApprForm();
		//폼 검색 조회
		public List<ApprForm>  printSearchApprForm(Search search);
		//폼 가져오기(select appr_form)
		public ApprForm printApprForm(int formNo);
		
		//결재자 선택 화면(조직도)(select employee)
		//public List<Group> printAllGroup();
		//결재자 검색 조회(select search)
		//public List<Group> searchAllGroup(Search search);
		
		
		//참조자/열람자 선택(insert reference)
		public int regitserReference(Reference reference);
		
		
		
		//문서 상신(insert approval)
		//TEMPORARY_STORAGE DEFAULT값인 'N'로 들어감
		public int registerAppr(Approval approval);
		//결재자 등록(insert appr_accept)
		public int registerApprover(ApprAccept apprAccept);
		//결재 첨부파일 등록
		public int registerApprFile(ApprAttachedFile apprFile);
		
		
		
		
		
		
		
		
		//임시저장(insert approval)
		//TEMPORARY_STORAGE 'Y';
		public int registerStoragedAppr(Approval approval);
		
		//임시저장된 문서 수정
		public int modifyStoragedAppr(int docNo);
		//임시저장된 문서 삭제
		public int removeStoragedAppr(int docNo);
		
		//결재대기 문서함(select List session에서 id, 진행사항  : 대기)
		public List<Approval> printAllWaitingAppr(String emplId); 
		//결재대기 문서 조회(approval select)
		public Approval printOneWaitngAppr(int docNo);
		//결재선 진행 상태 조회(appr_accept select 결재상태 <조건> 문서번호 )
		public List<ApprAccept> printApprovalStatus(int docNo);
		//결재자 결재진행(결재승인, 반려)
		//(appr_accept update 결재상태 "승인,반려" <조건>문서번호,session id값 )
		public int modifyApprStatus(ApprAccept apprAccept); 
		//(update approval 진행상태"승인, 진행,반려")
		public int modifyApprovalStatus(Approval approval);
		
		//결재상신 취소
		//delete approval
		public int removeApproval(int docNo);
		//delete appr_accept
		public int removeApprAccept(int docNo);
		//상신문서함(select List)
		public List<Approval> printAllWrittenAppr(ApprAccept apprAccept);
		//임시저장함(select List)
		public List<Approval> printAllTemporaryStorageAppr(ApprAccept apprAccept);
		
		//반려문서함(select List)
		public List<Approval> printAllRejectedAppr(ApprAccept apprAccept);
		
		//완료문서함(select List)
		public List<Approval> printAllCompletedAppr(ApprAccept apprAccept);
		//문서조회(select)
		public Approval printOneAppr(int apprNo);
		
		
		//양식등록
		public int registerApprForm(ApprForm apprForm);
		
		//최근 등록한 결재번호 조회
		public int printRecentApprNo();
		
	
}
