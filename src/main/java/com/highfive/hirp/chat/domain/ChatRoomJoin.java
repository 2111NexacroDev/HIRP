package com.highfive.hirp.chat.domain;

public class ChatRoomJoin {
	private int chatroomNo;
	private String joinchatId;
	
	public ChatRoomJoin() {}

	public ChatRoomJoin(int chatroomNo, String joinchatId) {
		super();
		this.chatroomNo = chatroomNo;
		this.joinchatId = joinchatId;
	}

	public int getChatroomNo() {
		return chatroomNo;
	}

	public void setChatroomNo(int chatroomNo) {
		this.chatroomNo = chatroomNo;
	}

	public String getJoinchatId() {
		return joinchatId;
	}

	public void setJoinchatId(String joinchatId) {
		this.joinchatId = joinchatId;
	}

	@Override
	public String toString() {
		return "ChatRoomJoin [chatroomNo=" + chatroomNo + ", joinchatId=" + joinchatId + "]";
	}
	
	
}
