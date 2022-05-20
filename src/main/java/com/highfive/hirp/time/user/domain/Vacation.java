package com.highfive.hirp.time.user.domain;

import java.sql.Date;

public class Vacation {
	private int vacationNo;
	private String emplId;
	private String vacationName;
	private String vacationDepartment;
	private String vacationDivision;
	private Date vacationStart;
	private Date vacationEnd;
	private String vacationContent;
	private String vacationState;
	
	public Vacation () {}

	public Vacation(int vacationNo, String emplId, String vacationName, String vacationDepartment,
			String vacationDivision, Date vacationStart, Date vacationEnd, String vacationContent,
			String vacationState) {
		super();
		this.vacationNo = vacationNo;
		this.emplId = emplId;
		this.vacationName = vacationName;
		this.vacationDepartment = vacationDepartment;
		this.vacationDivision = vacationDivision;
		this.vacationStart = vacationStart;
		this.vacationEnd = vacationEnd;
		this.vacationContent = vacationContent;
		this.vacationState = vacationState;
	}

	public int getVacationNo() {
		return vacationNo;
	}

	public void setVacationNo(int vacationNo) {
		this.vacationNo = vacationNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getVacationName() {
		return vacationName;
	}

	public void setVacationName(String vacationName) {
		this.vacationName = vacationName;
	}

	public String getVacationDepartment() {
		return vacationDepartment;
	}

	public void setVacationDepartment(String vacationDepartment) {
		this.vacationDepartment = vacationDepartment;
	}

	public String getVacationDivision() {
		return vacationDivision;
	}

	public void setVacationDivision(String vacationDivision) {
		this.vacationDivision = vacationDivision;
	}

	public Date getVacationStart() {
		return vacationStart;
	}

	public void setVacationStart(Date vacationStart) {
		this.vacationStart = vacationStart;
	}

	public Date getVacationEnd() {
		return vacationEnd;
	}

	public void setVacationEnd(Date vacationEnd) {
		this.vacationEnd = vacationEnd;
	}

	public String getVacationContent() {
		return vacationContent;
	}

	public void setVacationContent(String vacationContent) {
		this.vacationContent = vacationContent;
	}

	public String getVacationState() {
		return vacationState;
	}

	public void setVacationState(String vacationState) {
		this.vacationState = vacationState;
	}

	@Override
	public String toString() {
		return "Vacation [vacationNo=" + vacationNo + ", emplId=" + emplId + ", vacationName=" + vacationName
				+ ", vacationDepartment=" + vacationDepartment + ", vacationDivision=" + vacationDivision
				+ ", vacationStart=" + vacationStart + ", vacationEnd=" + vacationEnd + ", vacationContent="
				+ vacationContent + ", vacationState=" + vacationState + "]";
	}
	
	
}
