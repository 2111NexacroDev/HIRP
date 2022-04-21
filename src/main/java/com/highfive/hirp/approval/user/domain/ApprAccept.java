package com.highfive.hirp.approval.user.domain;

import java.sql.Date;

public class ApprAccept {
	private int acceptNo;
	private int docNo;
	private String emplId;
	private int apprLevel;
	private String status;
	private String apprComment;
	private Date apprDate;
	
	public ApprAccept() {}

	public ApprAccept(int acceptNo, int docNo, String emplId, int apprLevel, String status, String apprComment,
			Date apprDate) {
		super();
		this.acceptNo = acceptNo;
		this.docNo = docNo;
		this.emplId = emplId;
		this.apprLevel = apprLevel;
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

	public int getDocNo() {
		return docNo;
	}

	public void setDocNo(int docNo) {
		this.docNo = docNo;
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
		return "ApprAccept [acceptNo=" + acceptNo + ", docNo=" + docNo + ", emplId=" + emplId + ", apprLevel="
				+ apprLevel + ", status=" + status + ", apprComment=" + apprComment + ", apprDate=" + apprDate + "]";
	}
	
	
	
	
}
