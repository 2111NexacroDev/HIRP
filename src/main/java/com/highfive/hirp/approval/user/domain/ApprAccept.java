package com.highfive.hirp.approval.user.domain;

import java.sql.Date;

public class ApprAccept {
	private int acceptNo;
	private int apprNo;
	private String emplId;
	private int apprLevel;
	private String apprType;
	private String status;
	private String apprComment;
	private Date apprDate;
	
	public ApprAccept() {}

	public ApprAccept(int acceptNo, int apprNo, String emplId, int apprLevel, String apprType, String status,
			String apprComment, Date apprDate) {
		super();
		this.acceptNo = acceptNo;
		this.apprNo = apprNo;
		this.emplId = emplId;
		this.apprLevel = apprLevel;
		this.apprType = apprType;
		this.status = status;
		this.apprComment = apprComment;
		this.apprDate = apprDate;
	}

	public int getAcceptNo() {
		return acceptNo;
	}

	public void setAcceptNo(int acceptNo) {
		this.acceptNo = acceptNo;
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

	public int getApprLevel() {
		return apprLevel;
	}

	public void setApprLevel(int apprLevel) {
		this.apprLevel = apprLevel;
	}

	public String getApprType() {
		return apprType;
	}

	public void setApprType(String apprType) {
		this.apprType = apprType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getApprComment() {
		return apprComment;
	}

	public void setApprComment(String apprComment) {
		this.apprComment = apprComment;
	}

	public Date getApprDate() {
		return apprDate;
	}

	public void setApprDate(Date apprDate) {
		this.apprDate = apprDate;
	}

	@Override
	public String toString() {
		return "ApprAccept [acceptNo=" + acceptNo + ", apprNo=" + apprNo + ", emplId=" + emplId + ", apprLevel="
				+ apprLevel + ", apprType=" + apprType + ", status=" + status + ", apprComment=" + apprComment
				+ ", apprDate=" + apprDate + "]";
	}

	
	
	
}
