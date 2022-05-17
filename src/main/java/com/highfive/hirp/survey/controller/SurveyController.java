package com.highfive.hirp.survey.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
import com.highfive.hirp.common.Search;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.employee.service.EmployeeService;
import com.highfive.hirp.survey.domain.Survey;
import com.highfive.hirp.survey.domain.SurveyAnswer;
import com.highfive.hirp.survey.domain.SurveyQuest;
import com.highfive.hirp.survey.domain.SurveyQuestCh;
import com.highfive.hirp.survey.domain.SurveySearch;
import com.highfive.hirp.survey.domain.SurveySub;
import com.highfive.hirp.survey.domain.SurveyUpdate;
import com.highfive.hirp.survey.service.SurveyService;

@Controller
public class SurveyController {
	@Autowired
	private SurveyService sService;
	@Autowired
	private EmployeeAdminService eaService;
	
	//설문조사 메인페이지 (최신 리스트 조회)
	@RequestMapping(value="/survey/main.hirp", method=RequestMethod.GET)
	public ModelAndView surveyMain(ModelAndView mv
			, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			String emplId = session.getAttribute("emplId").toString();
			
			//내가 대상자이면서 응답하지 않은 것 중 진행중인 설문조사 리스트
			List<Survey> myList = sService.selectSubSurveyById(emplId);
			if(!myList.isEmpty()) {
				mv.addObject("myList", myList);
				System.out.println("myList 출력 : " + myList);
			} else {
				mv.addObject("msg1", "내가 응답할 수 있는 리스트 조회 실패");
			}
			//최근 생성된 설문 리스트
			//설문 리스트에 대한 나의 참여 여부
			//질문지랑 대상자 번호 비교해서 두개 조인해서 설문조사 질문지 + 응답여부까지 나오도록 하기
			List<Survey> latestList = sService.selectAllSurvey(emplId);
			if(!latestList.isEmpty()){
				mv.addObject("sList", latestList);
				System.out.println(latestList);
				mv.setViewName("survey/mainSurveyPage");
			} else {
				mv.addObject("msg2", "최신 리스트 조회 실패");
				mv.setViewName("common/errorPage");
			}
			
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		
		
		return mv;
	}
	
	//진행중인 설문 페이지 (리스트 조회)
	@RequestMapping(value="/survey/proceed.hirp", method=RequestMethod.GET)
	public ModelAndView proceedSurvey(ModelAndView mv
			, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		//진행중인 설문 리스트
		//진행중인 설문 리스트에 대한 나의 참여 여부
		//질문지랑 대상자 번호 비교해서 두개 조인해서 설문조사 질문지 + 응답여부까지 나오도록 하기
		try {
			List<Survey> proceedList = sService.selectProceedSurvey(emplId);
			if(!proceedList.isEmpty()) {
				mv.addObject("sList", proceedList);
				System.out.println("proceedList 출력 : " + proceedList);
				mv.setViewName("survey/proceedSurveyPage");
			} else {
				mv.addObject("msg1", "진행중인 리스트 조회 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		
		//응답자 리스트 보기는 버튼 누르면 아래 컨트롤러 실행되도록 해야겠다
		return mv;
	}
	//응답자 리스트 보기 (ajax)
	@ResponseBody
	@RequestMapping(value="/survey/subList.hirp", method=RequestMethod.POST, produces="application/json;charset=utf-8")
	public String proceedSurveySubList(
			@RequestParam("surveyNo") int surveyNo){
		//응답자 리스트 보기 (응답여부까지) -> 팝업창
		List<SurveySub> subjectList = sService.selectSurveySubByNo(surveyNo);
		if(!subjectList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(subjectList);
		}
		return "";
	}
	
	//마감된 설문 페이지 (리스트 조회)
	@RequestMapping(value="/survey/closed.hirp", method=RequestMethod.GET)
	public ModelAndView closedSurvey(ModelAndView mv
			, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		//마감된 설문 리스트
		//마감된 설문 리스트에 대한 나의 참여 여부
		//질문지랑 대상자 번호 비교해서 두개 조인해서 설문조사 질문지 + 응답여부까지 나오도록 하기
		try {
			List<Survey> closedList = sService.selectClosedSurvey(emplId);
			if(!closedList.isEmpty()) {
				mv.addObject("sList", closedList);
				System.out.println("closedList 출력 : " + closedList);
				mv.setViewName("survey/closedSurveyPage");
			} else {
				mv.addObject("msg1", "마감된 리스트 조회 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		
		return mv;
	}

	//내가 만든 설문 페이지 (리스트 조회)
	@RequestMapping(value="/survey/mySurvey.hirp", method=RequestMethod.GET)
	public ModelAndView wroteSurvey(ModelAndView mv
			, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		//아이디 가져옴 (세션에서)
		//내가 만든 설문 리스트
		//설문조사 번호로 설문 대상자 리스트 가져오기
		try {
			List<Survey> wroteList = sService.selectWroteSurvey(emplId);
			if(!wroteList.isEmpty()) {
				mv.addObject("sList", wroteList);
				System.out.println("wroteList 출력 : " + wroteList);
				mv.setViewName("survey/wroteSurveyPage");
			} else {
				mv.addObject("msg1", "내가 작성한 리스트 조회 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		
		return mv;
	}
	

	//설문 정보 등록 페이지
	@RequestMapping(value="/survey/writeInfo.hirp", method=RequestMethod.GET)
	public ModelAndView writeSurveyInfoPage(ModelAndView mv) {
		try {
			List<Employee> emplList = eaService.printAllEmployeeWithName();
			if(emplList != null) {
				mv.addObject("emplList", emplList);
				mv.setViewName("survey/surveyWriteInfo");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//응답자 검색
	@ResponseBody
	@RequestMapping(value="/survey/searchEmplList.hirp", method=RequestMethod.POST, produces="application/json;charset=utf-8")
	public String searchEmplList(
			@RequestParam("emplSearchKeyword") String emplSearchKeyword){
		System.out.println("응답자 검색" + emplSearchKeyword); //값 잘 넘어옴
		//응답자 리스트 보기 (응답여부까지) -> 팝업창
		List<Employee> emplList = sService.selectSearchEmplList(emplSearchKeyword);
//		System.out.println(emplList);
		if(!emplList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(emplList);
		}
		return "";
	}
	
	//설문 문항 페이지
	@RequestMapping(value="/survey/writeQuest.hirp", method=RequestMethod.GET)
	public ModelAndView writeSurveyQuestPage(ModelAndView mv) {
		mv.setViewName("survey/surveyWriteQuest");
		return mv;
	}
	
	//설문 등록 (설문정보, 응답자 리스트)
	@RequestMapping(value="/survey/addSurveyInfo.hirp", method=RequestMethod.GET)
	public ModelAndView writeSurvey(ModelAndView mv
			,@ModelAttribute Survey survey
			,@RequestParam("surveySubject") String surveySubject
			,@RequestParam(value="subDept", required = false) String subDept
			,@RequestParam(value="surveySubjectIdList", required = false) String surveySubjectIdList
			, HttpServletRequest request) {
		//세션에서 아이디, depcode 가져와서 넣어주기.
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		survey.setSurveyWriter(emplId);
		String deptCode = session.getAttribute("deptCode").toString();
		
		//설문 응답자 유형
		System.out.println(surveySubject);
		System.out.println("subDept:"+subDept); //checked일 때 on, 아닐 때 null
		
		//응답자 리스트
		List<String> subjectList = new ArrayList<String>();
		
		
		try {
			//설문 응답자 타입에 따라서 다르게 담아줌.
			if(surveySubject.equals("본인소속")) {
				List<Employee> myDeptEmpl = new ArrayList<Employee>();
				if(subDept != null) { //하위부서 선택o
					myDeptEmpl = eaService.printAllEmployeeWithDeptCode(deptCode);
				} else { //null일 때 즉 하위부서 선택x
					myDeptEmpl = eaService.printEmployeeWithDeptCode(deptCode);
				}
				for(int i = 0 ; i < myDeptEmpl.size(); i++) {
					subjectList.add(myDeptEmpl.get(i).getEmplId());
				}
				System.out.println("myDeptEmpl:"+myDeptEmpl);
			} else if(surveySubject.equals("직접선택")) {
				//설문 응답자리스트
				if(surveySubjectIdList != null) {
					System.out.println("surveyObjectIdList:"+surveySubjectIdList);
					subjectList = Arrays.asList(surveySubjectIdList.split(","));
					//List<SurveySub> subList = new ArrayList<SurveySub>();
				}
			} else {
				System.out.println("둘다 아님");
			}
			
			//설문 등록
			int result = sService.insertSurvey(survey);
			int result2 = 0;
			
			if(result > 0) {
				//설문 등록된 현재 시퀀스 번호 찾기
				int surveySeqNo = sService.selectSurveySeqNo();
				//설문 응답자 등록
				if(subjectList != null) {
					for(int i = 0; i < subjectList.size(); i++) {
						SurveySub surveySub = new SurveySub();
						surveySub.setSurveyNo(surveySeqNo); //surveyNo 지정
						surveySub.setSubId(subjectList.get(i)); //subId 지정
//					subList.add(surveySub);
//					System.out.println(subList.get(i));
						result2 = sService.insertSurveySub(surveySub);
					}
					
				}
				mv.addObject("surveyNo", surveySeqNo);
				mv.setViewName("survey/surveyWriteQuest");
			} else {
				mv.addObject("msg1", "설문조사 정보 추가 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//설문조사 문항 업데이트 (시작 안내 문구, 설문 문항, 설문 보기)
	@RequestMapping(value="/survey/addQuestList.hirp", method=RequestMethod.POST)
	public ModelAndView writeSurvey2(ModelAndView mv
			,@ModelAttribute Survey survey
			,@ModelAttribute SurveyQuest surveyQuest
			,@ModelAttribute SurveyQuestCh surveyQuestCh
			, HttpServletRequest request) {
		
		try {
			int qCount = surveyQuest.getSurveyQuestList().size();
//			System.out.println("questList출력"+surveyQuest.getSurveyQuestList().get(0).getQuestTitle());
			
//			for(int i = 0; i < qCount; i++) {
//				System.out.println("questList"+i+"출력"+surveyQuest.getSurveyQuestList().get(i));
//				if(surveyQuestCh.getSurveyQuestChList().get(i) != null) {
//					System.out.println("보기:");
//					System.out.println("questList"+i+"출력"+surveyQuestCh.getSurveyQuestChList().get(i));
//				} else {
//					continue;
//				}
//			}
			
			//설문 수정
			int result = sService.updateSurvey(survey);
			int result2 = 0;
			int result3 = 0;
			for(int i = 0; i < qCount; i++) {
				//설문조사 문항 추가
				result2 = sService.insertSurveyQuest(surveyQuest.getSurveyQuestList().get(i));
				System.out.println("questList"+i+"출력"+surveyQuest.getSurveyQuestList().get(i));
				String type1 = surveyQuest.getSurveyQuestList().get(i).getQuestType1();
				if(surveyQuestCh.getSurveyQuestChList() == null || surveyQuestCh.getSurveyQuestChList().size() < i+1) {
					//리스트 사이즈가 i보다 작으면 continue
					continue;
				} else {
					//설문조사 문항에 맞게 보기 추가
					System.out.println("questChList"+i+"출력"+surveyQuestCh.getSurveyQuestChList().get(i));
					result3 = sService.insertSurveyQuestCh(surveyQuestCh.getSurveyQuestChList().get(i));
				}
			}
			
			if(result > 0 && result2 > 0) {
				mv.setViewName("redirect:/survey/main.hirp");//다시 해주어야 함.
				System.out.println("시작 안내 문구 업데이트 및 문항 추가 성공");
			} else {
				mv.addObject("msg1", "시작 안내 문구 및 문항 업데이트 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		
		//설문 문항 추가 1 (비어있지 않을 때) nextval
		//설문 보기 추가 1 (비어있지 않을 때) currval
		return mv;
	}
	
	//대상자 전체 리스트 가져오기(설문 등록할 때 조직도 사용)
	public ModelAndView chooseEmpl(ModelAndView mv) {
		//대상자 리스트 가져오기

		
		return mv;
	}		
		
	//부서코드로 대상자 리스트 가져오기 (선택한 부서 사람들)
	public ModelAndView chooseEmplByDept(ModelAndView mv
			, @RequestParam("deptCode") String deptCode
			, @RequestParam("lowerDept") String lowerDept) {
		//자기 소속 부서일 때는 부서 사람 OR 하위
		//아닐 때는 해당 부서, 해당 부서의 하위까지, 특정 사람만
		//lowerDept 는 하위 부서까지 넣을 건지 말건지 여부 저장
		HashMap<String, String> surveySubInfo = new HashMap<String, String>();
//		searchInfo.put("deptCode", deptCode);
//		searchInfo.put("lowerDept", lowerDept);
//		searchInfo.put("emplId", emplId);

		return mv;
	}
	
	
	//설문 응답 페이지 (설문 상세1)
	@RequestMapping(value="/survey/questDetail.hirp", method=RequestMethod.GET)
	public ModelAndView surveySubmitPage(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo
			, HttpServletRequest request) {
		//내가 응답한 내용이 있는지 조회
		//세션에서 자기 아이디 가져오고, surveyNo 같이 넘겨서 응답 가져오기
		//없으면 응답 할 수 있도록 띄워주고, 있으먼 내가 작성한 답변 띄워주기(응답 수정)
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
//		SurveyUpdate ssUpdate = new SurveyUpdate(emplId, surveyNo);
		
		try {
			Survey survey = sService.selectSurveyByNo(surveyNo);
			List<SurveyQuest> surveyQuestList = sService.selectAllSurveyQuestByNo(surveyNo);
			
			if(survey != null) {
				mv.addObject("surveyInfo", survey);
				mv.addObject("questList", surveyQuestList);
				mv.setViewName("survey/surveyDetailPage");
				
			} else {
				mv.addObject("msg1", "설문조사 응답 페이지 조회 실패");
				mv.setViewName("common/errorPage");
			}
			//설문 등록
//			int result = sService.insertSurvey(survey);
//			
//			if(result > 0) {
//				mv.setViewName("survey/surveyWriteQuest");
//			} else {
//				mv.addObject("msg1", "설문조사 응답 페이지 조회 실패");
//				mv.setViewName("common/errorPage");
//			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		//번호로 설문조사 정보 가져오기
		//설문조사에 포함된 설문문항 가져오기
		//설문조사 보기 가져오기
		//설문조사 번호, 내 아이디로 나의 응답 가져오기
		
		//응답 수정 페이지
		//응답 제출 페이지
		
		return mv;
	}
	
	//설문 수정 페이지
	@RequestMapping(value="/survey/updateSurveyPage.hirp", method=RequestMethod.POST)
	public ModelAndView surveyModifyPage(ModelAndView mv
			, @RequestParam("surveyNo") int surveyNo
			, HttpServletRequest request) {
		//세션 아이디 값이 작성자와 같을 때 수정 페이지 이동 가능(jsp에서 처리)
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		try {
			Survey survey = sService.selectSurveyByNo(surveyNo);
			List<Employee> emplList = eaService.printAllEmployeeWithName();
			List<SurveySub> subList = sService.selectSurveySubByNo(surveyNo);
			if(survey != null) {
				mv.addObject("surveyInfo", survey);
				if(emplList != null && subList != null) {
					mv.addObject("subList", subList);
					System.out.println(subList);
					mv.addObject("emplList", emplList);
					mv.setViewName("survey/surveyUpdateInfo");
				}
			} else {
				mv.addObject("msg", "설문조사 수정 페이지 조회 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//설문 수정
	@RequestMapping(value="/survey/updateSurvey.hirp", method=RequestMethod.POST)
	public ModelAndView surveyModify(ModelAndView mv
			,@ModelAttribute Survey survey
			,@RequestParam("surveySubject") String surveySubject
			,@RequestParam(value="subDept", required = false) String subDept
			,@RequestParam(value="surveySubjectIdList", required = false) String surveySubjectIdList
			, HttpServletRequest request) {
		//진행중일 때는 진행 기간, 대상, 응답 수정 허용 여부, 설문 결과 공개 여부 변경 가능
		//마감했을 땐 진행 기간, 설문 결과 공개 여부 변경 가능
		
		//세션에서 아이디, depcode 가져와서 넣어주기.
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		survey.setSurveyWriter(emplId);
		String deptCode = session.getAttribute("deptCode").toString();
		
		//설문 응답자 유형
		System.out.println(surveySubject);
		System.out.println("subDept:"+subDept); //checked일 때 on, 아닐 때 null
		
		//응답자 리스트
		List<String> subjectList = new ArrayList<String>();

		try {
			//설문 응답자 타입에 따라서 다르게 담아줌.
			if(surveySubject.equals("본인소속")) {
				List<Employee> myDeptEmpl = new ArrayList<Employee>();
				if(subDept != null) { //하위부서 선택o
					myDeptEmpl = eaService.printAllEmployeeWithDeptCode(deptCode);
				} else { //null일 때 즉 하위부서 선택x
					myDeptEmpl = eaService.printEmployeeWithDeptCode(deptCode);
				}
				for(int i = 0 ; i < myDeptEmpl.size(); i++) {
					subjectList.add(myDeptEmpl.get(i).getEmplId());
				}
				System.out.println("myDeptEmpl:"+myDeptEmpl);
				
			} else if(surveySubject.equals("직접선택")) {
				//설문 응답자리스트
				if(surveySubjectIdList != null) {
					System.out.println("surveyObjectIdList:"+surveySubjectIdList);
					subjectList = Arrays.asList(surveySubjectIdList.split(","));
					//List<SurveySub> subList = new ArrayList<SurveySub>();
				}
			} else {
				System.out.println("둘다 아님");
			}
			
			//설문 수정
			int result = sService.updateSurvey(survey);
			int result2 = 0;
			
			if(result > 0) {
				//설문조사 번호로 응답자 삭제
				int result3 = sService.deleteSurveySubList(survey.getSurveyNo());
				//설문 응답자 재등록
				if(subjectList != null) {
					for(int i = 0; i < subjectList.size(); i++) {
						SurveySub surveySub = new SurveySub();
						surveySub.setSurveyNo(survey.getSurveyNo()); //surveyNo 지정
						surveySub.setSubId(subjectList.get(i)); //subId 지정
//					subList.add(surveySub);
//					System.out.println(subList.get(i));
						result2 = sService.insertSurveySub(surveySub);
					}
					
				}
				mv.setViewName("redirect:/survey/main.hirp");
			} else {
				mv.addObject("msg1", "설문조사 정보 추가 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		
		return mv;
	}

	//설문 마감
	@RequestMapping(value="/survey/updateStatus.hirp", method=RequestMethod.POST)
	public ModelAndView surveyClose(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		//자신의 게시글일 때만 마감 버튼이 보이도록 jsp에서 처리
		//survey 상태 마감으로 update
		try {
			int result = sService.updateSurveyStatus(surveyNo);
			if(result > 0) {
				mv.setViewName("redirect:/survey/main.hirp");
			} else {
				mv.addObject("msg1", "설문조사 상태 업데이트 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//설문 삭제
	@RequestMapping(value="/survey/deleteSurvey.hirp", method=RequestMethod.POST)
	public ModelAndView surveyDelete(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		//설문조사 삭제
		try {
			int result = sService.deleteSurvey(surveyNo);
			if(result > 0) {
				mv.setViewName("redirect:/survey/main.hirp");
			} else {
				mv.addObject("msg1", "설문조사 삭제 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		//SURVEY_TBL만 수정하면 아래 연관된 테이블 전부 삭제되도록 TRIGGER 걸어둠
		//설문조사 대상자 삭제 (SURVEY_TBL SURVEY_NO에 제약조건 걸려있음)
		//설문조사 응답 삭제 (SURVEY_TBL SURVEY_NO에 제약조건 걸려있음)
		//설문조사 문항 삭제 (TRIGGER 걸려있음)
		//survey 에서 q1~q4에 담겨있는 번호 가져와서 담아서 delete 해주기
		//설문조사 문항 보기 삭제 (SURVEY_QUEST QUEST_NO에 제약조건 걸려있음)
		return mv;
	}
	
	//설문 응답 제출
	@RequestMapping(value="/survey/addSurveyAnswer.hirp", method=RequestMethod.POST)
	public ModelAndView surveySubmit(ModelAndView mv
			,@ModelAttribute SurveyAnswer surveyAnswer
			, HttpServletRequest request) {
		//insert 할 거니까 설문응답번호 자동 생성됨.
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		int aCount = surveyAnswer.getSurveyAnswerList().size();
		System.out.println("emplId");
		System.out.println(emplId);
		System.out.println(surveyAnswer);
		System.out.println(aCount);
		System.out.println("surveyanswer 출력");
//		for(int i = 0; i < aCount; i++) {
//			surveyAnswer.getSurveyAnswerList().get(i).setSurveyanswerId(emplId); //세션에 있는 아이디 넘겨주기
//			System.out.println((i+1) + "번째 : " + surveyAnswer.getSurveyAnswerList().get(i));
//		}
		
		SurveyUpdate ssUpdate = new SurveyUpdate(emplId, surveyAnswer.getSurveyNo());
		
		try {
			int result = 0;
			for(int i = 0; i < aCount; i++) {
				surveyAnswer.getSurveyAnswerList().get(i).setSurveyanswerId(emplId); //세션에 있는 아이디 넘겨주기
				System.out.println((i+1) + "번째 : " + surveyAnswer.getSurveyAnswerList().get(i));
				result = sService.insertSurveySubAnswer(surveyAnswer.getSurveyAnswerList().get(i));
			}
			if(result > 0) {
				//설문조사 응답자 목록에서 answerstatus 업데이트
				int result2 = sService.updateSubAnswerStatus(ssUpdate);
				if(result2 > 0) {
					mv.setViewName("redirect:/survey/main.hirp"); //이거 바꾸기
				}
			} else {
				mv.addObject("msg", "설문조사 응답 제출 실패");
				mv.setViewName("common/errorPage");
			}
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//설문 응답 수정
	public ModelAndView surveySubmitModify(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo
			,@ModelAttribute List<SurveyAnswer> surveyAnswer) {
		//만약에 설문응답번호가 없으면 surveyNo으로 가져와서 set 해주기
		return mv;
	}
	
	//설문 결과 페이지 (설문 상세2)
	public ModelAndView surveySubmitResult(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		
		//번호로 설문조사 정보 가져오기
		//설문조사에 포함된 설문문항 가져오기
		//설문조사 보기 가져오기
		//설문조사 번호로 설문조사 응답 가져오기
		
		return mv;
	}
	//설문 검색
	public ModelAndView surveySearch(ModelAndView mv
			,@ModelAttribute Search search
			,@RequestParam("surveyStatus") String surveyStatus
			, HttpServletRequest request) {
		//surveyStatus 담아서 진행중/마감 설문조사 나누어 검색하기
		//내가 만든 설문은 surveyStatus 비워진 상태, session에서 아이디값 가져오기
		
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		
		SurveySearch surveySearch = new SurveySearch(search);
		if(surveyStatus == null) {
			surveySearch.setEmplId(emplId);
		} else {
			surveySearch.setSurveyStatus(surveyStatus);
		}
		List<Survey> searchList = sService.printSeartchSurvey(surveySearch);
		return mv;
	}

}
