package com.highfive.hirp.schedule.domain;

import java.sql.Date;

public class Schedule {
	private int scheduleNo;
	private String emplId;
	private String scheduleCategory;
	private String scheduleTitle;
	private String scheduleColor;
	private String scheduleConts;
	private String scheduleStartDate;
	private String scheduleEndDate;
	private String schedulePlace;
	private String scheduleAlarm;

	public Schedule() {
	}

	public Schedule(int scheduleNo, String emplId, String scheduleCategory, String scheduleTitle, String scheduleColor,
			String scheduleConts, String scheduleStartDate, String scheduleEndDate, String schedulePlace,
			String scheduleAlarm) {
		super();
		this.scheduleNo = scheduleNo;
		this.emplId = emplId;
		this.scheduleCategory = scheduleCategory;
		this.scheduleTitle = scheduleTitle;
		this.scheduleColor = scheduleColor;
		this.scheduleConts = scheduleConts;
		this.scheduleStartDate = scheduleStartDate;
		this.scheduleEndDate = scheduleEndDate;
		this.schedulePlace = schedulePlace;
		this.scheduleAlarm = scheduleAlarm;
	}

	public int getScheduleNo() {
		return scheduleNo;
	}

	public void setScheduleNo(int scheduleNo) {
		this.scheduleNo = scheduleNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getScheduleCategory() {
		return scheduleCategory;
	}

	public void setScheduleCategory(String scheduleCategory) {
		this.scheduleCategory = scheduleCategory;
	}

	public String getScheduleTitle() {
		return scheduleTitle;
	}

	public void setScheduleTitle(String scheduleTitle) {
		this.scheduleTitle = scheduleTitle;
	}

	public String getScheduleColor() {
		return scheduleColor;
	}

	public void setScheduleColor(String scheduleColor) {
		this.scheduleColor = scheduleColor;
	}

	public String getScheduleConts() {
		return scheduleConts;
	}

	public void setScheduleConts(String scheduleConts) {
		this.scheduleConts = scheduleConts;
	}

	public String getScheduleStartDate() {
		return scheduleStartDate;
	}

	public void setScheduleStartDate(String scheduleStartDate) {
		this.scheduleStartDate = scheduleStartDate;
	}

	public String getScheduleEndDate() {
		return scheduleEndDate;
	}

	public void setScheduleEndDate(String scheduleEndDate) {
		this.scheduleEndDate = scheduleEndDate;
	}

	public String getSchedulePlace() {
		return schedulePlace;
	}

	public void setSchedulePlace(String schedulePlace) {
		this.schedulePlace = schedulePlace;
	}

	public String getScheduleAlarm() {
		return scheduleAlarm;
	}

	public void setScheduleAlarm(String scheduleAlarm) {
		this.scheduleAlarm = scheduleAlarm;
	}

	@Override
	public String toString() {
		return "Schedule [scheduleNo=" + scheduleNo + ", emplId=" + emplId + ", scheduleCategory=" + scheduleCategory
				+ ", scheduleTitle=" + scheduleTitle + ", scheduleColor=" + scheduleColor + ", scheduleConts="
				+ scheduleConts + ", scheduleStartDate=" + scheduleStartDate + ", scheduleEndDate=" + scheduleEndDate
				+ ", schedulePlace=" + schedulePlace + ", scheduleAlarm=" + scheduleAlarm + "]";
	}
}
