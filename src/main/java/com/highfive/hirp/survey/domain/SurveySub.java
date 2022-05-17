package com.highfive.hirp.survey.domain;

public class SurveySub {
	private int subNo;
	private int surveyNo;
	private String subId;
	private String subAnswerstatus;
	//Employee 정보 (dept, position join했음)
	private String deptCode;
	private String deptName;
	private String positionCode;
	private String positionName;
	private String emplName;
	
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

	
	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getPositionCode() {
		return positionCode;
	}

	public void setPositionCode(String positionCode) {
		this.positionCode = positionCode;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public String getEmplName() {
		return emplName;
	}

	public void setEmplName(String emplName) {
		this.emplName = emplName;
	}

	@Override
	public String toString() {
		return "SurveySub [subNo=" + subNo + ", surveyNo=" + surveyNo + ", subId=" + subId + ", subAnswerstatus="
				+ subAnswerstatus + "]";
	}
	
	
}
