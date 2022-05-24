package com.highfive.hirp.time.user.domain;

import java.sql.Date;

public class TimeModify {
	private int timemNo;
	private int timeNo;
	private String timemDepartment;
	private String emplId;
	private String timemName;
	private String timemTitle;
	private Date timemStart;
	private Date timemEnd;
	private String timemContent;
	private Date timemDate;
	private String timemBefore;
	private String timemAfter;
	
	public TimeModify() {}

	public TimeModify(int timemNo, int timeNo, String timemDepartment, String emplId, String timemName,
			String timemTitle, Date timemStart, Date timemEnd, String timemContent, Date timemDate, String timemBefore,
			String timemAfter) {
		super();
		this.timemNo = timemNo;
		this.timeNo = timeNo;
		this.timemDepartment = timemDepartment;
		this.emplId = emplId;
		this.timemName = timemName;
		this.timemTitle = timemTitle;
		this.timemStart = timemStart;
		this.timemEnd = timemEnd;
		this.timemContent = timemContent;
		this.timemDate = timemDate;
		this.timemBefore = timemBefore;
		this.timemAfter = timemAfter;
	}

	public int getTimemNo() {
		return timemNo;
	}

	public void setTimemNo(int timemNo) {
		this.timemNo = timemNo;
	}

	public int getTimeNo() {
		return timeNo;
	}

	public void setTimeNo(int timeNo) {
		this.timeNo = timeNo;
	}

	public String getTimemDepartment() {
		return timemDepartment;
	}

	public void setTimemDepartment(String timemDepartment) {
		this.timemDepartment = timemDepartment;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getTimemName() {
		return timemName;
	}

	public void setTimemName(String timemName) {
		this.timemName = timemName;
	}

	public String getTimemTitle() {
		return timemTitle;
	}

	public void setTimemTitle(String timemTitle) {
		this.timemTitle = timemTitle;
	}

	public Date getTimemStart() {
		return timemStart;
	}

	public void setTimemStart(Date timemStart) {
		this.timemStart = timemStart;
	}

	public Date getTimemEnd() {
		return timemEnd;
	}

	public void setTimemEnd(Date timemEnd) {
		this.timemEnd = timemEnd;
	}

	public String getTimemContent() {
		return timemContent;
	}

	public void setTimemContent(String timemContent) {
		this.timemContent = timemContent;
	}

	public Date getTimemDate() {
		return timemDate;
	}

	public void setTimemDate(Date timemDate) {
		this.timemDate = timemDate;
	}

	public String getTimemBefore() {
		return timemBefore;
	}

	public void setTimemBefore(String timemBefore) {
		this.timemBefore = timemBefore;
	}

	public String getTimemAfter() {
		return timemAfter;
	}

	public void setTimemAfter(String timemAfter) {
		this.timemAfter = timemAfter;
	}

	@Override
	public String toString() {
		return "TimeModify [timemNo=" + timemNo + ", timeNo=" + timeNo + ", timemDepartment=" + timemDepartment
				+ ", emplId=" + emplId + ", timemName=" + timemName + ", timemTitle=" + timemTitle + ", timemStart="
				+ timemStart + ", timemEnd=" + timemEnd + ", timemContent=" + timemContent + ", timemDate=" + timemDate
				+ ", timemBefore=" + timemBefore + ", timemAfter=" + timemAfter + "]";
	}
}