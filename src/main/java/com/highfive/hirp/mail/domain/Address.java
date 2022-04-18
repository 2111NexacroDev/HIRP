package com.highfive.hirp.mail.domain;
// 주소록
public class Address {
	private int addressNo;
	private String group;
	private String groupName;
	private String emplId;
	
	public Address () {}

	public Address(int addressNo, String group, String groupName, String emplId) {
		super();
		this.addressNo = addressNo;
		this.group = group;
		this.groupName = groupName;
		this.emplId = emplId;
	}

	public int getAddressNo() {
		return addressNo;
	}

	public void setAddressNo(int addressNo) {
		this.addressNo = addressNo;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	@Override
	public String toString() {
		return "Address [addressNo=" + addressNo + ", group=" + group + ", groupName=" + groupName + ", emplId="
				+ emplId + "]";
	}
	
}
