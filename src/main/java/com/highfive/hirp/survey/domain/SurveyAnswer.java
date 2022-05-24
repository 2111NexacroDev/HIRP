package com.highfive.hirp.survey.domain;

import java.util.List;

public class SurveyAnswer {
	private int surveyanswerNo;
	private int surveyNo;
	private int surveyquestNo;
	private String surveyanswerContent;
	private String surveyanswerId;
	private String surveyanswerStorage;
	
	private List<SurveyAnswer> surveyAnswerList;
	
	public SurveyAnswer() {}

	public SurveyAnswer(int surveyanswerNo, int surveyNo, int surveyquestNo, String surveyanswerContent,
			String surveyanswerId, String surveyanswerStorage) {
		super();
		this.surveyanswerNo = surveyanswerNo;
		this.surveyNo = surveyNo;
		this.surveyquestNo = surveyquestNo;
		this.surveyanswerContent = surveyanswerContent;
		this.surveyanswerId = surveyanswerId;
		this.surveyanswerStorage = surveyanswerStorage;
	}

	public int getSurveyanswerNo() {
		return surveyanswerNo;
	}

	public void setSurveyanswerNo(int surveyanswerNo) {
		this.surveyanswerNo = surveyanswerNo;
	}

	public int getSurveyNo() {
		return surveyNo;
	}

	public void setSurveyNo(int surveyNo) {
		this.surveyNo = surveyNo;
	}

	public int getSurveyquestNo() {
		return surveyquestNo;
	}

	public void setSurveyquestNo(int surveyquestNo) {
		this.surveyquestNo = surveyquestNo;
	}

	public String getSurveyanswerContent() {
		return surveyanswerContent;
	}

	public void setSurveyanswerContent(String surveyanswerContent) {
		this.surveyanswerContent = surveyanswerContent;
	}

	public String getSurveyanswerId() {
		return surveyanswerId;
	}

	public void setSurveyanswerId(String surveyanswerId) {
		this.surveyanswerId = surveyanswerId;
	}

	public String getSurveyanswerStorage() {
		return surveyanswerStorage;
	}

	public void setSurveyanswerStorage(String surveyanswerStorage) {
		this.surveyanswerStorage = surveyanswerStorage;
	}

	public List<SurveyAnswer> getSurveyAnswerList() {
		return surveyAnswerList;
	}

	public void setSurveyAnswerList(List<SurveyAnswer> surveyAnswerList) {
		this.surveyAnswerList = surveyAnswerList;
	}

	@Override
	public String toString() {
		return "SurveyAnswer [surveyanswerNo=" + surveyanswerNo + ", surveyNo=" + surveyNo + ", surveyquestNo="
				+ surveyquestNo + ", surveyanswerContent=" + surveyanswerContent + ", surveyanswerId=" + surveyanswerId
				+ ", surveyanswerStorage=" + surveyanswerStorage + "]";
	}
	
	
}
