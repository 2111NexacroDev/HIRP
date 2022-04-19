package com.highfive.hirp.approval.domain;

import java.sql.Date;

public class Approval {
	private int docNo;
	private String emplId;
	private int formNo;
	private String docTitle;
	private String docContents;
	private String status;
	private Date writeDate;
	private String fileName;
	private String fileRename;
	private String TemporaryStorage;
	
	public Approval() {}
	
	
	public Approval(int docNo, String emplId, int formNo, String docTitle, String docContents, String status,
			Date writeDate, String fileName, String fileRename, String temporaryStorage) {
		super();
		this.docNo = docNo;
		this.emplId = emplId;
		this.formNo = formNo;
		this.docTitle = docTitle;
		this.docContents = docContents;
		this.status = status;
		this.writeDate = writeDate;
		this.fileName = fileName;
		this.fileRename = fileRename;
		TemporaryStorage = temporaryStorage;
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

	public int getFormNo() {
		return formNo;
	}

	public void setFormNo(int formNo) {
		this.formNo = formNo;
	}

	public String getDocTitle() {
		return docTitle;
	}

	public void setDocTitle(String docTitle) {
		this.docTitle = docTitle;
	}

	public String getDocContents() {
		return docContents;
	}

	public void setDocContents(String docContents) {
		this.docContents = docContents;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileRename() {
		return fileRename;
	}

	public void setFileRename(String fileRename) {
		this.fileRename = fileRename;
	}

	public String getTemporaryStorage() {
		return TemporaryStorage;
	}

	public void setTemporaryStorage(String temporaryStorage) {
		TemporaryStorage = temporaryStorage;
	}

	@Override
	public String toString() {
		return "Approval [docNo=" + docNo + ", emplId=" + emplId + ", formNo=" + formNo + ", docTitle=" + docTitle
				+ ", docContents=" + docContents + ", status=" + status + ", writeDate=" + writeDate + ", fileName="
				+ fileName + ", fileRename=" + fileRename + ", TemporaryStorage=" + TemporaryStorage + "]";
	}
	
	
}
