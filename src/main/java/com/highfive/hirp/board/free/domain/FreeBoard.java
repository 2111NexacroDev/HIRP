package com.highfive.hirp.board.free.domain;

import java.sql.Date;

public class FreeBoard {

	private int freeNo;
	private String emplId;
	private String boardType;
	private String freeTitle;
	private String freeContents;
	private Date writeDate;
	private int recommendCount;
	private String status;
	
	public FreeBoard() {}

	public FreeBoard(int freeNo, String emplId, String boardType, String freeTitle, String freeContents, Date writeDate,
			int recommendCount, String status) {
		super();
		this.freeNo = freeNo;
		this.emplId = emplId;
		this.boardType = boardType;
		this.freeTitle = freeTitle;
		this.freeContents = freeContents;
		this.writeDate = writeDate;
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
		return "FreeBoard [freeNo=" + freeNo + ", emplId=" + emplId + ", boardType=" + boardType + ", freeTitle="
				+ freeTitle + ", freeContents=" + freeContents + ", writeDate=" + writeDate + ", recommendCount="
				+ recommendCount + ", status=" + status + "]";
	}

	

	
}
