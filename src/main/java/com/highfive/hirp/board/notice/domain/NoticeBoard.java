package com.highfive.hirp.board.notice.domain;

import java.sql.Date;

public class NoticeBoard {

	private int noticeNo;
	private String boardCode;
	private String emplId;
	private String noticeTitle;
	private String noticeContents;
	private Date writeDate;
	private int noticeCount;
	private String status;
	
	public NoticeBoard() {}

	public NoticeBoard(int noticeNo, String boardCode, String emplId, String noticeTitle, String noticeContents,
			Date writeDate, int noticeCount, String status) {
		super();
		this.noticeNo = noticeNo;
		this.boardCode = boardCode;
		this.emplId = emplId;
		this.noticeTitle = noticeTitle;
		this.noticeContents = noticeContents;
		this.writeDate = writeDate;
		this.noticeCount = noticeCount;
		this.status = status;
	}

	public int getNoticeNo() {
		return noticeNo;
	}

	public void setNoticeNo(int noticeNo) {
		this.noticeNo = noticeNo;
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

	public String getNoticeTitle() {
		return noticeTitle;
	}

	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}

	public String getNoticeContents() {
		return noticeContents;
	}

	public void setNoticeContents(String noticeContents) {
		this.noticeContents = noticeContents;
	}

	public Date getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}

	public int getNoticeCount() {
		return noticeCount;
	}

	public void setNoticeCount(int noticeCount) {
		this.noticeCount = noticeCount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "NoticeBoard [noticeNo=" + noticeNo + ", boardCode=" + boardCode + ", emplId=" + emplId
				+ ", noticeTitle=" + noticeTitle + ", noticeContents=" + noticeContents + ", writeDate=" + writeDate
				+ ", noticeCount=" + noticeCount + ", status=" + status + "]";
	}

	
	

}
