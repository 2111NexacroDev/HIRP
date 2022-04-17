package com.highfive.hirp.employee.domain;

import java.sql.Date;

public class Certification {
	private int certNo;
	private String emplId;
	private String certCategory;
	private String certName;
	private String certEnrollNo;
	private String certLevel;
	private String certInst;
	private Date certStartDate;
	private Date certEndDate;

	public Certification() {
	}

	public Certification(int certNo, String emplId, String certCategory, String certName, String certEnrollNo,
			String certLevel, String certInst, Date certStartDate, Date certEndDate) {
		super();
		this.certNo = certNo;
		this.emplId = emplId;
		this.certCategory = certCategory;
		this.certName = certName;
		this.certEnrollNo = certEnrollNo;
		this.certLevel = certLevel;
		this.certInst = certInst;
		this.certStartDate = certStartDate;
		this.certEndDate = certEndDate;
	}

	public int getCertNo() {
		return certNo;
	}

	public void setCertNo(int certNo) {
		this.certNo = certNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getCertCategory() {
		return certCategory;
	}

	public void setCertCategory(String certCategory) {
		this.certCategory = certCategory;
	}

	public String getCertName() {
		return certName;
	}

	public void setCertName(String certName) {
		this.certName = certName;
	}

	public String getCertEnrollNo() {
		return certEnrollNo;
	}

	public void setCertEnrollNo(String certEnrollNo) {
		this.certEnrollNo = certEnrollNo;
	}

	public String getCertLevel() {
		return certLevel;
	}

	public void setCertLevel(String certLevel) {
		this.certLevel = certLevel;
	}

	public String getCertInst() {
		return certInst;
	}

	public void setCertInst(String certInst) {
		this.certInst = certInst;
	}

	public Date getCertStartDate() {
		return certStartDate;
	}

	public void setCertStartDate(Date certStartDate) {
		this.certStartDate = certStartDate;
	}

	public Date getCertEndDate() {
		return certEndDate;
	}

	public void setCertEndDate(Date certEndDate) {
		this.certEndDate = certEndDate;
	}

	@Override
	public String toString() {
		return "Certification [certNo=" + certNo + ", emplId=" + emplId + ", certCategory=" + certCategory
				+ ", certName=" + certName + ", certEnrollNo=" + certEnrollNo + ", certLevel=" + certLevel
				+ ", certInst=" + certInst + ", certStartDate=" + certStartDate + ", certEndDate=" + certEndDate + "]";
	}
}
