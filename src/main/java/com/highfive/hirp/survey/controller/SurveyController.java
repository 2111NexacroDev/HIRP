package com.highfive.hirp.survey.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.survey.domain.Survey;
import com.highfive.hirp.survey.domain.SurveyAnswer;
import com.highfive.hirp.survey.domain.SurveyQuest;
import com.highfive.hirp.survey.domain.SurveyQuestCh;
import com.highfive.hirp.survey.service.SurveyService;

@Controller
public class SurveyController {
	@Autowired
	private SurveyService sService;
	
	//설문조사 메인페이지 (최신 리스트 조회)
	public ModelAndView surveyMain(ModelAndView mv) {
		//내가 대상자인 것 중 진행중이면서 응답하지 않은 설문 리스트
		//최근 생성된 설문 리스트
		//설문 리스트에 대한 나의 참여 여부
		return mv;
	}
	
	//진행중인 설문 페이지 (리스트 조회)
	public ModelAndView ProceedSurvey(ModelAndView mv) {
		//진행중인 설문 리스트
		//진행중인 설문 리스트에 대한 나의 참여 여부
		//응답자 리스트 보기 (응답여부까지) -> 팝업창
		return mv;
	}
	
	//마감된 설문 페이지 (리스트 조회)
	public ModelAndView closedSurvey(ModelAndView mv) {
		//마감된 설문 리스트
		//마감된 설문 리스트에 대한 나의 참여 여부
		return mv;
	}

	//내가 만든 설문 페이지 (리스트 조회)
	public ModelAndView wroteSurvey(ModelAndView mv
			, HttpServletRequest request) {
		//아이디 가져옴 (세션에서)
		//내가 만든 설문 리스트
		
		return mv;
	}
	

	//설문 등록 페이지 
	public ModelAndView writeSurveyPage(ModelAndView mv) {
		
		return mv;
	}
	
	//설문 등록 (설문정보, 문항까지 저장 임시저장여부도 가져와서 넣어주기)
	public ModelAndView writeSurvey(ModelAndView mv
			,@ModelAttribute Survey survey
			,@ModelAttribute SurveyQuest surveyQuest1
			,@ModelAttribute SurveyQuest surveyQuest2
			,@ModelAttribute SurveyQuest surveyQuest3
			,@ModelAttribute SurveyQuest surveyQuest4
			,@ModelAttribute SurveyQuestCh qCh1
			,@ModelAttribute SurveyQuestCh qCh2
			,@ModelAttribute SurveyQuestCh qCh3
			,@ModelAttribute SurveyQuestCh qCh4
			, HttpServletRequest request) {
		
		//설문 등록
		//설문 문항 추가 1~4 (비어있지 않을 때)
		//설문 보기 추가 1~4 (비어있지 않을 때)
		//설문 대상자 리스트 추가
		return mv;
	}

	//대상자 리스트 가져오기(설문 등록할 때 쓰려고)
	public ModelAndView chooseEmpl(ModelAndView mv) {
		//대상자 리스트 가져오기
		//자기 소속 부서일 때는 부서 사람 OR 하위
		//
		return mv;
	}
	
	
	//설문 수정 페이지
	public ModelAndView surveyModifyPage(ModelAndView mv) {
		
		return mv;
	}
	
	//설문 수정
	public ModelAndView surveyModify(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		
		return mv;
	}
	//설문 마감
	public ModelAndView surveyClose(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		
		return mv;
	}
	//설문 삭제
	public ModelAndView surveyDelete(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		return mv;
	}
	
	
	//설문 응답 페이지 (설문 상세1)
	public ModelAndView surveySubmitPage(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		return mv;
	}
	//설문 응답 제출
	public ModelAndView surveySubmit(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo
			,@ModelAttribute SurveyAnswer surveyAnswer1
			,@ModelAttribute SurveyAnswer surveyAnswer2
			,@ModelAttribute SurveyAnswer surveyAnswer3
			,@ModelAttribute SurveyAnswer surveyAnswer4) {
		//insert 할 거니까 설문응답번호 자동 생성됨.
		return mv;
	}
	
	//설문 응답 수정 페이지
	public ModelAndView surveySubmitModifyPage(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		return mv;
	}
	//설문 응답 수정
	public ModelAndView surveySubmitModify(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo
			,@ModelAttribute SurveyAnswer surveyAnswer1
			,@ModelAttribute SurveyAnswer surveyAnswer2
			,@ModelAttribute SurveyAnswer surveyAnswer3
			,@ModelAttribute SurveyAnswer surveyAnswer4) {
		//만약에 설문응답번호가 없으면 surveyNo으로 가져와서 set 해주기
		return mv;
	}
	//설문 결과 페이지 (설문 상세2)
	public ModelAndView surveySubmitResult(ModelAndView mv
			,@RequestParam("surveyNo") int surveyNo) {
		
		return mv;
	}
	//설문 검색
	public ModelAndView surveySearch(ModelAndView mv
			,@ModelAttribute Search search
			,@RequestParam("surveyStatus") String surveyStatus) {
		//surveyStatus 담아서 진행중/마감 설문조사 나누어 검색하기
		//내가 만든 설문은 surveyStatus 비워진 상태, session에서 아이디값 가져오기
//		HashMap<Search, String> 에 담아서 보내주기
		HashMap<Search, String> searchInfo = null;
		List<Survey> searchList = sService.printSeartchSurvey(searchInfo);
		return mv;
	}

}
