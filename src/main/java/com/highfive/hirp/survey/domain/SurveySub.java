package com.highfive.hirp.survey.domain;

public class SurveySub {
	private int subNo;
	private int surveyNo;
	private String subId;
	private String subAnswerstatus;
	
	public SurveySub() {}

	public SurveySub(int subNo, int surveyNo, String subId, String subAnswerstatus) {
		super();
		this.subNo = subNo;
		this.surveyNo = surveyNo;
		this.subId = subId;
		this.subAnswerstatus = subAnswerstatus;
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

	public String getSubAnswerstatus() {
		return subAnswerstatus;
	}

	public void setSubAnswerstatus(String subAnswerstatus) {
		this.subAnswerstatus = subAnswerstatus;
	}

	@Override
	public String toString() {
		return "SurveySub [subNo=" + subNo + ", surveyNo=" + surveyNo + ", subId=" + subId + ", subAnswerstatus="
				+ subAnswerstatus + "]";
	}
	
	
}
