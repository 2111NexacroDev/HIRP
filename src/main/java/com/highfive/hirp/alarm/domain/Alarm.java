package com.highfive.hirp.alarm.domain;

import java.sql.Date;

public class Alarm {
	private int alarmNo;
	private String emplId;
	private Date alarmDate;
	private String alarmContents;
	private String alarmCode;
	private String alarmStatus;
	
	public Alarm() {}
	
	public Alarm(int alarmNo, String emplId, Date alarmDate, String alarmContents, String alarmCode,
			String alarmStatus) {
		super();
		this.alarmNo = alarmNo;
		this.emplId = emplId;
		this.alarmDate = alarmDate;
		this.alarmContents = alarmContents;
		this.alarmCode = alarmCode;
		this.alarmStatus = alarmStatus;
	}
	
	public int getAlarmNo() {
		return alarmNo;
	}

	public void setAlarmNo(int alarmNo) {
		this.alarmNo = alarmNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public Date getAlarmDate() {
		return alarmDate;
	}

	public void setAlarmDate(Date alarmDate) {
		this.alarmDate = alarmDate;
	}

	public String getAlarmContents() {
		return alarmContents;
	}

	public void setAlarmContents(String alarmContents) {
		this.alarmContents = alarmContents;
	}

	public String getAlarmCode() {
		return alarmCode;
	}

	public void setAlarmCode(String alarmCode) {
		this.alarmCode = alarmCode;
	}

	public String getAlarmStatus() {
		return alarmStatus;
	}

	public void setAlarmStatus(String alarmStatus) {
		this.alarmStatus = alarmStatus;
	}

	@Override
	public String toString() {
		return "Alarm [alarmNo=" + alarmNo + ", emplId=" + emplId + ", alarmDate=" + alarmDate + ", alarmContents="
				+ alarmContents + ", alarmCode=" + alarmCode + ", alarmStatus=" + alarmStatus + "]";
	}
	
	
	
}
