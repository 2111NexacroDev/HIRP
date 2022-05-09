package com.highfive.hirp.survey.domain;

//surveySub 이름, 부서 이름 등 join 해서 select할 때 사용
public class SurveySubEmpl {
	//SurveySub
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
	
	public SurveySubEmpl() {}
	public SurveySubEmpl(int subNo, int surveyNo, String subId, String subAnswerstatus, String deptCode,
			String positionCode, String emplName) {
		super();
		this.subNo = subNo;
		this.surveyNo = surveyNo;
		this.subId = subId;
		this.subAnswerstatus = subAnswerstatus;
		this.deptCode = deptCode;
		this.positionCode = positionCode;
		this.emplName = emplName;
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
	public String getPositionCode() {
		return positionCode;
	}
	public void setPositionCode(String positionCode) {
		this.positionCode = positionCode;
	}
	public String getEmplName() {
		return emplName;
	}
	public void setEmplName(String emplName) {
		this.emplName = emplName;
	}
	@Override
	public String toString() {
		return "SurveySubInfo [subNo=" + subNo + ", surveyNo=" + surveyNo + ", subId=" + subId + ", subAnswerstatus="
				+ subAnswerstatus + ", deptCode=" + deptCode + ", positionCode=" + positionCode + ", emplName="
				+ emplName + "]";
	}
	
	
}
