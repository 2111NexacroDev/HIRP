package com.highfive.hirp.schedule.domain;

import java.sql.Date;

public class Schedule {
	private int scheduleNo;
	private String emplId;
	private String scheduleCategory;
	private String scheduleColor;
	private String scheduleConts;
	private Date scheduleStartDate;
	private Date scheduleEndDate;
	private String schedulePlace;
	private String scheduleAlarm;

	public Schedule() {
	}

	public Schedule(int scheduleNo, String emplId, String scheduleCategory, String scheduleColor, String scheduleConts,
			Date scheduleStartDate, Date scheduleEndDate, String schedulePlace, String scheduleAlarm) {
		super();
		this.scheduleNo = scheduleNo;
		this.emplId = emplId;
		this.scheduleCategory = scheduleCategory;
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

	public Date getScheduleStartDate() {
		return scheduleStartDate;
	}

	public void setScheduleStartDate(Date scheduleStartDate) {
		this.scheduleStartDate = scheduleStartDate;
	}

	public Date getScheduleEndDate() {
		return scheduleEndDate;
	}

	public void setScheduleEndDate(Date scheduleEndDate) {
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
				+ ", scheduleColor=" + scheduleColor + ", scheduleConts=" + scheduleConts + ", scheduleStartDate="
				+ scheduleStartDate + ", scheduleEndDate=" + scheduleEndDate + ", schedulePlace=" + schedulePlace
				+ ", scheduleAlarm=" + scheduleAlarm + "]";
	}
}
