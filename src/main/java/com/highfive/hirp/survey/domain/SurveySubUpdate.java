package com.highfive.hirp.survey.domain;

public class SurveySubUpdate {
	private String emplId;
	private int surveyNo;
	
	public SurveySubUpdate() {}
	
	public SurveySubUpdate(String emplId, int surveyNo) {
		super();
		this.emplId = emplId;
		this.surveyNo = surveyNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public int getSurveyNo() {
		return surveyNo;
	}

	public void setSurveyNo(int surveyNo) {
		this.surveyNo = surveyNo;
	}

	@Override
	public String toString() {
		return "SurveySubUpdate [emplId=" + emplId + ", surveyNo=" + surveyNo + "]";
	}
	
	
}
