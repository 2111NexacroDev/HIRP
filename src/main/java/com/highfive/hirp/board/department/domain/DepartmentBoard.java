package com.highfive.hirp.board.department.domain;

import java.sql.Date;
import java.util.List;

import com.highfive.hirp.board.common.BoardAttachedFile;

public class DepartmentBoard {
 
	private int deptNo;
	private String boardCode;
	private String emplId;
	private String deptCode;
	private String deptTitle;
	private String deptContents;
	private Date writeDate;
	private int deptCount;
	private String isNotice;
	private String status;
	private int statisticCount;
	private List<BoardAttachedFile> bList;
	
	public DepartmentBoard() {}

	public int getDeptNo() {
		return deptNo;
	}

	public void setDeptNo(int deptNo) {
		this.deptNo = deptNo;
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

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getDeptTitle() {
		return deptTitle;
	}

	public void setDeptTitle(String deptTitle) {
		this.deptTitle = deptTitle;
	}

	public String getDeptContents() {
		return deptContents;
	}

	public void setDeptContents(String deptContents) {
		this.deptContents = deptContents;
	}

	public Date getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}

	public int getDeptCount() {
		return deptCount;
	}

	public void setDeptCount(int deptCount) {
		this.deptCount = deptCount;
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

	public int getStatisticCount() {
		return statisticCount;
	}

	public void setStatisticCount(int statisticCount) {
		this.statisticCount = statisticCount;
	}

	public List<BoardAttachedFile> getbList() {
		return bList;
	}

	public void setbList(List<BoardAttachedFile> bList) {
		this.bList = bList;
	}

	@Override
	public String toString() {
		return "DepartmentBoard [deptNo=" + deptNo + ", boardCode=" + boardCode + ", emplId=" + emplId + ", deptCode="
				+ deptCode + ", deptTitle=" + deptTitle + ", deptContents=" + deptContents + ", writeDate=" + writeDate
				+ ", deptCount=" + deptCount + ", isNotice=" + isNotice + ", status=" + status + ", statisticCount="
				+ statisticCount + ", bList=" + bList + "]";
	}

	
}
