package com.highfive.hirp.survey.service;

import java.util.List;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.survey.domain.Survey;
import com.highfive.hirp.survey.domain.SurveyAnswer;
import com.highfive.hirp.survey.domain.SurveyQuest;
import com.highfive.hirp.survey.domain.SurveyQuestCh;
import com.highfive.hirp.survey.domain.SurveySub;
import com.highfive.hirp.survey.domain.SurveySubUpdate;

public interface SurveyService {
	//리스트 조회
	//전체 리스트 조회(최신)
	public List<Survey> selectAllSurvey();	
	//진행중인 리스트 조회
	public List<Survey> selectProceedSurvey(); 
	//마감된 설문 리스트 조회
	public List<Survey> selectClosedSurvey(); 
	//내가 작성한 설문 리스트 조회
	public List<Survey> selectWroteSurvey(String emplId); 
	//내가 대상자인 것 중 진행 중이면서 응답하지 않은 설문 리스트 조회
	public List<Survey> selectSubSurveyById(String emplId); 
	//설문조사 대상자 가져오기 (응답여부 확인 가능)
	public List<SurveySub> selectSurveySubByNo(int surveyNo); 
	
	//설문 등록
	//설문 추가
	public int insertSurvey(Survey survey);	
	//설문 문항 추가
	public int insertSurveyQuest(SurveyQuest surveyQuest); 
	//설문 보기 추가 (날짜/객관식의 경우)
	public int insertSurveyQuestCh(SurveyQuestCh qCh); 
	//설문 대상자 리스트 추가
	public int insertSurveySub(List<SurveySub> subList);
	
	//직원 가져오기 (이거 조직도에서 가져다가 쓰면 될 듯 아마두..)
	//현재 부서원 추가
	//하위 부서원까지 추가
	//특정 부서원만 추가
	
	//설문 상세
	//설문조사 정보 가져오기
	public Survey selectSurveyByNo(int surveyNo); 
	//설문조사에 포함된 설문 문항 모두 가져오기
	public List<SurveyQuest> selectSurveyQuestByNo(int surveyNo);
	//설문조사 보기 가져오기
	public SurveyQuestCh selectSurveyQuestChByNo(int surveyQuestNo); 
	
	//설문 수정(문항 수정 불가!)
	//설문조사 정보 수정
	public int updateSurvey(Survey survey); 
	//설문조사 대상자 리스트 수정
	public int updateSurveySubList(List<SurveySub> subList);
	
	//응답
	//설문조사 응답 내용 추가
	public int insertSurveySubAnswer(SurveyAnswer surveyAnswer);
	//설문조사 응답자 응답상태 변경 (회원 아이디, 설문조사 번호로 where 사용해서 status 변경)
	public int updateSubAnswerStatus(SurveySubUpdate ssUpdate); 
	
	//설문조사 응답 수정
	public int updateSurveySubAnswer(SurveyAnswer surveyAnswer);
	
	//설문조사 검색
	public List<Survey> printSeartchSurvey(Search search);
}
