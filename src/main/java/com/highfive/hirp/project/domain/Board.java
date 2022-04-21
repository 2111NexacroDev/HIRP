package com.highfive.hirp.project.domain;
// 칸반보드
public class Board {
	private int boardNo;
	private int projectNo;
	private String emplName;
	private String boardContents;
	private int boardStatus;
	
	public Board() {}

	public Board(int boardNo, int projectNo, String emplName, String boardContents, int boardStatus) {
		super();
		this.boardNo = boardNo;
		this.projectNo = projectNo;
		this.emplName = emplName;
		this.boardContents = boardContents;
		this.boardStatus = boardStatus;
	}

	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public int getProjectNo() {
		return projectNo;
	}

	public void setProjectNo(int projectNo) {
		this.projectNo = projectNo;
	}

	public String getEmplName() {
		return emplName;
	}

	public void setEmplName(String emplName) {
		this.emplName = emplName;
	}

	public String getBoardContents() {
		return boardContents;
	}

	public void setBoardContents(String boardContents) {
		this.boardContents = boardContents;
	}

	public int getBoardStatus() {
		return boardStatus;
	}

	public void setBoardStatus(int boardStatus) {
		this.boardStatus = boardStatus;
	}

	@Override
	public String toString() {
		return "Board [boardNo=" + boardNo + ", projectNo=" + projectNo + ", emplName=" + emplName + ", boardContents="
				+ boardContents + ", boardStatus=" + boardStatus + "]";
	}
	
}
