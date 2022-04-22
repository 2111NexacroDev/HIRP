package com.highfive.hirp.alram.domain;

public class AlramCode {
	private String emplId;
	private String alramCode;
	
	public AlramCode() {
		
	}

	public AlramCode(String emplId, String alramCode) {
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
