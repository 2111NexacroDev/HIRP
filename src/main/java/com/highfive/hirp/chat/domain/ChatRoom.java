package com.highfive.hirp.chat.domain;

import java.util.List;

public class ChatRoom {
	private int chatroomNo;
	private String chatroomName;
	private String chatroomManager;
	private String chatroomDate;
	//메세지
	private Message message;
	//채팅방 참여자 list (string, 콤마로 구분)
	private String joinchatIdList;
	private String joinchatNameList;
	
	private ChatRoomJoin chatRoomJoin;
	
	public ChatRoom() {}

	public ChatRoom(int chatroomNo, String chatroomName, String chatroomManager, String chatroomDate, Message message,
			String joinchatIdList) {
		super();
		this.chatroomNo = chatroomNo;
		this.chatroomName = chatroomName;
		this.chatroomManager = chatroomManager;
		this.chatroomDate = chatroomDate;
		this.message = message;
		this.joinchatIdList = joinchatIdList;
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

	public String getJoinchatIdList() {
		return joinchatIdList;
	}

	public void setJoinchatIdList(String joinchatIdList) {
		this.joinchatIdList = joinchatIdList;
	}

	public String getJoinchatNameList() {
		return joinchatNameList;
	}

	public void setJoinchatNameList(String joinchatNameList) {
		this.joinchatNameList = joinchatNameList;
	}

	public ChatRoomJoin getChatRoomJoin() {
		return chatRoomJoin;
	}
	
	public void setChatRoomJoin(ChatRoomJoin chatRoomJoin) {
		this.chatRoomJoin = chatRoomJoin;
	}
	
	@Override
	public String toString() {
		return "ChatRoom [chatroomNo=" + chatroomNo + ", chatroomName=" + chatroomName + ", chatroomManager="
				+ chatroomManager + ", chatroomDate=" + chatroomDate + ", message=" + message + ", joinchatIdList="
				+ joinchatIdList + ", joinchatNameList=" + joinchatNameList + "]";
	}

}
