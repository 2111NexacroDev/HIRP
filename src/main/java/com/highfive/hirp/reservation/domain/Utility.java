package com.highfive.hirp.reservation.domain;

public class Utility {
	private int utilityNo;
	private String utilityName;
	private String utilityCategory;
	private String utilityConts;

	public Utility() {
	}

	public Utility(int utilityNo, String utilityName, String utilityCategory, String utilityConts) {
		super();
		this.utilityNo = utilityNo;
		this.utilityName = utilityName;
		this.utilityCategory = utilityCategory;
		this.utilityConts = utilityConts;
	}

	public int getUtilityNo() {
		return utilityNo;
	}

	public void setUtilityNo(int utilityNo) {
		this.utilityNo = utilityNo;
	}

	public String getUtilityName() {
		return utilityName;
	}

	public void setUtilityName(String utilityName) {
		this.utilityName = utilityName;
	}

	public String getUtilityCategory() {
		return utilityCategory;
	}

	public void setUtilityCategory(String utilityCategory) {
		this.utilityCategory = utilityCategory;
	}

	public String getUtilityConts() {
		return utilityConts;
	}

	public void setUtilityConts(String utilityConts) {
		this.utilityConts = utilityConts;
	}

	@Override
	public String toString() {
		return "Utility [utilityNo=" + utilityNo + ", utilityName=" + utilityName + ", utilityCategory="
				+ utilityCategory + ", utilityConts=" + utilityConts + "]";
	}
}
