package com.highfive.hirp.survey.domain;

import com.highfive.hirp.common.Search;

public class SurveySearch {
	private Search search;
	private String surveyStatus; //진행중, 마감
	private String emplId;
	
	public SurveySearch() {}
	
	public SurveySearch(Search search) {
		super();
		this.search = search;
	}
	
	public SurveySearch(Search search, String surveyStatus, String empl) {
		super();
		this.search = search;
		this.surveyStatus = surveyStatus;
		this.emplId = emplId;
	}

	public Search getSearch() {
		return search;
	}

	public void setSearch(Search search) {
		this.search = search;
	}

	public String getSurveyStatus() {
		return surveyStatus;
	}

	public void setSurveyStatus(String surveyStatus) {
		this.surveyStatus = surveyStatus;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	@Override
	public String toString() {
		return "SurveySearch [search=" + search + ", surveyStatus=" + surveyStatus + ", emplId=" + emplId + "]";
	}
	
	
	
}
