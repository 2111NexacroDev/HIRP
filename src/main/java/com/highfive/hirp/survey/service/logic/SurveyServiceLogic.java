package com.highfive.hirp.survey.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.survey.service.SurveyService;
import com.highfive.hirp.survey.store.SurveyStore;

@Service
public class SurveyServiceLogic implements SurveyService{
	
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private SurveyStore sStore;
}
