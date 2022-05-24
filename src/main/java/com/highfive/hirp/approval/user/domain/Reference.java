package com.highfive.hirp.approval.user.domain;

public class Reference {

	private int refNo;
	private int apprNo;
	private String emplId;
	private String isComplete;
	private String refType;
	
	public Reference() {}

	public Reference(int refNo, int apprNo, String emplId, String isComplete, String refType) {
		super();
		this.refNo = refNo;
		this.apprNo = apprNo;
		this.emplId = emplId;
		this.isComplete = isComplete;
		this.refType = refType;
	}

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

	public String getIsComplete() {
		return isComplete;
	}

	public void setIsComplete(String isComplete) {
		this.isComplete = isComplete;
	}

	public String getRefType() {
		return refType;
	}

	public void setRefType(String refType) {
		this.refType = refType;
	}

	@Override
	public String toString() {
		return "Reference [refNo=" + refNo + ", apprNo=" + apprNo + ", emplId=" + emplId + ", isComplete=" + isComplete
				+ ", refType=" + refType + "]";
	}

	
	
}
