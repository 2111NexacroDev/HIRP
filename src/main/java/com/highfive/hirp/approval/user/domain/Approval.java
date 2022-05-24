package com.highfive.hirp.approval.user.domain;

import java.sql.Date;
import java.util.List;

import com.highfive.hirp.employee.domain.Employee;

public class Approval {
	private int apprNo;
	private String formNo;
	private String emplId;
	private String apprTitle;
	private String apprContents;
	private String apprStatus;
	private Date writeDate;
	private String temporaryStorage;
	private String docNo;
	private List<ApprAccept> aList;
	private List<ApprAttachedFile> fList;
	
	
	
	public Approval() {}



	public int getApprNo() {
		return apprNo;
	}



	public void setApprNo(int apprNo) {
		this.apprNo = apprNo;
	}



	public String getFormNo() {
		return formNo;
	}



	public void setFormNo(String formNo) {
		this.formNo = formNo;
	}



	public String getEmplId() {
		return emplId;
	}



	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}



	public String getApprTitle() {
		return apprTitle;
	}



	public void setApprTitle(String apprTitle) {
		this.apprTitle = apprTitle;
	}



	public String getApprContents() {
		return apprContents;
	}



	public void setApprContents(String apprContents) {
		this.apprContents = apprContents;
	}



	public String getApprStatus() {
		return apprStatus;
	}



	public void setApprStatus(String apprStatus) {
		this.apprStatus = apprStatus;
	}



	public Date getWriteDate() {
		return writeDate;
	}



	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}



	public String getTemporaryStorage() {
		return temporaryStorage;
	}



	public void setTemporaryStorage(String temporaryStorage) {
		this.temporaryStorage = temporaryStorage;
	}



	public String getDocNo() {
		return docNo;
	}



	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}



	public List<ApprAccept> getaList() {
		return aList;
	}



	public void setaList(List<ApprAccept> aList) {
		this.aList = aList;
	}



	public List<ApprAttachedFile> getfList() {
		return fList;
	}



	public void setfList(List<ApprAttachedFile> fList) {
		this.fList = fList;
	}



	@Override
	public String toString() {
		return "Approval [apprNo=" + apprNo + ", formNo=" + formNo + ", emplId=" + emplId + ", apprTitle=" + apprTitle
				+ ", apprContents=" + apprContents + ", apprStatus=" + apprStatus + ", writeDate=" + writeDate
				+ ", temporaryStorage=" + temporaryStorage + ", docNo=" + docNo + ", aList=" + aList + ", fList="
				+ fList + "]";
	}


}
