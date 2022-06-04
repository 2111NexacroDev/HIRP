package com.highfive.hirp.approval.user.domain;

public class Reference {

	private int refNo;
	private int apprNo;
	private String emplId;
	private String refType;
	
	public Reference() {}

	public int getRefNo() {
		return refNo;
	}

	public void setRefNo(int refNo) {
		this.refNo = refNo;
	}

	public int getApprNo() {
		return apprNo;
	}

	public void setApprNo(int apprNo) {
		this.apprNo = apprNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getRefType() {
		return refType;
	}

	public void setRefType(String refType) {
		this.refType = refType;
	}

	@Override
	public String toString() {
		return "Reference [refNo=" + refNo + ", apprNo=" + apprNo + ", emplId=" + emplId + ", refType=" + refType + "]";
	}


	
	
}
