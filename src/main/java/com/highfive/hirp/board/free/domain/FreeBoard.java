package com.highfive.hirp.board.free.domain;

import java.sql.Date;
import java.util.List;

import com.highfive.hirp.board.common.BoardAttachedFile;
import com.highfive.hirp.employee.domain.Employee;

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
	private Employee employee;
	
	public FreeBoard() {}

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

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	@Override
	public String toString() {
		return "FreeBoard [freeNo=" + freeNo + ", boardCode=" + boardCode + ", emplId=" + emplId + ", freeTitle="
				+ freeTitle + ", freeContents=" + freeContents + ", writeDate=" + writeDate + ", freeCount=" + freeCount
				+ ", recommendCount=" + recommendCount + ", status=" + status + ", bList=" + bList + ", employee="
				+ employee + "]";
	}

	

}
