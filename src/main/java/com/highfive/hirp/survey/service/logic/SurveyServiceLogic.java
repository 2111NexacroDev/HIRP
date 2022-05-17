package com.highfive.hirp.survey.service.logic;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.survey.domain.Survey;
import com.highfive.hirp.survey.domain.SurveyAnswer;
import com.highfive.hirp.survey.domain.SurveyQuest;
import com.highfive.hirp.survey.domain.SurveyQuestCh;
import com.highfive.hirp.survey.domain.SurveySearch;
import com.highfive.hirp.survey.domain.SurveySub;
import com.highfive.hirp.survey.domain.SurveyUpdate;
import com.highfive.hirp.survey.service.SurveyService;
import com.highfive.hirp.survey.store.SurveyStore;

@Service
public class SurveyServiceLogic implements SurveyService{
	
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private SurveyStore sStore;
	//리스트 조회
	//전체 설문조사 리스트 조회 (최신 설문)
	@Override
	public List<Survey> selectAllSurvey(String emplId) {
		List<Survey> allSurveyList = sStore.selectAllSurvey(sqlSession, emplId);
		return allSurveyList;
	}
	//진행중인 설문조사 리스트 조회
	@Override
	public List<Survey> selectProceedSurvey(String emplId) {
		List<Survey> proceedSurveyList = sStore.selectProceedSurvey(sqlSession, emplId);
		return proceedSurveyList;
	}
	//마감된 설문조사 리스트 조회
	@Override
	public List<Survey> selectClosedSurvey(String emplId) {
		List<Survey> closedSurveyList = sStore.selectClosedSurvey(sqlSession, emplId);
		return closedSurveyList;
	}
	//내가 작성한 설문조사 리스트 조회
	@Override
	public List<Survey> selectWroteSurvey(String emplId) {
		List<Survey> wroteSurveyList = sStore.selectWroteSurvey(sqlSession, emplId);
		return wroteSurveyList;
	}
	//내가 대상자이면서 진행 중이고 응답하지 않은 설문 리스트 조회
	@Override
	public List<Survey> selectSubSurveyById(String emplId) {
		List<Survey> mySurveyList = sStore.selectSubSurveyById(sqlSession, emplId);
		return mySurveyList;
	}
	//설문조사 대상자 가져오기(응답여부까지)
	@Override
	public List<SurveySub> selectSurveySubByNo(int surveyNo) {
		List<SurveySub> surveySubList = sStore.selectSurveySubByNo(sqlSession, surveyNo);
		return surveySubList;
	}
	//설문조사 등록
	//설문조사 추가
	@Override
	public int insertSurvey(Survey survey) {
		int result = sStore.insertSurvey(sqlSession, survey);
		return result;
	}
	//응답자 검색
	@Override
	public List<Employee> selectSearchEmplList(String emplSearchKeyword) {
		List<Employee> emplList = sStore.selectSearchEmplList(sqlSession, emplSearchKeyword);
		return emplList;
	}
	//설문 문항 추가
	@Override
	public int insertSurveyQuest(SurveyQuest surveyQuest) {
		int result = sStore.insertSurveyQuest(sqlSession, surveyQuest);
		return result;
	}
	//설문 보기 추가(날짜/객관식의 경우)
	@Override
	public int insertSurveyQuestCh(SurveyQuestCh qCh) {
		int result = sStore.insertSurveyQuestCh(sqlSession, qCh);
		return result;
	}
	//설문 대상자 리스트 추가
	@Override
	public int insertSurveySub(SurveySub subList) {
		int result = sStore.insertSurveySub(sqlSession, subList);
		return result;
	}
	//현재 설문조사 시퀀스 번호 가져오기
	public int selectSurveySeqNo() {
		int result = sStore.selectSurveySeqNo(sqlSession);
		return result;
	}
	
	//전체 직원 가져오기
	@Override
	public List<Employee> selectAllSurveySub() {
		List<Employee> emplList = sStore.selectAllSurveySub(sqlSession);
		return emplList;
	}
	//현재 부서원 추가
	//하위 부서원까지 추가
	//특정 부서원만 추가
	@Override
	public List<String> selectSurveySubByDeptCode(HashMap<String, String> surveySubInfo) {
		List<String> emplIdList = sStore.selectSurveySubByDeptCode(sqlSession, surveySubInfo);
		return emplIdList;
	}
	
	//설문조사 상세
	//설문조사 정보 가져오기
	@Override
	public Survey selectSurveyByNo(int surveyNo) {
		Survey survey = sStore.selectSurveyByNo(sqlSession, surveyNo);
		return survey;
	}
	//설문조사에 포함된 설문 문항 가져오기
	@Override
	public List<SurveyQuest> selectAllSurveyQuestByNo(int surveyQuestNo) {
		List<SurveyQuest> surveyQuestList = sStore.selectAllSurveyQuestByNo(sqlSession, surveyQuestNo);
		return surveyQuestList;
	}
	//설문조사에 포함된 설문 문항 가져오기
	@Override
	public SurveyQuest selectOneSurveyQuestByNo(int surveyQuestNo) {
		SurveyQuest surveyQuest = sStore.selectOneSurveyQuestByNo(sqlSession, surveyQuestNo);
		return surveyQuest;
	}
	//설문조사 보기 가져오기
	@Override
	public SurveyQuestCh selectSurveyQuestChByNo(int surveyQuestNo) {
		SurveyQuestCh surveyQuestCh = sStore.selectSurveyQuestChByNo(sqlSession, surveyQuestNo);
		return surveyQuestCh;
	}
	//설문조사 번호로 설문조사 응답 가져오기
	@Override
	public List<SurveyAnswer> selectSurveyAnswerByNo(int surveyNo) {
		List<SurveyAnswer> surveyAnswerList = sStore.selectSurveyAnswerByNo(sqlSession, surveyNo);
		return surveyAnswerList;
	}
	//설문조사 번호, 내 아이디로 나의 응답 가져오기
	@Override
	public SurveyAnswer selectSurveyMyAnswerByNo(SurveyUpdate ssUpdate) {
		SurveyAnswer surveyAnswer = sStore.selectSurveyMyAnswerByNo(sqlSession, ssUpdate);
		return surveyAnswer;
	}
	//emplId, surveyNo 담아서 넘겨줌.
	
	
	//설문조사 수정
	//설문조사 정보 수정
	@Override
	public int updateSurvey(Survey survey) {
		int result = sStore.updateSurvey(sqlSession, survey);
		return result;
	}
	//설문조사 상태 수정
	@Override
	public int updateSurveyStatus(int surveyNo) {
		int result = sStore.updateSurveyStatus(sqlSession, surveyNo);
		return result;
	}
	
	//설문조사에 포함된 설문 문항 가져오기
	@Override
	public int updateSurveySubList(List<SurveySub> subList) {
		int result = sStore.updateSurveySubList(sqlSession, subList);
		return result;
	}
	
	//설문조사 삭제
	//설문조사 정보 삭제
	@Override
	public int deleteSurvey(int surveyNo) {
		int result = sStore.deleteSurvey(sqlSession, surveyNo);
		return result;
	}

	//응답
	//설문조사 응답 내용 추가
	@Override
	public int insertSurveySubAnswer(SurveyAnswer surveyAnswer) {
		int result = sStore.insertSurveySubAnswer(sqlSession, surveyAnswer);
		return result;
	}
	//설문조사 응답자 응답상태 변경
	@Override
	public int updateSubAnswerStatus(SurveyUpdate ssUpdate) {
		int result = sStore.updateSubAnswerStatus(sqlSession, ssUpdate);
		return result;
	}
	//설문조사 응답 수정
	@Override
	public int updateSurveySubAnswer(SurveyAnswer surveyAnswer) {
		int result = sStore.updateSurveySubAnswer(sqlSession, surveyAnswer);
		return result;
	}
	
	//설문조사 검색
	@Override
	public List<Survey> printSeartchSurvey(SurveySearch surveySearch) {
		List<Survey> searchSurvey = sStore.selectSearchSurvey(sqlSession, surveySearch);
		return searchSurvey;
	}




	
}
