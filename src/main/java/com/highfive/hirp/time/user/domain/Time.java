package com.highfive.hirp.time.user.domain;

import java.sql.Date;

public class Time {
	private int timeNo;
	private String emplId;
	private Date timeDate;
	private String timeStart;
	private String timeEnd;
	private String timeState;
	private String timeContent;
	private String timeAccrue;
	
	public Time() {}

	public Time(int timeNo, String emplId, Date timeDate, String timeStart, String timeEnd, String timeState,
			String timeContent, String timeAccrue) {
		super();
		this.timeNo = timeNo;
		this.emplId = emplId;
		this.timeDate = timeDate;
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
		this.timeState = timeState;
		this.timeContent = timeContent;
		this.timeAccrue = timeAccrue;
	}

	public int getTimeNo() {
		return timeNo;
	}

	public void setTimeNo(int timeNo) {
		this.timeNo = timeNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public Date getTimeDate() {
		return timeDate;
	}

	public void setTimeDate(Date timeDate) {
		this.timeDate = timeDate;
	}

	public String getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(String timeStart) {
		this.timeStart = timeStart;
	}

	public String getTimeEnd() {
		return timeEnd;
	}

	public void setTimeEnd(String timeEnd) {
		this.timeEnd = timeEnd;
	}

	public String getTimeState() {
		return timeState;
	}

	public void setTimeState(String timeState) {
		this.timeState = timeState;
	}

	public String getTimeContent() {
		return timeContent;
	}

	public void setTimeContent(String timeContent) {
		this.timeContent = timeContent;
	}

	public String getTimeAccrue() {
		return timeAccrue;
	}

	public void setTimeAccrue(String timeAccrue) {
		this.timeAccrue = timeAccrue;
	}

	@Override
	public String toString() {
		return "Time [timeNo=" + timeNo + ", emplId=" + emplId + ", timeDate=" + timeDate + ", timeStart=" + timeStart
				+ ", timeEnd=" + timeEnd + ", timeState=" + timeState + ", timeContent=" + timeContent + ", timeAccrue="
				+ timeAccrue + "]";
	}
}