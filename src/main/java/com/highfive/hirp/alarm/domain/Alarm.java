package com.highfive.hirp.alarm.domain;


public class Alarm {
	private int alarmNo;
	private String emplId; //받는 사람
	private String alarmDate;
	private String alarmContents;
	private String alarmCode;
	private String alarmStatus;
	private String alarmSendid; //보낸 사람
	//보낸 사람 정보
	private String emplName;
	private String deptName;
	private String positionName;
	private String emplProfile;
	
	public Alarm() {}

	public Alarm(int alarmNo, String emplId, String alarmDate, String alarmContents, String alarmCode,
			String alarmStatus, String alarmSendid, String emplName, String deptName, String positionName,
			String emplProfile) {
		super();
		this.alarmNo = alarmNo;
		this.emplId = emplId;
		this.alarmDate = alarmDate;
		this.alarmContents = alarmContents;
		this.alarmCode = alarmCode;
		this.alarmStatus = alarmStatus;
		this.alarmSendid = alarmSendid;
		this.emplName = emplName;
		this.deptName = deptName;
		this.positionName = positionName;
		this.emplProfile = emplProfile;
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

	public String getAlarmDate() {
		return alarmDate;
	}

	public void setAlarmDate(String alarmDate) {
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

	public String getAlarmSendid() {
		return alarmSendid;
	}

	public void setAlarmSendid(String alarmSendid) {
		this.alarmSendid = alarmSendid;
	}

	public String getEmplName() {
		return emplName;
	}

	public void setEmplName(String emplName) {
		this.emplName = emplName;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public String getEmplProfile() {
		return emplProfile;
	}

	public void setEmplProfile(String emplProfile) {
		this.emplProfile = emplProfile;
	}

	@Override
	public String toString() {
		return "Alarm [alarmNo=" + alarmNo + ", emplId=" + emplId + ", alarmDate=" + alarmDate + ", alarmContents="
				+ alarmContents + ", alarmCode=" + alarmCode + ", alarmStatus=" + alarmStatus + ", alarmSendid="
				+ alarmSendid + ", emplName=" + emplName + ", deptName=" + deptName + ", positionName=" + positionName
				+ ", emplProfile=" + emplProfile + "]";
	}
	
	
}
