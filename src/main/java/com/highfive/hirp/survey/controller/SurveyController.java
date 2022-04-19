package com.highfive.hirp.survey.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.survey.domain.Survey;
import com.highfive.hirp.survey.domain.SurveyQuest;
import com.highfive.hirp.survey.domain.SurveyQuestCh;
import com.highfive.hirp.survey.service.SurveyService;

@Controller
public class SurveyController {
	@Autowired
	private SurveyService sService;
	
	//설문조사 메인페이지 (최신 리스트 조회)
	public ModelAndView surveyMain(ModelAndView mv) {
		return mv;
	}
	
	//진행중인 설문 페이지 (리스트 조회)
	public ModelAndView ProceedSurvey(ModelAndView mv) {
		return mv;
	}
	
	//마감된 설문 페이지 (리스트 조회)
	public ModelAndView closedSurvey(ModelAndView mv) {
		return mv;
	}

	//내가 만든 설문 페이지 (리스트 조회)
	public ModelAndView wroteSurvey(ModelAndView mv) {
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
		return mv;
	}
	//대상자 리스트 가져오기 
	public ModelAndView chooseEmpl(ModelAndView mv) {
		return mv;
	}
	
	//설문 수정
	public ModelAndView surveyModify(ModelAndView mv) {
		return mv;
	}
	//설문 마감
	public ModelAndView surveyClose(ModelAndView mv) {
		return mv;
	}
	//설문 삭제
	public ModelAndView surveyDelete(ModelAndView mv) {
		return mv;
	}
	
	
	//설문 응답 페이지 (설문 상세1)
	public ModelAndView surveySubmitPage(ModelAndView mv) {
		return mv;
	}
	//설문 응답 제출
	public ModelAndView surveySubmit(ModelAndView mv) {
		return mv;
	}
	//설문 응답 수정
	public ModelAndView surveySubmitModify(ModelAndView mv) {
		return mv;
	}
	//설문 결과 페이지 (설문 상세2)
	public ModelAndView surveySubmitResult(ModelAndView mv) {
		return mv;
	}
}
