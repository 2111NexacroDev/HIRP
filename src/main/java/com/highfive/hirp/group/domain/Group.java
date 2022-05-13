package com.highfive.hirp.group.domain;

public class Group {
	private String emplProfile;
	private String emplName;
	private String emplId;
	private String deptCode;
	private String positionCode;
	private String directNo;
	private String email;
	private String phoneNo;
	private String birthday;

	public Group() {}

	public Group(String emplProfile, String emplName, String emplId, String deptCode, String positionCode,
			String directNo, String email, String phoneNo, String birthday) {
		super();
		this.emplProfile = emplProfile;
		this.emplName = emplName;
		this.emplId = emplId;
		this.deptCode = deptCode;
		this.positionCode = positionCode;
		this.directNo = directNo;
		this.email = email;
		this.phoneNo = phoneNo;
		this.birthday = birthday;
	}

	public String getEmplProfile() {
		return emplProfile;
	}

	public void setEmplProfile(String emplProfile) {
		this.emplProfile = emplProfile;
	}

	public String getEmplName() {
		return emplName;
	}

	public void setEmplName(String emplName) {
		this.emplName = emplName;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getPositionCode() {
		return positionCode;
	}

	public void setPositionCode(String positionCode) {
		this.positionCode = positionCode;
	}

	public String getDirectNo() {
		return directNo;
	}

	public void setDirectNo(String directNo) {
		this.directNo = directNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	@Override
	public String toString() {
		return "Group [emplProfile=" + emplProfile + ", emplName=" + emplName + ", emplId=" + emplId + ", deptCode="
				+ deptCode + ", positionCode=" + positionCode + ", directNo=" + directNo + ", email=" + email
				+ ", phoneNo=" + phoneNo + ", birthday=" + birthday + "]";
	}
}