package com.highfive.hirp.employee.domain;

public class Language {
	private int langNo;
	private String emplId;
	private String langCategory;
	private String langName;
	private String langTestDate;
	private String langInst;
	private int langScore; 
	private String langGrade;
	private String langEtc;
	
	public Language() {}

	public Language(int langNo, String emplId, String langCategory, String langName, String langTestDate, String langInst,
			int langScore, String langGrade, String langEtc) {
		super();
		this.langNo = langNo;
		this.emplId = emplId;
		this.langCategory = langCategory;
		this.langName = langName;
		this.langTestDate = langTestDate;
		this.langInst = langInst;
		this.langScore = langScore;
		this.langGrade = langGrade;
		this.langEtc = langEtc;
	}

	public int getLangNo() {
		return langNo;
	}

	public void setLangNo(int langNo) {
		this.langNo = langNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getLangCategory() {
		return langCategory;
	}

	public void setLangCategory(String langCategory) {
		this.langCategory = langCategory;
	}

	public String getLangName() {
		return langName;
	}

	public void setLangName(String langName) {
		this.langName = langName;
	}

	public String getLangTestDate() {
		return langTestDate;
	}

	public void setLangTestDate(String langTestDate) {
		this.langTestDate = langTestDate;
	}

	public String getLangInst() {
		return langInst;
	}

	public void setLangInst(String langInst) {
		this.langInst = langInst;
	}

	public int getLangScore() {
		return langScore;
	}

	public void setLangScore(int langScore) {
		this.langScore = langScore;
	}

	public String getLangGrade() {
		return langGrade;
	}

	public void setLangGrade(String langGrade) {
		this.langGrade = langGrade;
	}

	public String getLangEtc() {
		return langEtc;
	}

	public void setLangEtc(String langEtc) {
		this.langEtc = langEtc;
	}

	@Override
	public String toString() {
		return "Language [langNo=" + langNo + ", emplId=" + emplId + ", langCategory=" + langCategory + ", langName="
				+ langName + ", langTestDate=" + langTestDate + ", langInst=" + langInst + ", langScore=" + langScore
				+ ", langGrade=" + langGrade + ", langEtc=" + langEtc + "]";
	}
}
