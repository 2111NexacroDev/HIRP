package com.highfive.hirp.approval.domain;

import java.sql.Date;

public class ApprForm {

	private int formNo;
	private String formTitle;
	private String formContents;
	private Date writeDate;
	private String status;
	
	public ApprForm() {}

	public ApprForm(int formNo, String formTitle, String formContents, Date writeDate, String status) {
		super();
		this.formNo = formNo;
		this.formTitle = formTitle;
		this.formContents = formContents;
		this.writeDate = writeDate;
		this.status = status;
	}

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

	@Override
	public String toString() {
		return "ApprForm [formNo=" + formNo + ", formTitle=" + formTitle + ", formContents=" + formContents
				+ ", writeDate=" + writeDate + ", status=" + status + "]";
	}

	
}
