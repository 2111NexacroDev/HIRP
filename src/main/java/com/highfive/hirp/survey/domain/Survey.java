package com.highfive.hirp.survey.domain;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class Survey {
	private int surveyNo;
	private String surveyTitle;
	private String surveyWriter;
	private String surveyDate;
	private String surveyUpdate;
	private String surveyStatus;
	private String surveyStartdate;
	private String surveyEnddate;
	private String surveyResult;
	private String surveyEdit;
	private String surveyStartcomment;
	private String surveyStorage;
	
	public Survey() {}

	public Survey(int surveyNo, String surveyTitle, String surveyWriter, String surveyDate, String surveyUpdate,
			String surveyStatus, String surveyStartdate, String surveyEnddate, String surveyResult, String surveyEdit,
			String surveyStartcomment, String surveyStorage) {
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

	public String getSurveyDate() {
		return surveyDate;
	}

	public void setSurveyDate(String surveyDate) {
		this.surveyDate = surveyDate;
	}

	public String getSurveyUpdate() {
		return surveyUpdate;
	}

	public void setSurveyUpdate(String surveyUpdate) {
		this.surveyUpdate = surveyUpdate;
	}

	public String getSurveyStatus() {
		return surveyStatus;
	}

	public void setSurveyStatus(String surveyStatus) {
		this.surveyStatus = surveyStatus;
	}

	public String getSurveyStartdate() {
		return surveyStartdate;
	}

	public void setSurveyStartdate(String surveyStartdate) {
		this.surveyStartdate = surveyStartdate;
	}

	public String getSurveyEnddate() {
		return surveyEnddate;
	}

	public void setSurveyEnddate(String surveyEnddate) {
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

	@Override
	public String toString() {
		return "Survey [surveyNo=" + surveyNo + ", surveyTitle=" + surveyTitle + ", surveyWriter=" + surveyWriter
				+ ", surveyDate=" + surveyDate + ", surveyUpdate=" + surveyUpdate + ", surveyStatus=" + surveyStatus
				+ ", surveyStartdate=" + surveyStartdate + ", surveyEnddate=" + surveyEnddate + ", surveyResult="
				+ surveyResult + ", surveyEdit=" + surveyEdit + ", surveyStartcomment=" + surveyStartcomment
				+ ", surveyStorage=" + surveyStorage + "]";
	}
	
	
}
