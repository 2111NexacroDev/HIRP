package com.highfive.hirp.board.domain;

import java.sql.Date;

public class DepartmentBoard {
 
	private int departmentNo;
	private String emplId;
	private String deptCode;
	private String boardType;
	private String departmentTitle;
	private String departmentContents;
	private Date writeDate;
	private String fileName;
	private String fileRename;
	private int departmentCount;
	private String isNotice;
	private String status;
	
	public DepartmentBoard() {}

	public DepartmentBoard(int departmentNo, String emplId, String deptCode, String boardType, String departmentTitle,
			String departmentContents, Date writeDate, String fileName, String fileRename, int departmentCount,
			String isNotice, String status) {
		super();
		this.departmentNo = departmentNo;
		this.emplId = emplId;
		this.deptCode = deptCode;
		this.boardType = boardType;
		this.departmentTitle = departmentTitle;
		this.departmentContents = departmentContents;
		this.writeDate = writeDate;
		this.fileName = fileName;
		this.fileRename = fileRename;
		this.departmentCount = departmentCount;
		this.isNotice = isNotice;
		this.status = status;
	}

	public int getDepartmentNo() {
		return departmentNo;
	}

	public void setDepartmentNo(int departmentNo) {
		this.departmentNo = departmentNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getBoardType() {
		return boardType;
	}

	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}

	public String getDepartmentTitle() {
		return departmentTitle;
	}

	public void setDepartmentTitle(String departmentTitle) {
		this.departmentTitle = departmentTitle;
	}

	public String getDepartmentContents() {
		return departmentContents;
	}

	public void setDepartmentContents(String departmentContents) {
		this.departmentContents = departmentContents;
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

	public int getDepartmentCount() {
		return departmentCount;
	}

	public void setDepartmentCount(int departmentCount) {
		this.departmentCount = departmentCount;
	}

	public String getIsNotice() {
		return isNotice;
	}

	public void setIsNotice(String isNotice) {
		this.isNotice = isNotice;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "DepartmentBoard [departmentNo=" + departmentNo + ", emplId=" + emplId + ", deptCode=" + deptCode
				+ ", boardType=" + boardType + ", departmentTitle=" + departmentTitle + ", departmentContents="
				+ departmentContents + ", writeDate=" + writeDate + ", fileName=" + fileName + ", fileRename="
				+ fileRename + ", departmentCount=" + departmentCount + ", isNotice=" + isNotice + ", status=" + status
				+ "]";
	}
	
	
}
