package com.highfive.hirp.employee.domain;

import java.sql.Date;

public class JobRole {
	private int jobRoleNo;
	private String emplId;
	private String jobRoleDivision;
	private String jobRoleTitle;
	private Date jobRoleStartDate;
	private Date jobRoleEndDate;
	private String jobRoleConts;
	private String jobRoleEtc;

	public JobRole() {
	}

	public JobRole(int jobRoleNo, String emplId, String jobRoleDivision, String jobRoleTitle, Date jobRoleStartDate,
			Date jobRoleEndDate, String jobRoleConts, String jobRoleEtc) {
		super();
		this.jobRoleNo = jobRoleNo;
		this.emplId = emplId;
		this.jobRoleDivision = jobRoleDivision;
		this.jobRoleTitle = jobRoleTitle;
		this.jobRoleStartDate = jobRoleStartDate;
		this.jobRoleEndDate = jobRoleEndDate;
		this.jobRoleConts = jobRoleConts;
		this.jobRoleEtc = jobRoleEtc;
	}

	public int getJobRoleNo() {
		return jobRoleNo;
	}

	public void setJobRoleNo(int jobRoleNo) {
		this.jobRoleNo = jobRoleNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getJobRoleDivision() {
		return jobRoleDivision;
	}

	public void setJobRoleDivision(String jobRoleDivision) {
		this.jobRoleDivision = jobRoleDivision;
	}

	public String getJobRoleTitle() {
		return jobRoleTitle;
	}

	public void setJobRoleTitle(String jobRoleTitle) {
		this.jobRoleTitle = jobRoleTitle;
	}

	public Date getJobRoleStartDate() {
		return jobRoleStartDate;
	}

	public void setJobRoleStartDate(Date jobRoleStartDate) {
		this.jobRoleStartDate = jobRoleStartDate;
	}

	public Date getJobRoleEndDate() {
		return jobRoleEndDate;
	}

	public void setJobRoleEndDate(Date jobRoleEndDate) {
		this.jobRoleEndDate = jobRoleEndDate;
	}

	public String getJobRoleConts() {
		return jobRoleConts;
	}

	public void setJobRoleConts(String jobRoleConts) {
		this.jobRoleConts = jobRoleConts;
	}

	public String getJobRoleEtc() {
		return jobRoleEtc;
	}

	public void setJobRoleEtc(String jobRoleEtc) {
		this.jobRoleEtc = jobRoleEtc;
	}

	@Override
	public String toString() {
		return "JobRole [jobRoleNo=" + jobRoleNo + ", emplId=" + emplId + ", jobRoleDivision=" + jobRoleDivision
				+ ", jobRoleTitle=" + jobRoleTitle + ", jobRoleStartDate=" + jobRoleStartDate + ", jobRoleEndDate="
				+ jobRoleEndDate + ", jobRoleConts=" + jobRoleConts + ", jobRoleEtc=" + jobRoleEtc + "]";
	}
}
