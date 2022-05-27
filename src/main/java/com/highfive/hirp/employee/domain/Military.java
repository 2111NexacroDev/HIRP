package com.highfive.hirp.employee.domain;

public class Military {
	private int militaryNo;
	private String emplId;
	private String militaryGrade;
	private String militaryCode;
	private String isMilitaryEnd;
	private String militaryStartDate;
	private String militaryEndDate;
	private String militaryEtc;

	public Military() {
	}

	public Military(int militaryNo, String emplId, String militaryGrade, String militaryCode, String isMilitaryEnd,
			String militaryStartDate, String militaryEndDate, String militaryEtc) {
		super();
		this.militaryNo = militaryNo;
		this.emplId = emplId;
		this.militaryGrade = militaryGrade;
		this.militaryCode = militaryCode;
		this.isMilitaryEnd = isMilitaryEnd;
		this.militaryStartDate = militaryStartDate;
		this.militaryEndDate = militaryEndDate;
		this.militaryEtc = militaryEtc;
	}

	public int getMilitaryNo() {
		return militaryNo;
	}

	public void setMilitaryNo(int militaryNo) {
		this.militaryNo = militaryNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getMilitaryGrade() {
		return militaryGrade;
	}

	public void setMilitaryGrade(String militaryGrade) {
		this.militaryGrade = militaryGrade;
	}

	public String getMilitaryCode() {
		return militaryCode;
	}

	public void setMilitaryCode(String militaryCode) {
		this.militaryCode = militaryCode;
	}

	public String getIsMilitaryEnd() {
		return isMilitaryEnd;
	}

	public void setIsMilitaryEnd(String isMilitaryEnd) {
		this.isMilitaryEnd = isMilitaryEnd;
	}

	public String getMilitaryStartDate() {
		return militaryStartDate;
	}

	public void setMilitaryStartDate(String militaryStartDate) {
		this.militaryStartDate = militaryStartDate;
	}

	public String getMilitaryEndDate() {
		return militaryEndDate;
	}

	public void setMilitaryEndDate(String militaryEndDate) {
		this.militaryEndDate = militaryEndDate;
	}

	public String getMilitaryEtc() {
		return militaryEtc;
	}

	public void setMilitaryEtc(String militaryEtc) {
		this.militaryEtc = militaryEtc;
	}

	@Override
	public String toString() {
		return "Military [militaryNo=" + militaryNo + ", emplId=" + emplId + ", militaryGrade=" + militaryGrade
				+ ", militaryCode=" + militaryCode + ", isMilitaryEnd=" + isMilitaryEnd + ", militaryStartDate="
				+ militaryStartDate + ", militaryEndDate=" + militaryEndDate + ", militaryEtc=" + militaryEtc + "]";
	}
}
