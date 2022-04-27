package com.highfive.hirp.survey.domain;

import java.sql.Date;

public class SurveyMyStatus {
//	설문조사
	private int surveyNo;
	private String surveyTitle;
	private String surveyWriter;
	private Date surveyDate;
	private Date surveyUpdate;
	private String surveyStatus;
	private Date surveyStartdate;
	private Date surveyEnddate;
	private String surveyResult;
	private String surveyEdit;
	private String surveyStartcomment;
	private String surveyQ1;
	private String surveyQ2;
	private String surveyQ3;
	private String surveyQ4;
	private String surveyStorage;
//	응답여부
	private String subAnswerstatus;
	
	public SurveyMyStatus() {}
	
	public SurveyMyStatus(int surveyNo, String surveyTitle, String surveyWriter, Date surveyDate, Date surveyUpdate,
			String surveyStatus, Date surveyStartdate, Date surveyEnddate, String surveyResult, String surveyEdit,
			String surveyStartcomment, String surveyQ1, String surveyQ2, String surveyQ3, String surveyQ4,
			String surveyStorage, String subAnswerstatus) {
		super();
		this.surveyNo = surveyNo;
		this.surveyTitle = surveyTitle;
		this.surveyWriter = surveyWriter;
		this.surveyDate = surveyDate;
		this.surveyUpdate = surveyUpdate;
		this.surveyStatus = surveyStatus;
		this.surveyStartdate = surveyStartdate;
		this.surveyEnddate = surveyEnddate;
		this.surveyResult = surveyResult;
		this.surveyEdit = surveyEdit;
		this.surveyStartcomment = surveyStartcomment;
		this.surveyQ1 = surveyQ1;
		this.surveyQ2 = surveyQ2;
		this.surveyQ3 = surveyQ3;
		this.surveyQ4 = surveyQ4;
		this.surveyStorage = surveyStorage;
		this.subAnswerstatus = subAnswerstatus;
	}
	

	public int getSurveyNo() {
		return surveyNo;
	}

	public void setSurveyNo(int surveyNo) {
		this.surveyNo = surveyNo;
	}

	public String getSurveyTitle() {
		return surveyTitle;
	}

	public void setSurveyTitle(String surveyTitle) {
		this.surveyTitle = surveyTitle;
	}

	public String getSurveyWriter() {
		return surveyWriter;
	}

	public void setSurveyWriter(String surveyWriter) {
		this.surveyWriter = surveyWriter;
	}

	public Date getSurveyDate() {
		return surveyDate;
	}

	public void setSurveyDate(Date surveyDate) {
		this.surveyDate = surveyDate;
	}

	public Date getSurveyUpdate() {
		return surveyUpdate;
	}

	public void setSurveyUpdate(Date surveyUpdate) {
		this.surveyUpdate = surveyUpdate;
	}

	public String getSurveyStatus() {
		return surveyStatus;
	}

	public void setSurveyStatus(String surveyStatus) {
		this.surveyStatus = surveyStatus;
	}

	public Date getSurveyStartdate() {
		return surveyStartdate;
	}

	public void setSurveyStartdate(Date surveyStartdate) {
		this.surveyStartdate = surveyStartdate;
	}

	public Date getSurveyEnddate() {
		return surveyEnddate;
	}

	public void setSurveyEnddate(Date surveyEnddate) {
		this.surveyEnddate = surveyEnddate;
	}

	public String getSurveyResult() {
		return surveyResult;
	}

	public void setSurveyResult(String surveyResult) {
		this.surveyResult = surveyResult;
	}

	public String getSurveyEdit() {
		return surveyEdit;
	}

	public void setSurveyEdit(String surveyEdit) {
		this.surveyEdit = surveyEdit;
	}

	public String getSurveyStartcomment() {
		return surveyStartcomment;
	}

	public void setSurveyStartcomment(String surveyStartcomment) {
		this.surveyStartcomment = surveyStartcomment;
	}

	public String getSurveyQ1() {
		return surveyQ1;
	}

	public void setSurveyQ1(String surveyQ1) {
		this.surveyQ1 = surveyQ1;
	}

	public String getSurveyQ2() {
		return surveyQ2;
	}

	public void setSurveyQ2(String surveyQ2) {
		this.surveyQ2 = surveyQ2;
	}

	public String getSurveyQ3() {
		return surveyQ3;
	}

	public void setSurveyQ3(String surveyQ3) {
		this.surveyQ3 = surveyQ3;
	}

	public String getSurveyQ4() {
		return surveyQ4;
	}

	public void setSurveyQ4(String surveyQ4) {
		this.surveyQ4 = surveyQ4;
	}

	public String getSurveyStorage() {
		return surveyStorage;
	}

	public void setSurveyStorage(String surveyStorage) {
		this.surveyStorage = surveyStorage;
	}

	public String getSubAnswerstatus() {
		return subAnswerstatus;
	}

	public void setSubAnswerstatus(String subAnswerstatus) {
		this.subAnswerstatus = subAnswerstatus;
	}

	@Override
	public String toString() {
		return "SurveyMyStatus [surveyNo=" + surveyNo + ", surveyTitle=" + surveyTitle + ", surveyWriter="
				+ surveyWriter + ", surveyDate=" + surveyDate + ", surveyUpdate=" + surveyUpdate + ", surveyStatus="
				+ surveyStatus + ", surveyStartdate=" + surveyStartdate + ", surveyEnddate=" + surveyEnddate
				+ ", surveyResult=" + surveyResult + ", surveyEdit=" + surveyEdit + ", surveyStartcomment="
				+ surveyStartcomment + ", surveyQ1=" + surveyQ1 + ", surveyQ2=" + surveyQ2 + ", surveyQ3=" + surveyQ3
				+ ", surveyQ4=" + surveyQ4 + ", surveyStorage=" + surveyStorage + ", subAnswerstatus=" + subAnswerstatus
				+ "]";
	}
	
	
	
}
