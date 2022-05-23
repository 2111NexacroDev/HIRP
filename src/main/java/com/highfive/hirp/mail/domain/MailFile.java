package com.highfive.hirp.mail.domain;

public class MailFile {
	private int fileNo;
	private int mailNo;
	private String fileName;
	private String fileExtension;
	private String fileReName;
	private String filePath;
	private String emplId;
	
	public MailFile() {}

	public MailFile(int fileNo, int mailNo, String fileName, String fileExtension, String fileReName, String filePath,
			String emplId) {
		super();
		this.fileNo = fileNo;
		this.mailNo = mailNo;
		this.fileName = fileName;
		this.fileExtension = fileExtension;
		this.fileReName = fileReName;
		this.filePath = filePath;
		this.emplId = emplId;
	}

	public int getFileNo() {
		return fileNo;
	}

	public void setFileNo(int fileNo) {
		this.fileNo = fileNo;
	}

	public int getMailNo() {
		return mailNo;
	}

	public void setMailNo(int mailNo) {
		this.mailNo = mailNo;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileExtension() {
		return fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

	public String getFileReName() {
		return fileReName;
	}

	public void setFileReName(String fileReName) {
		this.fileReName = fileReName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	@Override
	public String toString() {
		return "MailFile [fileNo=" + fileNo + ", mailNo=" + mailNo + ", fileName=" + fileName + ", fileExtension="
				+ fileExtension + ", fileReName=" + fileReName + ", filePath=" + filePath + ", emplId=" + emplId + "]";
	}

}
