package com.highfive.hirp.chat.domain;

import java.util.List;

public class ChatRoomJoin {
	private int joinchatNo;
	private int chatroomNo;
	private String joinchatId;
	
	private List<ChatRoomJoin> chatRoomJoinList;
	
	public ChatRoomJoin() {}

	public ChatRoomJoin(int joinchatNo, int chatroomNo, String joinchatId) {
		super();
		this.joinchatNo = joinchatNo;
		this.chatroomNo = chatroomNo;
		this.joinchatId = joinchatId;
	}

	public int getJoinchatNo() {
		return joinchatNo;
	}

	public void setJoinchatNo(int joinchatNo) {
		this.joinchatNo = joinchatNo;
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
	
	public List<ChatRoomJoin> getChatRoomJoinList() {
		return chatRoomJoinList;
	}
	
	public void setChatRoomJoinList(List<ChatRoomJoin> chatRoomJoinList) {
		this.chatRoomJoinList = chatRoomJoinList;
	}

	@Override
	public String toString() {
		return "ChatRoomJoin [joinchatNo=" + joinchatNo + ", chatroomNo=" + chatroomNo + ", joinchatId=" + joinchatId
				+ ", chatRoomJoinList=" + chatRoomJoinList + "]";
	}

	
	
}
