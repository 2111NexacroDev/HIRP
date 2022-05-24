package com.highfive.hirp.chat.domain;

public class ChatRoom {
	private int chatroomNo;
	private String chatroomName;
	private String chatroomManager;
	private String chatroomDate;
	Message message;
	
	public ChatRoom() {}

	public ChatRoom(int chatroomNo, String chatroomName, String chatroomManager, String chatroomDate, Message message) {
		super();
		this.chatroomNo = chatroomNo;
		this.chatroomName = chatroomName;
		this.chatroomManager = chatroomManager;
		this.chatroomDate = chatroomDate;
		this.message = message;
	}

	public int getChatroomNo() {
		return chatroomNo;
	}

	public void setChatroomNo(int chatroomNo) {
		this.chatroomNo = chatroomNo;
	}

	public String getChatroomName() {
		return chatroomName;
	}

	public void setChatroomName(String chatroomName) {
		this.chatroomName = chatroomName;
	}

	public String getChatroomManager() {
		return chatroomManager;
	}

	public void setChatroomManager(String chatroomManager) {
		this.chatroomManager = chatroomManager;
	}

	public String getChatroomDate() {
		return chatroomDate;
	}

	public void setChatroomDate(String chatroomDate) {
		this.chatroomDate = chatroomDate;
	}

	public Message getMessage() {
		return message;
	}

	public void setMessage(Message message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "ChatRoom [chatroomNo=" + chatroomNo + ", chatroomName=" + chatroomName + ", chatroomManager="
				+ chatroomManager + ", chatroomDate=" + chatroomDate + ", message=" + message + "]";
	}
	
	

}
