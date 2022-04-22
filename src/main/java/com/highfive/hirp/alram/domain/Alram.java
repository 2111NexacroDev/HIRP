package com.highfive.hirp.alram.domain;

import java.sql.Date;

public class Alram {
	private int alramNo;
	private String emplId;
	private Date alramDate;
	private String alramContents;
	private String alramCode;
	private String alramStatus;
	
	public Alram() {}
	
	public Alram(int alramNo, String emplId, Date alramDate, String alramContents, String alramCode,
			String alramStatus) {
		super();
		this.alramNo = alramNo;
		this.emplId = emplId;
		this.alramDate = alramDate;
		this.alramContents = alramContents;
		this.alramCode = alramCode;
		this.alramStatus = alramStatus;
	}
	
	public int getAlramNo() {
		return alramNo;
	}

	public void setAlramNo(int alramNo) {
		this.alramNo = alramNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public Date getAlramDate() {
		return alramDate;
	}

	public void setAlramDate(Date alramDate) {
		this.alramDate = alramDate;
	}

	public String getAlramContents() {
		return alramContents;
	}

	public void setAlramContents(String alramContents) {
		this.alramContents = alramContents;
	}

	public String getAlramCode() {
		return alramCode;
	}

	public void setAlramCode(String alramCode) {
		this.alramCode = alramCode;
	}

	public String getAlramStatus() {
		return alramStatus;
	}

	public void setAlramStatus(String alramStatus) {
		this.alramStatus = alramStatus;
	}

	@Override
	public String toString() {
		return "Alram [alramNo=" + alramNo + ", emplId=" + emplId + ", alramDate=" + alramDate + ", alramContents="
				+ alramContents + ", alramCode=" + alramCode + ", alramStatus=" + alramStatus + "]";
	}
	
	
	
}
