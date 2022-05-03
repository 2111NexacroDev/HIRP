package com.highfive.hirp.survey.domain;

import java.sql.Date;
//설문조사 + 나의 응답여부
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
	private String surveyStorage;
//	응답여부
	private String subAnswerstatus;
	
	public SurveyMyStatus() {}

	public SurveyMyStatus(int surveyNo, String surveyTitle, String surveyWriter, Date surveyDate, Date surveyUpdate,
			String surveyStatus, Date surveyStartdate, Date surveyEnddate, String surveyResult, String surveyEdit,
			String surveyStartcomment, String surveyStorage, String subAnswerstatus) {
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
				+ surveyStartcomment + ", surveyStorage=" + surveyStorage + ", subAnswerstatus=" + subAnswerstatus
				+ "]";
	}
	
	
	
}
