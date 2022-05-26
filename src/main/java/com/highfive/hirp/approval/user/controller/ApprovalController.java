package com.highfive.hirp.approval.user.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.user.domain.ApprAccept;
import com.highfive.hirp.approval.user.domain.ApprAttachedFile;
import com.highfive.hirp.approval.user.domain.Approval;
import com.highfive.hirp.approval.user.domain.Reference;
import com.highfive.hirp.approval.user.service.ApprovalService;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.SaveMultipartFile;
import com.highfive.hirp.common.Search;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.employee.service.EmployeeService;
import com.highfive.hirp.group.domain.Group;

@Controller
public class ApprovalController {

	@Autowired
	private ApprovalService aService;
	
	@Autowired
	private EmployeeService eService;
	
	@Autowired
	private EmployeeAdminService eaService;
	
	
	//전자결재 메인
	@RequestMapping(value="/approval/main.hirp", method=RequestMethod.GET)
	public ModelAndView approvalMain(ModelAndView mv) {
		try{
		List<ApprForm> formList = aService.printAllApprForm();
		if (!formList.isEmpty()) {
			mv.addObject("formList", formList);
			mv.setViewName("approval/approvalCommonPage");
		} else {
			mv.addObject("msg", "검색조회 실패");
			mv.setViewName("common/errorPage");
		}
	} catch (Exception e) {
		mv.addObject("msg", e.toString());
		mv.setViewName("common/errorPage");
	}
	return mv;
}
	//전자결재 양식 작성폼
	@RequestMapping(value="approval/writeForm.hirp")
	public String writeApprovalForm() {
		return "/approval/writeApprovalFormpage";
	}
	
	//전자결재 양식 등록
	@RequestMapping(value="/register/apprForm.hirp",method=RequestMethod.POST)
	public ModelAndView registerApprovalForm(ModelAndView mv,@ModelAttribute ApprForm apprForm) {
		try {
			int result = aService.registerApprForm(apprForm);
			if (result > 0) {
				mv.setViewName("redirect:/approval/main.hirp");
			} else {
				mv.addObject("msg", "양식등록 성공");
				mv.setViewName("common/errorPage");
			}
		} catch (Exception e) {
			mv.setViewName("common/errorPage");
			mv.addObject("msg", e.toString());
		}
		return mv;
	}
	
	
	//폼 검색 조회
	public ModelAndView printSearchApprForm(ModelAndView mv,@ModelAttribute Search search) {
		return mv;
	}
		
	@RequestMapping(value="/approvalForm/detail.hirp", method = { RequestMethod.GET, RequestMethod.POST })
	//폼 가져오기(select appr_form)
	public ModelAndView printApprForm(ModelAndView mv,@RequestParam("formNo")int formNo, HttpServletRequest request) { 
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId"); 
			Employee employee = eService.employeeMyPage(emplId); 
			ApprForm apprform = aService.printApprForm(formNo);
			List<Employee> emplList = eaService.printAllEmployeeWithName();
			
			if (apprform != null) {
				mv.addObject("apprform", apprform);
				mv.addObject("employee", employee);
				mv.addObject("emplList", emplList);
				mv.setViewName("approval/writeApproval");
			} else {
				mv.addObject("msg", "양식 조회 실패");
				mv.setViewName("common/errorPage");
			}
		}catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
		
		
		
	
	//결재자 선택 화면(조직도)(select employee)
	//public ModelAndView groupView(ModelAndView mv,@ModelAttribute Search search) {
	//	return mv;
	//}
	
	//결재자 검색 조회(select search)
	//public ModelAndView groupSearchView(ModelAndView mv, @ModelAttribute Search search) { 
	//	return mv;
	//} 
	
	//결재자 선택(insert appr_accept)
	//참조자/열람자 선택(insert reference)
	public ModelAndView registerApprover(ModelAndView mv,@ModelAttribute ApprAccept apprAccept,@ModelAttribute Reference reference) {
		//insert appr_accept
		//insert reference
		return mv;
	}
	
	
	//문서 상신(insert approval)
		//TEMPORARY_STORAGE DEFAULT값인 'N'로 들어감
		//임시저장(insert approval)
		//TEMPORARY_STORAGE 'Y';
	@RequestMapping(value="/register/appr.hirp",method=RequestMethod.POST)
	public ModelAndView registerApproval(ModelAndView mv,@ModelAttribute Approval approval,
			@RequestParam(value = "uploadFiles", required = false) List<MultipartFile> multipartfile,
			HttpServletRequest request) {
		try{
			
			int result = aService.registerAppr(approval);
			List<ApprAccept> aList = approval.getaList(); 
			int apprNo = aService.printRecentApprNo();
			for(int i=0; i<aList.size();i++) {
				ApprAccept apprAccept = new ApprAccept();
				apprAccept.setApprNo(apprNo);
				apprAccept.setEmplId(aList.get(i).getEmplId());
				apprAccept.setApprType(aList.get(i).getApprType());
				int apprResult = aService.registerApprover(apprAccept);
			}
			if (multipartfile.size() > 0 && !multipartfile.get(0).getOriginalFilename().equals("")) {

				List<Map<String, String>> fileList = SaveMultipartFile.saveFile(multipartfile, request);
				for (int i = 0; i < multipartfile.size(); i++) {
					String fileName = fileList.get(i).get("fileName");
					String fileRename = fileList.get(i).get("fileRename");
					String filePath = fileList.get(i).get("filePath");
					// 첨부파일 테이블 등록
					ApprAttachedFile apprFile = new ApprAttachedFile();
					apprFile.setApprNo(apprNo);
					apprFile.setFileName(fileName);
					apprFile.setFileRename(fileRename);
					apprFile.setFilePath(filePath);

					int fileResult = aService.registerApprFile(apprFile);
				}
			}
			if (result > 0) {
				mv.setViewName("redirect:/approval/main.hirp");
			} else {
				mv.addObject("msg", "문서 상신 실패");
				mv.setViewName("common/errorPage");
			} 
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	
	//임시저장된 문서 수정
	public ModelAndView modifyTemporaryStoragedAppr(ModelAndView mv,@RequestParam("docNo")int docNo) {
		return mv;
	}
	
	//임시저장된 문서 삭제
	public ModelAndView removeTemporaryStoragedAppr(ModelAndView mv,@RequestParam("docNo")int docNo) {
		return mv;
	}
	
	
	//결재대기 문서함(select List session에서 id, 진행사항  : 대기)
	@RequestMapping(value="/wating/appr.hirp")
	public ModelAndView printAllWaitingAppr(ModelAndView mv,HttpServletRequest request) {
	try {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		List<Approval> aList = aService.printAllWaitingAppr(emplId);
		if (!aList.isEmpty()) {
			mv.addObject("aList", aList);
			mv.setViewName("approval/waitingList");
		} else {
			mv.addObject("msg", "문서 조회 실패");
			mv.setViewName("common/errorPage");
		} 
	} catch (Exception e) {
		mv.addObject("msg", e.toString());
		mv.setViewName("common/errorPage");
	}
		return mv;
	}
	
	//결재대기 문서 조회(approval select)
	//결재선 진행 상태 조회(appr_accept select 결재상태 <조건> 문서번호 )
	@RequestMapping(value="/appr/detail.hirp",method=RequestMethod.GET)
	public ModelAndView printOneWaitingAppr(ModelAndView mv,@RequestParam("apprNo")int apprNo) {
		Approval approval = aService.printOneAppr(apprNo);
		List<ApprAccept> aList = aService.printApprovalStatus(apprNo);
		String emplId = approval.getEmplId();
		Employee employee = eService.employeeMyPage(emplId);
		if(!aList.isEmpty()) {
			mv.addObject("approval", approval);
			mv.addObject("aList", aList);
			mv.addObject("employee", employee);
			mv.setViewName("approval/approvalDetail");
		} else {
			mv.addObject("msg", "문서 조회 실패");
			mv.setViewName("common/errorPage");
		}
		
		
		
		return mv;
	}
	
	//결재자 결재진행(결재승인, 반려)
	//(appr_accept update 결재상태 "승인,반려" <조건>문서번호,session id값 )
	//(update approval 진행상태"승인, 진행,반려")
	public ModelAndView modifyApprStatus(ModelAndView mv,@ModelAttribute ApprAccept apprAccept) {
		return mv;
	}
	
	
	//결재 상신 취소
	//delete appr_accept
	//delete approval
	public ModelAndView deleteApproval(ModelAndView mv,@RequestParam("docNo")int docNo){
		return mv;
	}

	//상신문서함(select List)
	public ModelAndView printAllWrittenAppr(ModelAndView mv,@ModelAttribute ApprAccept apprAccept) {
		return mv;
	}
	
	//임시저장함(select List)
	public ModelAndView printAllTemporaryStorageAppr(ModelAndView mv,@ModelAttribute ApprAccept apprAccept) {
		return mv;
	}
	
	
	//반려문서함(select List)
	public ModelAndView printAllRejectedAppr(ModelAndView mv,@ModelAttribute ApprAccept apprAccept) {
		return mv;
	}

	
	//완료문서함(select List)
	public ModelAndView printAllCompletedAppr(ModelAndView mv,@ModelAttribute ApprAccept apprAccept) {
		return mv;
	}

	//문서조회(select)
	public ModelAndView printOneAppr(ModelAndView mv,@ModelAttribute Approval approval) {
		return mv;
	}
	
	
	
	
	
	
	
	
	
	
	
}
