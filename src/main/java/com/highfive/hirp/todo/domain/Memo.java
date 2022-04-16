package com.highfive.hirp.todo.domain;

import java.sql.Date;

public class Memo {
	private int memoNo;
	private String emplId;
	private Date enrollDate;
	private String memoConts;

	public Memo() {
	}

	public Memo(int memoNo, String emplId, Date enrollDate, String memoConts) {
		super();
		this.memoNo = memoNo;
		this.emplId = emplId;
		this.enrollDate = enrollDate;
		this.memoConts = memoConts;
	}

	public int getMemoNo() {
		return memoNo;
	}

	public void setMemoNo(int memoNo) {
		this.memoNo = memoNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public Date getEnrollDate() {
		return enrollDate;
	}

	public void setEnrollDate(Date enrollDate) {
		this.enrollDate = enrollDate;
	}

	public String getMemoConts() {
		return memoConts;
	}

	public void setMemoConts(String memoConts) {
		this.memoConts = memoConts;
	}

	@Override
	public String toString() {
		return "Memo [memoNo=" + memoNo + ", emplId=" + emplId + ", enrollDate=" + enrollDate + ", memoConts="
				+ memoConts + "]";
	}
}
