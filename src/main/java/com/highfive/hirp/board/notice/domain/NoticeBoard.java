package com.highfive.hirp.board.notice.domain;

import java.sql.Date;
import java.util.List;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.employee.domain.Employee;

public class NoticeBoard {

	private int noticeNo;
	private String boardCode;
	private String emplId;
	private String noticeTitle;
	private String noticeContents;
	private Date writeDate;
	private int noticeCount;
	private String status;
	private List<BoardAttachedFile> bList;
	private Employee employee;
	
	public NoticeBoard() {}

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

	public List<BoardAttachedFile> getbList() {
		return bList;
	}

	public void setbList(List<BoardAttachedFile> bList) {
		this.bList = bList;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	@Override
	public String toString() {
		return "NoticeBoard [noticeNo=" + noticeNo + ", boardCode=" + boardCode + ", emplId=" + emplId
				+ ", noticeTitle=" + noticeTitle + ", noticeContents=" + noticeContents + ", writeDate=" + writeDate
				+ ", noticeCount=" + noticeCount + ", status=" + status + ", bList=" + bList + ", employee=" + employee
				+ "]";
	}


	

}
