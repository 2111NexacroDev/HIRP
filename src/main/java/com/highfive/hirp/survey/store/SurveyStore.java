package com.highfive.hirp.survey.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.survey.domain.Survey;
import com.highfive.hirp.survey.domain.SurveyAnswer;
import com.highfive.hirp.survey.domain.SurveyQuest;
import com.highfive.hirp.survey.domain.SurveyQuestCh;
import com.highfive.hirp.survey.domain.SurveySub;
import com.highfive.hirp.survey.domain.SurveySubUpdate;

public interface SurveyStore {

	//설문조사 리스트 조회
	//전체 리스트 조회(최신)
	public List<Survey> selectAllSurvey(SqlSession sqlSession);
	//진행중인 리스트 조회
	public List<Survey> selectProceedSurvey(SqlSession sqlSession);
	//마감된 설문리스트 조회
	public List<Survey> selectClosedSurvey(SqlSession sqlSession);
	//내가 작성한 설문 리스트 조회
	public List<Survey> selectWroteSurvey(SqlSession sqlSession);
	//내가 대상자인 것 중 진행 중이면서 응답하지 않은 설문 리스트 조회
	public List<Survey> selectSubSurveyById(SqlSession sqlSession, String emplId);
	//설문조사 대상자 가져오기 (응답여부 확인 가능)
	public List<SurveySub> selectSurveySubByNo(SqlSession sqlSession, int surveyNo);

	//설문조사 등록
	//설문 추가
	public int insertSurvey(SqlSession sqlSession, Survey survey);
	//설문 문항 추가
	public int insertSurveyQuest(SqlSession sqlSession, SurveyQuest surveyQuest);
	//설문 보기 추가 (날짜/객관식의 경우)
	public int insertSurveyQuestCh(SqlSession sqlSession, SurveyQuestCh qCh);
	//설문 대상자 리스트 추가
	public int insertSurveySub(SqlSession sqlSession, List<SurveySub> subList);

	//설문조사 상세
	//설문조사 정보 가져오기
	public Survey selectSurveyByNo(SqlSession sqlSession, int surveyNo);
	//설문조사에 포함된 설문 문항 모두 가져오기
	public List<SurveyQuest> selectSurveyQuestByNo(SqlSession sqlSession, int surveyNo);
	//설문조사 보기 가져오기
	public SurveyQuestCh selectSurveyQuestChByNo(SqlSession sqlSession, int surveyQuestNo);

	//설문조사 수정
	//설문조사 정보 수정
	public int updateSurvey(SqlSession sqlSession, Survey survey);
	//설문조사 대상자 리스트 수정
	public int updateSurveySubList(SqlSession sqlSession, List<SurveySub> subList);

	//설문조사 응답
	//설문조사 응답 내용 추가
	public int insertSurveySubAnswer(SqlSession sqlSession, SurveyAnswer surveyAnswer);
	//설문조사 응답자 응답상태 변경
	public int updateSubAnswerStatus(SqlSession sqlSession, SurveySubUpdate ssUpdate);

	//설문조사 응답 수정
	public int updateSurveySubAnswer(SqlSession sqlSession, SurveyAnswer surveyAnswer);
	
	//설문조사 검색

}
