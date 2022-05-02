package com.highfive.hirp.chat.domain;

import java.sql.Date;

public class ChatList {
	private int msgNo;
	private int chatroomNo;
	private String msgSendid;
	private String msgContents;
	private Date msgSenddate;
	private int chatfileNo;
	private String chatfileName;
	private String chatfileRename;
	private String chatfileExtension;
	private String chatfilePath;
	
	public ChatList() {}

	public ChatList(int msgNo, int chatroomNo, String msgSendid, String msgContents, Date msgSenddate, int chatfileNo,
			String chatfileName, String chatfileRename, String chatfileExtension, String chatfilePath) {
		super();
		this.msgNo = msgNo;
		this.chatroomNo = chatroomNo;
		this.msgSendid = msgSendid;
		this.msgContents = msgContents;
		this.msgSenddate = msgSenddate;
		this.chatfileNo = chatfileNo;
		this.chatfileName = chatfileName;
		this.chatfileRename = chatfileRename;
		this.chatfileExtension = chatfileExtension;
		this.chatfilePath = chatfilePath;
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

	public String getMsgSendid() {
		return msgSendid;
	}

	public void setMsgSendid(String msgSendid) {
		this.msgSendid = msgSendid;
	}

	public String getMsgContents() {
		return msgContents;
	}

	public void setMsgContents(String msgContents) {
		this.msgContents = msgContents;
	}

	public Date getMsgSenddate() {
		return msgSenddate;
	}

	public void setMsgSenddate(Date msgSenddate) {
		this.msgSenddate = msgSenddate;
	}

	public int getChatfileNo() {
		return chatfileNo;
	}

	public void setChatfileNo(int chatfileNo) {
		this.chatfileNo = chatfileNo;
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

	@Override
	public String toString() {
		return "ChatList [msgNo=" + msgNo + ", chatroomNo=" + chatroomNo + ", msgSendid=" + msgSendid + ", msgContents="
				+ msgContents + ", msgSenddate=" + msgSenddate + ", chatfileNo=" + chatfileNo + ", chatfileName="
				+ chatfileName + ", chatfileRename=" + chatfileRename + ", chatfileExtension=" + chatfileExtension
				+ ", chatfilePath=" + chatfilePath + "]";
	}
	
	
}
