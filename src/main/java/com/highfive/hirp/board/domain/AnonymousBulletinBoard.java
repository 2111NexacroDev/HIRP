package com.highfive.hirp.board.domain;

import java.sql.Date;

public class AnonymousBulletinBoard {

	private int anonymousNo;
	private String emplId;
	private String boardType;
	private String anonymousTitle;
	private String anonymousContents;
	private Date writeDate;
	private String filename;
	private String fileRename;
	private int anonymousCount;
	private int recommendCount;
	private String status;
	
	public AnonymousBulletinBoard() {}

	public AnonymousBulletinBoard(int anonymousNo, String emplId, String boardType, String anonymousTitle,
			String anonymousContents, Date writeDate, String filename, String fileRename, int anonymousCount,
			int recommendCount, String status) {
		super();
		this.anonymousNo = anonymousNo;
		this.emplId = emplId;
		this.boardType = boardType;
		this.anonymousTitle = anonymousTitle;
		this.anonymousContents = anonymousContents;
		this.writeDate = writeDate;
		this.filename = filename;
		this.fileRename = fileRename;
		this.anonymousCount = anonymousCount;
		this.recommendCount = recommendCount;
		this.status = status;
	}

	public int getAnonymousNo() {
		return anonymousNo;
	}

	public void setAnonymousNo(int anonymousNo) {
		this.anonymousNo = anonymousNo;
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

	public String getAnonymousTitle() {
		return anonymousTitle;
	}

	public void setAnonymousTitle(String anonymousTitle) {
		this.anonymousTitle = anonymousTitle;
	}

	public String getAnonymousContents() {
		return anonymousContents;
	}

	public void setAnonymousContents(String anonymousContents) {
		this.anonymousContents = anonymousContents;
	}

	public Date getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getFileRename() {
		return fileRename;
	}

	public void setFileRename(String fileRename) {
		this.fileRename = fileRename;
	}

	public int getAnonymousCount() {
		return anonymousCount;
	}

	public void setAnonymousCount(int anonymousCount) {
		this.anonymousCount = anonymousCount;
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
		return "AnonymousBulletinBoard [anonymousNo=" + anonymousNo + ", emplId=" + emplId + ", boardType=" + boardType
				+ ", anonymousTitle=" + anonymousTitle + ", anonymousContents=" + anonymousContents + ", writeDate="
				+ writeDate + ", filename=" + filename + ", fileRename=" + fileRename + ", anonymousCount="
				+ anonymousCount + ", recommendCount=" + recommendCount + ", status=" + status + "]";
	}

	
	
	
}
