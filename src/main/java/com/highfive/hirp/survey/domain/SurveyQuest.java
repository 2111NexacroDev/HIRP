package com.highfive.hirp.survey.domain;

import java.util.List;

public class SurveyQuest {
	private int questNo;
	private int surveyNo;
	private String questTitle;
	private String questType1;
	private String questType2;
	private String questRequired;
	//보기
//	private String surveyCh1;
//	private String surveyCh2;
//	private String surveyCh3;
//	private String surveyCh4;
//	private String surveyChmax;
	private SurveyQuestCh surveyQuestCh;
	
	private List<SurveyQuest> surveyQuestList;
	
	public SurveyQuest() {}

	public SurveyQuest(int questNo, int surveyNo, String questTitle, String questType1, String questType2,
			String questRequired) {
		super();
		this.questNo = questNo;
		this.surveyNo = surveyNo;
		this.questTitle = questTitle;
		this.questType1 = questType1;
		this.questType2 = questType2;
		this.questRequired = questRequired;
	}

	public int getQuestNo() {
		return questNo;
	}

	public void setQuestNo(int questNo) {
		this.questNo = questNo;
	}

	public int getSurveyNo() {
		return surveyNo;
	}

	public void setSurveyNo(int surveyNo) {
		this.surveyNo = surveyNo;
	}

	public String getQuestTitle() {
		return questTitle;
	}

	public void setQuestTitle(String questTitle) {
		this.questTitle = questTitle;
	}

	public String getQuestType1() {
		return questType1;
	}

	public void setQuestType1(String questType1) {
		this.questType1 = questType1;
	}

	public String getQuestType2() {
		return questType2;
	}

	public void setQuestType2(String questType2) {
		this.questType2 = questType2;
	}

	public String getQuestRequired() {
		return questRequired;
	}

	public void setQuestRequired(String questRequired) {
		this.questRequired = questRequired;
	}
	
	//보기
	public SurveyQuestCh getSurveyQuestCh() {
		return surveyQuestCh;
	}
	
	public void setSurveyQuestCh(SurveyQuestCh surveyQuestCh) {
		this.surveyQuestCh = surveyQuestCh;
	}

	//보기
//	public String getSurveyCh1() {
//		return surveyCh1;
//	}
//
//	public void setSurveyCh1(String surveyCh1) {
//		this.surveyCh1 = surveyCh1;
//	}
//
//	public String getSurveyCh2() {
//		return surveyCh2;
//	}
//
//	public void setSurveyCh2(String surveyCh2) {
//		this.surveyCh2 = surveyCh2;
//	}
//
//	public String getSurveyCh3() {
//		return surveyCh3;
//	}
//
//	public void setSurveyCh3(String surveyCh3) {
//		this.surveyCh3 = surveyCh3;
//	}
//
//	public String getSurveyCh4() {
//		return surveyCh4;
//	}
//
//	public void setSurveyCh4(String surveyCh4) {
//		this.surveyCh4 = surveyCh4;
//	}
//
//	public String getSurveyChmax() {
//		return surveyChmax;
//	}
//
//	public void setSurveyChmax(String surveyChmax) {
//		this.surveyChmax = surveyChmax;
//	}

	//questList
	public List<SurveyQuest> getSurveyQuestList(){
		return surveyQuestList;
	}
	
	public void setSurveyQuestList(List<SurveyQuest> surveyQuestList) {
		this.surveyQuestList = surveyQuestList;
	}
	
	@Override
	public String toString() {
		return "SurveyQuest [questNo=" + questNo + ", surveyNo=" + surveyNo + ", questTitle=" + questTitle
				+ ", questType1=" + questType1 + ", questType2=" + questType2 + ", questRequired=" + questRequired
				+ "]";
	}


	
}
