package com.highfive.hirp.chat.domain;

public class ChatRoom {
	private int chatroomNo;
	private String chatroomName;
	private String chatroomManager;
	
	public ChatRoom() {}

	public ChatRoom(int chatroomNo, String chatroomName, String chatroomManager) {
		super();
		this.chatroomNo = chatroomNo;
		this.chatroomName = chatroomName;
		this.chatroomManager = chatroomManager;
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

	@Override
	public String toString() {
		return "ChatRoom [chatroomNo=" + chatroomNo + ", chatroomName=" + chatroomName + ", chatroomManager="
				+ chatroomManager + "]";
	}
	
	
}
