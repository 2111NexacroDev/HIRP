package com.highfive.hirp.board.common;

import java.sql.Date;

public class Reply {

	private int replyNo;
	private String emplId;
	private String boardType;
	private int boardNo;
	private String replyContents;
	private Date writeDate;
	private Date updateDate;
	private String status;
	
	public Reply() {}

	public Reply(int replyNo, String emplId, String boardType, int boardNo, String replyContents, Date writeDate,
			Date updateDate, String status) {
		super();
		this.replyNo = replyNo;
		this.emplId = emplId;
		this.boardType = boardType;
		this.boardNo = boardNo;
		this.replyContents = replyContents;
		this.writeDate = writeDate;
		this.updateDate = updateDate;
		this.status = status;
	}

	public int getReplyNo() {
		return replyNo;
	}

	public void setReplyNo(int replyNo) {
		this.replyNo = replyNo;
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

	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public String getReplyContents() {
		return replyContents;
	}

	public void setReplyContents(String replyContents) {
		this.replyContents = replyContents;
	}

	public Date getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Reply [replyNo=" + replyNo + ", emplId=" + emplId + ", boardType=" + boardType + ", boardNo=" + boardNo
				+ ", replyContents=" + replyContents + ", writeDate=" + writeDate + ", updateDate=" + updateDate
				+ ", status=" + status + "]";
	}

	
	
	
	
	
}
