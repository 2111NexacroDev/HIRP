package com.highfive.hirp.board.common;

public class BoardAttachedFile {

	private int fileNo;
	private String boardCode;
	private int boardNo;
	private String fileName;
	private String fileRename;
	private String filePath;
	
	public BoardAttachedFile() {}

	public BoardAttachedFile(int fileNo, String boardCode, int boardNo, String fileName, String fileRename,
			String filePath) {
		super();
		this.fileNo = fileNo;
		this.boardCode = boardCode;
		this.boardNo = boardNo;
		this.fileName = fileName;
		this.fileRename = fileRename;
		this.filePath = filePath;
	}

	public int getFileNo() {
		return fileNo;
	}

	public void setFileNo(int fileNo) {
		this.fileNo = fileNo;
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

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileRename() {
		return fileRename;
	}

	public void setFileRename(String fileRename) {
		this.fileRename = fileRename;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	@Override
	public String toString() {
		return "BoardAttachedFile [fileNo=" + fileNo + ", boardCode=" + boardCode + ", boardNo=" + boardNo
				+ ", fileName=" + fileName + ", fileRename=" + fileRename + ", filePath=" + filePath + "]";
	}
	
}
