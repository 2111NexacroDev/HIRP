package com.highfive.hirp.approval.user.domain;

public class Reference {

	private int referenceNo;
	private int docNo;
	private String isComplete;
	private String emplId;
	private String isReference;
	
	public Reference() {}

	public Reference(int referenceNo, int docNo, String isComplete, String emplId, String isReference) {
		super();
		this.referenceNo = referenceNo;
		this.docNo = docNo;
		this.isComplete = isComplete;
		this.emplId = emplId;
		this.isReference = isReference;
	}

	public int getReferenceNo() {
		return referenceNo;
	}

	public void setReferenceNo(int referenceNo) {
		this.referenceNo = referenceNo;
	}

	public int getDocNo() {
		return docNo;
	}

	public void setDocNo(int docNo) {
		this.docNo = docNo;
	}

	public String getIsComplete() {
		return isComplete;
	}

	public void setIsComplete(String isComplete) {
		this.isComplete = isComplete;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getIsReference() {
		return isReference;
	}

	public void setIsReference(String isReference) {
		this.isReference = isReference;
	}

	@Override
	public String toString() {
		return "Reference [referenceNo=" + referenceNo + ", docNo=" + docNo + ", isComplete=" + isComplete + ", emplId="
				+ emplId + ", isReference=" + isReference + "]";
	}
	
	
}
