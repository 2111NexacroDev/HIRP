package com.highfive.hirp.position.domain;

public class Position {
	private String positionCode;
	private String positionName;
	private int positionUseManager;
	private int positionSequence;
	private int positionLevel;
	
	public Position() {}

	public Position(String positionCode, String positionName) {
		super();
		this.positionCode = positionCode;
		this.positionName = positionName;
	}

	public Position(String positionCode, String positionName, int positionUseManager, int positionSequence,
			int positionLevel) {
		super();
		this.positionCode = positionCode;
		this.positionName = positionName;
		this.positionUseManager = positionUseManager;
		this.positionSequence = positionSequence;
		this.positionLevel = positionLevel;
	}

	public String getPositionCode() {
		return positionCode;
	}

	public void setPositionCode(String positionCode) {
		this.positionCode = positionCode;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public int getPositionUseManager() {
		return positionUseManager;
	}

	public void setPositionUseManager(int positionUseManager) {
		this.positionUseManager = positionUseManager;
	}

	public int getPositionSequence() {
		return positionSequence;
	}

	public void setPositionSequence(int positionSequence) {
		this.positionSequence = positionSequence;
	}

	public int getPositionLevel() {
		return positionLevel;
	}

	public void setPositionLevel(int positionLevel) {
		this.positionLevel = positionLevel;
	}

	@Override
	public String toString() {
		return "Position [positionCode=" + positionCode + ", positionName=" + positionName + ", positionUseManager="
				+ positionUseManager + ", positionSequence=" + positionSequence + ", positionLevel=" + positionLevel
				+ "]";
	}

}
