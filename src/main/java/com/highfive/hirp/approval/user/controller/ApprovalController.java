package com.highfive.hirp.approval.user.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.highfive.hirp.alarm.domain.Alarm;
import com.highfive.hirp.alarm.service.AlarmService;
import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.user.domain.ApprAccept;
import com.highfive.hirp.approval.user.domain.ApprAttachedFile;
import com.highfive.hirp.approval.user.domain.Approval;
import com.highfive.hirp.approval.user.domain.Reference;
import com.highfive.hirp.approval.user.service.ApprovalService;
import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.board.common.SaveMultipartFile;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.common.Pagination;
import com.highfive.hirp.common.Search;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.employee.service.EmployeeService;
import com.highfive.hirp.group.domain.Group;
import com.highfive.hirp.time.user.domain.Vacation;

@Controller
public class ApprovalController {

	@Autowired
	private ApprovalService aService;

	@Autowired
	private EmployeeService eService;


	
	@Autowired
	private AlarmService alarmService;

	
	// 전자결재 양식 작성폼
	@RequestMapping(value = "/approval/writeForm.hirp")
	public String writeApprovalForm() {
		return "/approval/writeApprovalFormpage";
	}
	
	// 전자결재 양식 등록
	@RequestMapping(value = "/register/apprForm.hirp", method = RequestMethod.POST)
	public ModelAndView registerApprovalForm(ModelAndView mv, @ModelAttribute ApprForm apprForm) {
		try {
			int result = aService.registerApprForm(apprForm);
			if (result > 0) {
				mv.addObject("msg", "양식이 등록되었습니다.");
				mv.addObject("url","/approval/formView.hirp");
				mv.setViewName("common/errorPage2");
			} else {
				mv.addObject("msg", "양식등록 실패");
				mv.setViewName("common/errorPage");
			}
		} catch (Exception e) {
			mv.setViewName("common/errorPage");
			mv.addObject("msg", e.toString());
		}
		return mv;
	}
	
	//결재양식 수정
	@RequestMapping(value = "/modify/apprForm.hirp", method = RequestMethod.POST)
	public ModelAndView modifyApprovalForm(ModelAndView mv, @ModelAttribute ApprForm apprForm) {
		try {
			int result = aService.modifyApprForm(apprForm);
			int formNo = apprForm.getFormNo();
			if (result > 0) {
				 mv.addObject("msg", "양식이 수정되었습니다.");
				 mv.addObject("url","/approvalForm/detailView.hirp?formNo=");
				 mv.addObject("formNo",formNo); mv.setViewName("common/errorPage2");
			} else {
				mv.addObject("msg", "양식등록 실패");
				mv.setViewName("common/errorPage");
			}
		} catch (Exception e) {
			mv.setViewName("common/errorPage");
			mv.addObject("msg", e.toString());
		}
		return mv;
	}
	
	//결재양식 삭제
	@RequestMapping(value = "/remove/apprForm.hirp", method = RequestMethod.GET)
	public ModelAndView deleteApprForm(ModelAndView mv, @RequestParam("formNo") int formNo) {
		try {
		int result = aService.removeApprForm(formNo);
		if (result > 0) {
			mv.addObject("msg", "양식이 삭제되었습니다.");
			mv.addObject("url","/approval/formView.hirp");
			mv.setViewName("common/errorPage2");
		} else {
			mv.addObject("msg", "양식등록 실패");
			mv.setViewName("common/errorPage");
		}
	} catch (Exception e) {
		mv.addObject("msg", e.toString());
		mv.setViewName("common/errorPage");
	}
	return mv;
	}

	
	//결재 양식 선택하는 모달창 -> 기안하기 버튼 눌렀을 때 (ajax)
	@ResponseBody
	@RequestMapping(value = "/apprForm/list.hirp", method = RequestMethod.GET)
	public void boardReplyView( HttpServletResponse response)
			throws JsonIOException, IOException {
		
		List<ApprForm> apprformList = aService.printAllApprForm();
		if (!apprformList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			gson.toJson(apprformList, response.getWriter());
		}
	}
	
	//양식관리->양식 조회
	@RequestMapping(value ="/approval/formView.hirp", method = RequestMethod.GET)
	public ModelAndView apprFormView(ModelAndView mv,HttpServletRequest request) {
		try {
			List<ApprForm> formList = aService.printAdminApprForm();
			if (!formList.isEmpty()) {
				mv.addObject("formList", formList);
			}
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			List<ApprForm> myApprForm = aService.printNotAdminApprForm(emplId);
			if (!myApprForm.isEmpty()) {
				mv.addObject("myApprForm", myApprForm);
			}
			mv.setViewName("approval/apprformList");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
				
	}
	
	//내가 생성한 양식 조회
	@RequestMapping(value = "/approvalForm/detailView.hirp", method =RequestMethod.GET)
	public ModelAndView approvalFormDetailView(ModelAndView mv, @RequestParam("formNo") int formNo) {
		try {
		ApprForm apprform = aService.printApprForm(formNo);
		if (apprform != null) {
			mv.addObject("apprform", apprform);
			mv.addObject("msg", "결재양식조회");
		}
		mv.setViewName("approval/writeApprovalFormpage");
	} catch (Exception e) {
		mv.addObject("msg", e.toString());
		mv.setViewName("common/errorPage");
	}
	return mv;
	
	}
	
	// 관리자가 생성한 양식 조회
	@RequestMapping(value = "/approvalAdminForm/detail.hirp", method =RequestMethod.GET)
	public ModelAndView approvalAdminFormdetailView(ModelAndView mv, @RequestParam("formNo") int formNo) {
		try {
		ApprForm apprform = aService.printApprForm(formNo);
		if (apprform != null) {
			mv.addObject("apprform", apprform);
			mv.addObject("msg", "결재양식조회");
		}
		mv.setViewName("approval/apprFormView");
	} catch (Exception e) {
		mv.addObject("msg", e.toString());
		mv.setViewName("common/errorPage");
	}
	return mv;
	
	}
	
	// 전자결재 메인(결재대기,진행중,결재완료)
	@RequestMapping(value = "/approval/main.hirp", method = RequestMethod.GET)
	public ModelAndView approvalMain(ModelAndView mv,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			List<Approval> aList = aService.printAllWaitingAppr(emplId);
			if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
			}
			List<Approval> ingList = aService.printProceedAppr(emplId);
			if (!ingList.isEmpty()) {
				mv.addObject("ingList", ingList);
			}
			List<Approval> cList = aService.printAllCompletedAppr(emplId);
			if (!cList.isEmpty()) {
				mv.addObject("cList", cList);
			}
			mv.setViewName("approval/approvalMain");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
				
	}

	// 폼 검색 조회
	//	 public ModelAndView printSearchApprForm(ModelAndView mv,@ModelAttribute
	//	 Search search) { return mv; }
	 
	
	// 휴가신청서 작성 화면
		@RequestMapping(value = "/annualLeaveForm/detail.hirp", method =RequestMethod.GET)
		public ModelAndView annualLeaveForm(ModelAndView mv, HttpServletRequest request) {
			try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			Employee employee = eService.employeeMyPage(emplId);
			if(employee != null) {
			mv.addObject("employee", employee);
			}
			mv.addObject("msg", "휴가신청서");
			mv.setViewName("approval/writeApproval");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage2");
		}
			return mv;
		}
	
		// 근태조정신청서 작성 화면
		@RequestMapping(value = "/timeModifylForm/detail.hirp", method =RequestMethod.GET)
		public ModelAndView timeModifylForm(ModelAndView mv, HttpServletRequest request) {
			try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			Employee employee = eService.employeeMyPage(emplId);
			if(employee != null) {
			mv.addObject("employee", employee);
			}
			mv.addObject("msg", "근태조정신청서");
			mv.setViewName("approval/writeApproval");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage2");
		}
			return mv;
		}

				
				
	//기안하기 화면			
	@RequestMapping(value = "/approvalForm/detail.hirp", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView printApprForm(ModelAndView mv, @RequestParam("formNo") int formNo, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			Employee employee = eService.employeeMyPage(emplId);
			ApprForm apprform = aService.printApprForm(formNo);

			if (apprform != null) {
				mv.addObject("apprform", apprform);
				mv.addObject("employee", employee);
				mv.addObject("msg", "결재양식");
			}
			mv.setViewName("approval/writeApproval");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage2");
		}
		return mv;
	}

	

	
	//문서 상신
	@RequestMapping(value = "/register/appr.hirp", method = RequestMethod.POST)
	public ModelAndView registerAppr(ModelAndView mv, @ModelAttribute Approval approval,
			@RequestParam(value = "uploadFiles", required = false) List<MultipartFile> multipartfile,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		
		//오늘 날짜
//		Date date = new Date();
//		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//		String today = formatter.format(date);
//		System.out.println("today: " + today);
				
		try {


			int result = aService.registerAppr(approval);//결재 등록
			
			int apprNo = aService.printRecentApprNo();//결재번호 가져오기
			List<ApprAccept> aList = approval.getaList();//결재라인 등록

			for (int i = 0; i < aList.size(); i++) {
				ApprAccept apprAccept = new ApprAccept();
				apprAccept.setApprNo(apprNo);
				apprAccept.setEmplId(aList.get(i).getEmplId());
				apprAccept.setApprType(aList.get(i).getApprType());
				int apprResult = aService.registerApprover(apprAccept);
				if(apprResult > 0) {
					System.out.println("열람자 : " + apprAccept.getEmplId());
					System.out.println("제목 : " + approval.getApprTitle());
					String acceptId = apprAccept.getEmplId();
					
					//열람자 알림 추가
					Alarm alarm = new Alarm(acceptId, 
							"[결재 도착] '"+approval.getApprTitle()+"'이(가) 도착했습니다.",
							"30", "N", emplId);
					System.out.println("알림 : " + alarm);
					int result3 = alarmService.insertAlarm(alarm);
					if(result3 > 0) {
						System.out.println("[결재 도착] "+approval.getApprTitle()+"의 알림이 추가되었습니다.");
					}
				}
			}

			//참조자 있을때만 실행
			if(!approval.getrList().isEmpty()){

			List<Reference> rList = approval.getrList();
			for (int i = 0; i < rList.size(); i++) {
				Reference reference = new Reference();
				reference.setApprNo(apprNo);
				reference.setEmplId(rList.get(i).getEmplId());
				reference.setRefType(rList.get(i).getRefType());
				int refResult = aService.registerApprRef(reference);

			}}

				
				if(refResult > 0) {
					System.out.println("열람자 : " + reference.getEmplId());
					System.out.println("제목 : " + approval.getApprTitle());
					String referId = reference.getEmplId();
					
					//열람자 알림 추가
					Alarm alarm = new Alarm(referId, 
							"[결재 도착] '"+approval.getApprTitle()+"'이(가) 도착했습니다.",
							"30", "N", emplId);
					System.out.println("알림 : " + alarm);
					int result3 = alarmService.insertAlarm(alarm);
					if(result3 > 0) {
						System.out.println("[결재 도착] "+approval.getApprTitle()+"의 알림이 추가되었습니다.");
					}
				}
				
			}
			

			
			//첨부파일 있을때만 실행
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
				mv.addObject("msg", "상신되었습니다.");
				mv.addObject("url","/appr/detail.hirp?apprNo=");
				mv.addObject("apprNo",apprNo); 
				mv.setViewName("common/errorPage2");
				
			} else {
				mv.addObject("msg", "상신 실패");
				mv.setViewName("common/errorPage");
			}
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	
		//임시저장
		@RequestMapping(value = "/temporaryStorage/appr.hirp", method = RequestMethod.POST)
		public ModelAndView  temporaryStorageAppr(ModelAndView mv, @ModelAttribute Approval approval,
				@RequestParam(value = "uploadFiles", required = false) List<MultipartFile> multipartfile,
				HttpServletRequest request) {
			try {

				int result = aService.registerTempAppr(approval);//결재 등록
				
				int apprNo = aService.printRecentApprNo();//결재번호 가져오기
				//결재라인 있을때만 실행
				if(!approval.getaList().isEmpty()){
				List<ApprAccept> aList = approval.getaList();
				for (int i = 0; i < aList.size(); i++) {
					ApprAccept apprAccept = new ApprAccept();
					apprAccept.setApprNo(apprNo);
					apprAccept.setEmplId(aList.get(i).getEmplId());
					apprAccept.setApprType(aList.get(i).getApprType());
					int apprResult = aService.registerApprover(apprAccept);
				}}
				//참조자 있을때만 실행
				if(!approval.getrList().isEmpty()){
				List<Reference> rList = approval.getrList();
				for (int i = 0; i < rList.size(); i++) {
					Reference reference = new Reference();
					reference.setApprNo(apprNo);
					reference.setEmplId(rList.get(i).getEmplId());
					reference.setRefType(rList.get(i).getRefType());
					int refResult = aService.registerApprRef(reference);
				}}
				
				//첨부파일 있을때만 실행
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
					mv.setViewName("redirect:/temporaryStorage/appr.hirp");
				} else {
					mv.addObject("msg", "임시저장 실패");
					mv.setViewName("common/errorPage");
				}
			} catch (Exception e) {
				mv.addObject("msg", e.toString());
				mv.setViewName("common/errorPage");
			}
			return mv;
		}
	
		// 임시저장된 문서 상신하기
		@RequestMapping(value = "/register/TempAppr.hirp", method = RequestMethod.POST)
		public ModelAndView modifyTemporaryStoragedAppr(ModelAndView mv, @RequestParam("apprNo") int apprNo){
			int result = aService.modifyTempAppr(apprNo);//결재 등록
			if (result > 0) {
				mv.addObject("msg", "상신되었습니다.");
				mv.addObject("url","/written/appr.hirp");
				mv.setViewName("common/errorPage2");
			} else {
				mv.addObject("msg", "상신 실패");
				mv.setViewName("common/errorPage");
			}
			return mv;
		}
		
		// 임시저장된 문서 삭제
		@RequestMapping(value = "/remove/TempAppr.hirp", method = RequestMethod.GET)
		public ModelAndView removeTemporaryStoragedAppr(ModelAndView mv, @RequestParam("apprNo") int apprNo) {
			int result = aService.removeApproval(apprNo);
			if (result > 0) {
				mv.addObject("msg", "삭제되었습니다.");
				mv.addObject("url","/temporaryStorage/appr.hirp");
				mv.setViewName("common/errorPage2");
			} else {
				mv.addObject("msg", "삭제 실패");
				mv.setViewName("common/errorPage");
			}
			return mv;
		}
		
	
	// 임시저장함(select List)
	@RequestMapping(value = "/temporaryStorage/appr.hirp", method = RequestMethod.GET)
	public ModelAndView printAllTemporaryStorageAppr(ModelAndView mv, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			List<Approval> aList = aService.printAllTempAppr(emplId);
			if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
			}
			mv.addObject("apprListTitle", "임시저장함");
			mv.setViewName("approval/apprList");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}



	// 임시저장된 문서 조회
	@RequestMapping(value = "/tempAppr/detail.hirp", method = RequestMethod.GET)
	public ModelAndView printOneTemporaryStorageAppr(ModelAndView mv, @RequestParam("apprNo") int apprNo) {
		try {
			Approval approval = aService.printOneAppr(apprNo);
			List<ApprAccept> aList = aService.printApprovalStatus(apprNo);
			if (approval != null) {
				mv.addObject("approval", approval);
				mv.setViewName("approval/tempStorageApprDetail");
			} else {
				mv.addObject("msg", "문서 조회 실패");
				mv.setViewName("common/errorPage2");
			}
			if(!aList.isEmpty()) {
			mv.addObject("aList", aList);
			}
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage2");
		}
		return mv;
	}

	

	
	

	
	// 결재대기 문서함(select List session에서 id, 진행사항 : 대기)
	@RequestMapping(value = "/waiting/appr.hirp")
	public ModelAndView printAllWaitingAppr(ModelAndView mv, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			List<Approval> aList = aService.printAllWaitingAppr(emplId);
			List<Approval> allList = aService.printAllAppr(emplId);
			if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
				mv.addObject("allList", allList);
			}
			mv.addObject("apprListTitle", "결재대기문서함");
			mv.setViewName("approval/apprList");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	

	
	
	
	// 상신 문서함
	@RequestMapping(value = "/written/appr.hirp", method = RequestMethod.GET)
	public ModelAndView printAllMyAppr(ModelAndView mv, HttpServletRequest request
			) {
		try {
			
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			List<Approval> aList = aService.printAllMyAppr(emplId);
			if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
			}
			mv.addObject("apprListTitle", "상신문서함");
			mv.setViewName("approval/apprList");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 결재대기 문서 조회(approval select)
	// 결재선 진행 상태 조회(appr_accept select 결재상태 <조건> 문서번호 )
	@RequestMapping(value = "/proceed/appr.hirp", method = RequestMethod.GET)
	public ModelAndView printOneWaitingAppr(ModelAndView mv, @RequestParam("apprNo") int apprNo) {
		Approval approval = aService.printOneAppr(apprNo);
		List<ApprAccept> aList = aService.printApprovalStatus(apprNo);
		if (!aList.isEmpty()) {
			mv.addObject("approval", approval);
			mv.addObject("aList", aList);
		}else {
			mv.addObject("msg", "문서조회실패");
			mv.setViewName("common/errorPage");
		}
		String emplId = approval.getEmplId();
		Employee employee = eService.employeeMyPage(emplId);
		if(employee!=null) {
			mv.addObject("employee", employee);
		}
		mv.setViewName("approval/proceedApprView");
		return mv;
	}

	//조회용 디테일
	@RequestMapping(value = "/appr/detail.hirp", method = RequestMethod.GET)
	public ModelAndView printOneAppr(ModelAndView mv, @RequestParam("apprNo") int apprNo) {
		Approval approval = aService.printOneAppr(apprNo);
		List<ApprAccept> aList = aService.printApprovalStatus(apprNo);
		String emplId = approval.getEmplId();
		Employee employee = eService.employeeMyPage(emplId);

		if (!aList.isEmpty()) {
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

	
	// 결재자 결재진행(결재승인, 반려)
	// (appr_accept update 결재상태 "승인,반려" <조건>문서번호,session id값 )
	// (update approval 진행상태"승인, 진행,반려")
	@RequestMapping(value = "/proceed/appr.hirp", method = RequestMethod.POST)
	public ModelAndView proceedAppr(ModelAndView mv, @ModelAttribute ApprAccept apprAccept,
			@RequestParam(value = "apprStatus", required = false) String apprStatus) {
		try {
			int result = aService.modifyApprAccept(apprAccept);
			if (apprStatus != null && apprStatus != "") {
				Approval approval = new Approval();
				approval.setApprNo(apprAccept.getApprNo());
				approval.setApprStatus(apprStatus);
				int apprResult = aService.modifyApprovalStatus(approval);
			}
			if (result > 0) {

				mv.setViewName("redirect:/approval/main.hirp");
			} else {
				mv.addObject("msg", "문서 결재 실패");
				mv.setViewName("common/errorPage2");
			}
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage2");
		}
		return mv;
	}

	// 결재 상신 취소
	// delete appr_accept
	// delete approval
	@RequestMapping(value = "/appr/remove.hirp", method = RequestMethod.GET)
	public ModelAndView deleteApproval(ModelAndView mv, @RequestParam("apprNo") int apprNo) {
		try {
		int result = aService.removeApproval(apprNo);
		if (result > 0) {

			mv.setViewName("redirect:/written/appr.hirp");
		} else {
			mv.addObject("msg", "상신 취소 실패");
			mv.setViewName("common/errorPage");
		}
	} catch (Exception e) {
		mv.addObject("msg", e.toString());
		mv.setViewName("common/errorPage");
	}
	return mv;
	}

	// 반려문서함(select List)
	@RequestMapping(value = "/rejected/appr.hirp", method = RequestMethod.GET)
	public ModelAndView printAllRejectedAppr(ModelAndView mv, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			List<Approval> aList = aService.printAllRejectedAppr(emplId);
			if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
			}
			mv.addObject("apprListTitle", "반려문서함");
			mv.setViewName("approval/apprList");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	// 완료문서함(select List)
	@RequestMapping(value = "/completed/appr.hirp", method = RequestMethod.GET)
	public ModelAndView printAllCompletedAppr(ModelAndView mv, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			List<Approval> aList = aService.printAllCompletedAppr(emplId);
			if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
			}
			mv.addObject("apprListTitle", "완료문서함");
			mv.setViewName("approval/apprList");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}

	
	  @RequestMapping(value="/ref/appr.hirp",method=RequestMethod.GET)
	 public ModelAndView printAllRefApprList(ModelAndView mv, HttpServletRequest request) {
			try {
				HttpSession session = request.getSession();
				String emplId = (String) session.getAttribute("emplId"); 
		  List<Reference> aList = aService.printAllRefApprList(emplId); 
		  if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
			}
		  mv.addObject("apprListTitle", "참조문서함");
		  mv.setViewName("approval/apprList");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	  
	  
	  
	  
	  @RequestMapping(value="/viewer/appr.hirp",method=RequestMethod.GET)
	  public ModelAndView printAllViewApprList(ModelAndView mv, HttpServletRequest request) {
			try {
				HttpSession session = request.getSession();
				String emplId = (String) session.getAttribute("emplId"); 
				List<Reference> aList = aService.printAllViewApprList(emplId); 
		  if (!aList.isEmpty()) {
				mv.addObject("aList", aList);
			}
		  mv.addObject("apprListTitle", "열람문서함");
		  mv.setViewName("approval/apprList");
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	 
	  //연차신청 등록
	  @RequestMapping(value="/register/annualLeaveAppr.hirp",method=RequestMethod.POST)
	  public ModelAndView registetVacation(ModelAndView mv,@ModelAttribute Vacation vacation,@ModelAttribute Approval approval,
			  @RequestParam(value = "uploadFiles", required = false) List<MultipartFile> multipartfile,
				HttpServletRequest request) {
		  try {
			  int result2 = aService.registerVacation(vacation);
			  int result = aService.registerVacationAppr(approval);
				List<ApprAccept> aList = approval.getaList();
				int apprNo = aService.printRecentApprNo();
				for (int i = 0; i < aList.size(); i++) {
					ApprAccept apprAccept = new ApprAccept();
					apprAccept.setApprNo(apprNo);
					apprAccept.setEmplId(aList.get(i).getEmplId());
					apprAccept.setApprType(aList.get(i).getApprType());
					int apprResult = aService.registerApprover(apprAccept);
				}
				
				List<Reference> rList = approval.getrList();
				for (int i = 0; i < aList.size(); i++) {
					Reference reference = new Reference();
					reference.setApprNo(apprNo);
					reference.setEmplId(rList.get(i).getEmplId());
					reference.setRefType(rList.get(i).getRefType());
					int refResult = aService.registerApprRef(reference);
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
	  
	  
}
