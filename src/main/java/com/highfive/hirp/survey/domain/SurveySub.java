package com.highfive.hirp.survey.domain;

public class SurveySub {
	private int subNo;
	private int surveyNo;
	private String subId;
	
	public SurveySub() {}

	public SurveySub(int subNo, int surveyNo, String subId) {
		super();
		this.subNo = subNo;
		this.surveyNo = surveyNo;
		this.subId = subId;
	}

	public int getSubNo() {
		return subNo;
	}

	public void setSubNo(int subNo) {
		this.subNo = subNo;
	}

	public int getSurveyNo() {
		return surveyNo;
	}

	public void setSurveyNo(int surveyNo) {
		this.surveyNo = surveyNo;
	}

	public String getSubId() {
		return subId;
	}

	public void setSubId(String subId) {
		this.subId = subId;
	}

	@Override
	public String toString() {
		return "SurveySub [subNo=" + subNo + ", surveyNo=" + surveyNo + ", subId=" + subId + "]";
	}
	
	
}
