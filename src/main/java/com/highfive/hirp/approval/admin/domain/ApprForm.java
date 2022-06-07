package com.highfive.hirp.approval.admin.domain;

import java.sql.Date;

public class ApprForm {

	private int formNo;
	private String formTitle;
	private String formContents;
	private Date writeDate;
	private String status;
	private String emplId;
	
	public ApprForm() {}

	public int getFormNo() {
		return formNo;
	}

	public void setFormNo(int formNo) {
		this.formNo = formNo;
	}

	public String getFormTitle() {
		return formTitle;
	}

	public void setFormTitle(String formTitle) {
		this.formTitle = formTitle;
	}

	public String getFormContents() {
		return formContents;
	}

	public void setFormContents(String formContents) {
		this.formContents = formContents;
	}

	public Date getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	@Override
	public String toString() {
		return "ApprForm [formNo=" + formNo + ", formTitle=" + formTitle + ", formContents=" + formContents
				+ ", writeDate=" + writeDate + ", status=" + status + ", emplId=" + emplId + "]";
	}

	
	
}
