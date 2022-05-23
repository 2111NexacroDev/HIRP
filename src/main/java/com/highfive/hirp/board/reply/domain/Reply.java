package com.highfive.hirp.board.reply.domain;

import java.sql.Date;

public class Reply {

	private int replyNo;
	private String boardCode;
	private int boardNo;
	private int parentReplyNo;
	private int replyOrder;
	private int replyDepth;
	private String emplId;
	private String replyContents;
	private Date writeDate;
	private Date updateDate;
	private String status;
	
	public Reply() {}

	public Reply(int replyNo, String boardCode, int boardNo, int parentReplyNo, int replyOrder, int replyDepth,
			String emplId, String replyContents, Date writeDate, Date updateDate, String status) {
		super();
		this.replyNo = replyNo;
		this.boardCode = boardCode;
		this.boardNo = boardNo;
		this.parentReplyNo = parentReplyNo;
		this.replyOrder = replyOrder;
		this.replyDepth = replyDepth;
		this.emplId = emplId;
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

	public String getBoardCode() {
		return boardCode;
	}

	public void setBoardCode(String boardCode) {
		this.boardCode = boardCode;
	}

	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public int getParentReplyNo() {
		return parentReplyNo;
	}

	public void setParentReplyNo(int parentReplyNo) {
		this.parentReplyNo = parentReplyNo;
	}

	public int getReplyOrder() {
		return replyOrder;
	}

	public void setReplyOrder(int replyOrder) {
		this.replyOrder = replyOrder;
	}

	public int getReplyDepth() {
		return replyDepth;
	}

	public void setReplyDepth(int replyDepth) {
		this.replyDepth = replyDepth;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
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
		return "Reply [replyNo=" + replyNo + ", boardCode=" + boardCode + ", boardNo=" + boardNo + ", parentReplyNo="
				+ parentReplyNo + ", replyOrder=" + replyOrder + ", replyDepth=" + replyDepth + ", emplId=" + emplId
				+ ", replyContents=" + replyContents + ", writeDate=" + writeDate + ", updateDate=" + updateDate
				+ ", status=" + status + "]";
	}

	
}
