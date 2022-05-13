package com.highfive.hirp.survey.domain;

import java.util.List;

public class SurveyQuestCh {
	private int surveyquestNo;
	private String surveyCh1;
	private String surveyCh2;
	private String surveyCh3;
	private String surveyCh4;
	private String surveyChmax;
	
	private List<SurveyQuestCh> surveyQuestChList;
	
	public SurveyQuestCh() {}

	public SurveyQuestCh(int surveyquestNo, String surveyCh1, String surveyCh2, String surveyCh3, String surveyCh4,
			String surveyChmax) {
		super();
		this.surveyquestNo = surveyquestNo;
		this.surveyCh1 = surveyCh1;
		this.surveyCh2 = surveyCh2;
		this.surveyCh3 = surveyCh3;
		this.surveyCh4 = surveyCh4;
		this.surveyChmax = surveyChmax;
	}

	public int getSurveyquestNo() {
		return surveyquestNo;
	}

	public void setSurveyquestNo(int surveyquestNo) {
		this.surveyquestNo = surveyquestNo;
	}

	public String getSurveyCh1() {
		return surveyCh1;
	}

	public void setSurveyCh1(String surveyCh1) {
		this.surveyCh1 = surveyCh1;
	}

	public String getSurveyCh2() {
		return surveyCh2;
	}

	public void setSurveyCh2(String surveyCh2) {
		this.surveyCh2 = surveyCh2;
	}

	public String getSurveyCh3() {
		return surveyCh3;
	}

	public void setSurveyCh3(String surveyCh3) {
		this.surveyCh3 = surveyCh3;
	}

	public String getSurveyCh4() {
		return surveyCh4;
	}

	public void setSurveyCh4(String surveyCh4) {
		this.surveyCh4 = surveyCh4;
	}

	public String getSurveyChmax() {
		return surveyChmax;
	}

	public void setSurveyChmax(String surveyChmax) {
		this.surveyChmax = surveyChmax;
	}

	public List<SurveyQuestCh> getSurveyQuestChList(){
		return surveyQuestChList;
	}
	
	public void setSurveyQuestChList(List<SurveyQuestCh> surveyQuestChList) {
		this.surveyQuestChList = surveyQuestChList;
	}
	
	@Override
	public String toString() {
		return "SurveyQuestCh [surveyquestNo=" + surveyquestNo + ", surveyCh1=" + surveyCh1 + ", surveyCh2=" + surveyCh2
				+ ", surveyCh3=" + surveyCh3 + ", surveyCh4=" + surveyCh4 + ", surveyChmax=" + surveyChmax + "]";
	}
	
	
}
