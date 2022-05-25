package com.highfive.hirp.approval.user.domain;

import java.sql.Date;
import java.util.List;

import com.highfive.hirp.employee.domain.Employee;

public class ApprAccept {
	private int acceptNo;
	private int apprNo;
	private String emplId;
	private int apprLevel;
	private String apprType;
	private String status;
	private String apprComment;
	private Date apprDate;
	private Employee employee;
	
	public ApprAccept() {}

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

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	@Override
	public String toString() {
		return "ApprAccept [acceptNo=" + acceptNo + ", apprNo=" + apprNo + ", emplId=" + emplId + ", apprLevel="
				+ apprLevel + ", apprType=" + apprType + ", status=" + status + ", apprComment=" + apprComment
				+ ", apprDate=" + apprDate + ", employee=" + employee + "]";
	}

}
