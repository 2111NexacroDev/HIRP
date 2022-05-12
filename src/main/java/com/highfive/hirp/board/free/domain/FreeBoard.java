package com.highfive.hirp.board.free.domain;

import java.sql.Date;
import java.util.List;

import com.highfive.hirp.board.common.BoardAttachedFile;

public class FreeBoard {

	private int freeNo;
	private String boardCode;
	private String emplId;
	private String freeTitle;
	private String freeContents;
	private Date writeDate;
	private int freeCount;
	private int recommendCount;
	private String status;
	private List<BoardAttachedFile> bList;
	
	public FreeBoard() {}

	public FreeBoard(int freeNo, String boardCode, String emplId, String freeTitle, String freeContents, Date writeDate,
			int freeCount, int recommendCount, String status, List<BoardAttachedFile> bList) {
		super();
		this.freeNo = freeNo;
		this.boardCode = boardCode;
		this.emplId = emplId;
		this.freeTitle = freeTitle;
		this.freeContents = freeContents;
		this.writeDate = writeDate;
		this.freeCount = freeCount;
		this.recommendCount = recommendCount;
		this.status = status;
		this.bList = bList;
	}

	public int getFreeNo() {
		return freeNo;
	}

	public void setFreeNo(int freeNo) {
		this.freeNo = freeNo;
	}

	public String getBoardCode() {
		return boardCode;
	}

	public void setBoardCode(String boardCode) {
		this.boardCode = boardCode;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
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

	public int getFreeCount() {
		return freeCount;
	}

	public void setFreeCount(int freeCount) {
		this.freeCount = freeCount;
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

	public List<BoardAttachedFile> getbList() {
		return bList;
	}

	public void setbList(List<BoardAttachedFile> bList) {
		this.bList = bList;
	}

	@Override
	public String toString() {
		return "FreeBoard [freeNo=" + freeNo + ", boardCode=" + boardCode + ", emplId=" + emplId + ", freeTitle="
				+ freeTitle + ", freeContents=" + freeContents + ", writeDate=" + writeDate + ", freeCount=" + freeCount
				+ ", recommendCount=" + recommendCount + ", status=" + status + ", bList=" + bList + "]";
	}

}
