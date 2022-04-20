package com.highfive.hirp.survey.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.survey.domain.Survey;
import com.highfive.hirp.survey.domain.SurveyAnswer;
import com.highfive.hirp.survey.domain.SurveyQuest;
import com.highfive.hirp.survey.domain.SurveyQuestCh;
import com.highfive.hirp.survey.domain.SurveySub;
import com.highfive.hirp.survey.domain.SurveySubUpdate;
import com.highfive.hirp.survey.store.SurveyStore;

@Repository
public class SurveyStoreLogic implements SurveyStore{

	//설문조사 리스트 조회
	//전체 리스트 조회(최신)
	@Override
	public List<Survey> selectAllSurvey(SqlSession sqlSession) {
		List<Survey> surveyList = sqlSession.selectList("SurveyMapper.selectAllSurvey");
		return surveyList;
	}
	//진행중인 리스트 조회
	@Override
	public List<Survey> selectProceedSurvey(SqlSession sqlSession) {
		List<Survey> surveyList = sqlSession.selectList("SurveyMapper.selectProceedSurvey");
		return surveyList;
	}
	//마감된 설문리스트 조회
	@Override
	public List<Survey> selectClosedSurvey(SqlSession sqlSession) {
		List<Survey> surveyList = sqlSession.selectList("SurveyMapper.selectClosedSurvey");
		return surveyList;
	}
	//내가 작성한 설문 리스트 조회
	@Override
	public List<Survey> selectWroteSurvey(SqlSession sqlSession) {
		List<Survey> surveyList = sqlSession.selectList("SurveyMapper.selectWroteSurvey");
		return surveyList;
	}
	//내가 대상자인 것 중 진행 중이면서 응답하지 않은 설문 리스트 조회
	@Override
	public List<Survey> selectSubSurveyById(SqlSession sqlSession, String emplId) {
		List<Survey> surveyList = sqlSession.selectList("SurveyMapper.selectSubSurveyById", emplId);
		return surveyList;
	}
	//설문조사 대상자 가져오기 (응답여부 확인 가능)
	@Override
	public List<SurveySub> selectSurveySubByNo(SqlSession sqlSession, int surveyNo) {
		List<SurveySub> surveySubList = sqlSession.selectList("SurveyMapper.selectSurveySubByNo", surveyNo);
		return surveySubList;
	}

	//설문조사 등록
	//설문 추가
	@Override
	public int insertSurvey(SqlSession sqlSession, Survey survey) {
		int result = sqlSession.insert("SurveyMapper.insertSurvey", survey);
		return result;
	}
	//설문 문항 추가
	@Override
	public int insertSurveyQuest(SqlSession sqlSession, SurveyQuest surveyQuest) {
		int result = sqlSession.insert("SurveyMapper.insertSurveyQuest", surveyQuest);
		return result;
	}
	//설문 보기 추가 (날짜/객관식의 경우)
	@Override
	public int insertSurveyQuestCh(SqlSession sqlSession, SurveyQuestCh qCh) {
		int result = sqlSession.insert("SurveyMapper.insertSurveyQuestCh", qCh);
		return result;
	}
	//설문 대상자 리스트 추가
	@Override
	public int insertSurveySub(SqlSession sqlSession, List<SurveySub> subList) {
		int result = sqlSession.insert("SurveyMapper.insertSurveySub", subList);
		return result;
	}

	//설문조사 상세
	//설문조사 정보 가져오기
	@Override
	public Survey selectSurveyByNo(SqlSession sqlSession, int surveyNo) {
		Survey survey = sqlSession.selectOne("SurveyMapper.selectSurveyByNo", surveyNo);
		return survey;
	}
	//설문조사에 포함된 설문 문항 모두 가져오기
	@Override
	public List<SurveyQuest> selectSurveyQuestByNo(SqlSession sqlSession, int surveyNo) {
		List<SurveyQuest> surveyQuestList = sqlSession.selectList("SurveyMapper.selectSurveyQuestByNo", surveyNo);
		return surveyQuestList;
	}
	//설문조사 보기 가져오기
	@Override
	public SurveyQuestCh selectSurveyQuestChByNo(SqlSession sqlSession, int surveyQuestNo) {
		SurveyQuestCh surveyQuestch = sqlSession.selectOne("SurveyMapper.selectSurveyQuestChByNo", surveyQuestNo);
		return surveyQuestch;
	}

	//설문조사 수정
	//설문조사 정보 수정
	@Override
	public int updateSurvey(SqlSession sqlSession, Survey survey) {
		int result = sqlSession.update("SurveyMapper.updateSurvey", survey);
		return result;
	}
	//설문조사 대상자 리스트 수정
	@Override
	public int updateSurveySubList(SqlSession sqlSession, List<SurveySub> subList) {
		int result = sqlSession.update("SurveyMapper.updateSurveySubList", subList);
		return result;
	}

	//설문조사 응답
	//설문조사 응답 내용 추가
	@Override
	public int insertSurveySubAnswer(SqlSession sqlSession, SurveyAnswer surveyAnswer) {
		int result = sqlSession.insert("SurveyMapper.insertSurveySubAnswer", surveyAnswer);
		return result;
	}
	//설문조사 응답자 응답상태 변경
	@Override
	public int updateSubAnswerStatus(SqlSession sqlSession, SurveySubUpdate ssUpdate) {
		int result = sqlSession.update("SurveyMapper.updateSubAnswerStatus", ssUpdate);
		return result;
	}

	//설문조사 응답 수정
	@Override
	public int updateSurveySubAnswer(SqlSession sqlSession, SurveyAnswer surveyAnswer) {
		int result = sqlSession.update("SurveyMapper.updateSurveySubAnswer", surveyAnswer);
		return result;
	}
	//설문조사 검색
	@Override
	public List<Survey> selectSearchSurvey(SqlSession sqlSession, Search search) {
		List<Survey> surveyList = sqlSession.selectList("SurveyMapper.selectSearchSurvey", search);
		return surveyList;
	}
	
	
}