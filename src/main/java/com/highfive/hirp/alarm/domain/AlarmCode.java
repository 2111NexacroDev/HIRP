package com.highfive.hirp.alarm.domain;

public class AlarmCode {
	private String emplId;
	private String alramCode;
	
	public AlarmCode() {
		
	}

	public AlarmCode(String emplId, String alramCode) {
		super();
		this.emplId = emplId;
		this.alramCode = alramCode;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getAlramCode() {
		return alramCode;
	}

	public void setAlramCode(String alramCode) {
		this.alramCode = alramCode;
	}

	@Override
	public String toString() {
		return "AlramCode [emplId=" + emplId + ", alramCode=" + alramCode + "]";
	}
	
	
}
