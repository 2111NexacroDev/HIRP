package com.highfive.hirp.board.domain;

import java.sql.Date;

public class FreeBulletinBoard {

	private int freeNo;
	private String emplId;
	private String boardType;
	private String freeTitle;
	private String freeContents;
	private Date writeDate;
	private String fileName;
	private String fileRename;
	private int recommendCount;
	private String status;
	
	public FreeBulletinBoard() {}

	public FreeBulletinBoard(int freeNo, String emplId, String boardType, String freeTitle, String freeContents,
			Date writeDate, String fileName, String fileRename, int recommendCount, String status) {
		super();
		this.freeNo = freeNo;
		this.emplId = emplId;
		this.boardType = boardType;
		this.freeTitle = freeTitle;
		this.freeContents = freeContents;
		this.writeDate = writeDate;
		this.fileName = fileName;
		this.fileRename = fileRename;
		this.recommendCount = recommendCount;
		this.status = status;
	}

	public int getFreeNo() {
		return freeNo;
	}

	public void setFreeNo(int freeNo) {
		this.freeNo = freeNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getBoardType() {
		return boardType;
	}

	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}

	public String getFreeTitle() {
		return freeTitle;
	}

	public void setFreeTitle(String freeTitle) {
		this.freeTitle = freeTitle;
	}

	public String getFreeContents() {
		return freeContents;
	}

	public void setFreeContents(String freeContents) {
		this.freeContents = freeContents;
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

	public int getRecommendCount() {
		return recommendCount;
	}

	public void setRecommendCount(int recommendCount) {
		this.recommendCount = recommendCount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "FreeBulletinBoard [freeNo=" + freeNo + ", emplId=" + emplId + ", boardType=" + boardType
				+ ", freeTitle=" + freeTitle + ", freeContents=" + freeContents + ", writeDate=" + writeDate
				+ ", fileName=" + fileName + ", fileRename=" + fileRename + ", recommendCount=" + recommendCount
				+ ", status=" + status + "]";
	}

	
	
	
}
