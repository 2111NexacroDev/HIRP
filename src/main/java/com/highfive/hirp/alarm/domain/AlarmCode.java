package com.highfive.hirp.alarm.domain;

public class AlarmCode {
	private String emplId;
	private String alarmCode;
	
	public AlarmCode() {
		
	}

	public AlarmCode(String emplId, String alramCode) {
		super();
		this.emplId = emplId;
		this.alarmCode = alramCode;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getAlramCode() {
		return alarmCode;
	}

	public void setAlramCode(String alramCode) {
		this.alarmCode = alramCode;
	}

	@Override
	public String toString() {
		return "AlramCode [emplId=" + emplId + ", alramCode=" + alarmCode + "]";
	}
	
	
}
