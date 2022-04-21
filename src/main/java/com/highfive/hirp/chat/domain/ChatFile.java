package com.highfive.hirp.chat.domain;

import java.sql.Date;

public class ChatFile {
	private int chatfileNo;
	private int msgNo;
	private int chatroomNo;
	private String chatfileName;
	private String chatfileRename;
	private String chatfileExtension;
	private String chatfilePath;
	private Date chatfileTime;
	
	public ChatFile() {}

	public ChatFile(int chatfileNo, int msgNo, int chatroomNo, String chatfileName, String chatfileRename,
			String chatfileExtension, String chatfilePath, Date chatfileTime) {
		super();
		this.chatfileNo = chatfileNo;
		this.msgNo = msgNo;
		this.chatroomNo = chatroomNo;
		this.chatfileName = chatfileName;
		this.chatfileRename = chatfileRename;
		this.chatfileExtension = chatfileExtension;
		this.chatfilePath = chatfilePath;
		this.chatfileTime = chatfileTime;
	}

	public int getChatfileNo() {
		return chatfileNo;
	}

	public void setChatfileNo(int chatfileNo) {
		this.chatfileNo = chatfileNo;
	}

	public int getMsgNo() {
		return msgNo;
	}

	public void setMsgNo(int msgNo) {
		this.msgNo = msgNo;
	}

	public int getChatroomNo() {
		return chatroomNo;
	}

	public void setChatroomNo(int chatroomNo) {
		this.chatroomNo = chatroomNo;
	}

	public String getChatfileName() {
		return chatfileName;
	}

	public void setChatfileName(String chatfileName) {
		this.chatfileName = chatfileName;
	}

	public String getChatfileRename() {
		return chatfileRename;
	}

	public void setChatfileRename(String chatfileRename) {
		this.chatfileRename = chatfileRename;
	}

	public String getChatfileExtension() {
		return chatfileExtension;
	}

	public void setChatfileExtension(String chatfileExtension) {
		this.chatfileExtension = chatfileExtension;
	}

	public String getChatfilePath() {
		return chatfilePath;
	}

	public void setChatfilePath(String chatfilePath) {
		this.chatfilePath = chatfilePath;
	}

	public Date getChatfileTime() {
		return chatfileTime;
	}

	public void setChatfileTime(Date chatfileTime) {
		this.chatfileTime = chatfileTime;
	}

	@Override
	public String toString() {
		return "ChatFile [chatfileNo=" + chatfileNo + ", msgNo=" + msgNo + ", chatroomNo=" + chatroomNo
				+ ", chatfileName=" + chatfileName + ", chatfileRename=" + chatfileRename + ", chatfileExtension="
				+ chatfileExtension + ", chatfilePath=" + chatfilePath + ", chatfileTime=" + chatfileTime + "]";
	}

	
	
	
}
