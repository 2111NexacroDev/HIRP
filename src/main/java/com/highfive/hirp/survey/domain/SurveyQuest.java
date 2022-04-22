package com.highfive.hirp.survey.domain;

public class SurveyQuest {
	private int questNo;
	private String questTitle;
	private String questType1;
	private String questType2;
	private String questRequired;
	
	public SurveyQuest() {}

	public SurveyQuest(int questNo, String questTitle, String questType1, String questType2, String questRequired) {
		super();
		this.questNo = questNo;
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

	@Override
	public String toString() {
		return "SurveyQuest [questNo=" + questNo + ", questTitle=" + questTitle + ", questType1=" + questType1
				+ ", questType2=" + questType2 + ", questRequired=" + questRequired + "]";
	}
	
	
}
