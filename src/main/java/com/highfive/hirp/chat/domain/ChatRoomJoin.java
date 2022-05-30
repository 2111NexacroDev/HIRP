package com.highfive.hirp.chat.domain;

import java.util.List;

public class ChatRoomJoin {
	private int joinchatNo;
	private int chatroomNo;
	private String joinchatId;
	//회원 정보
	private String emplName;
	private String deptName;
	private String positionName;
	private String emplProfile;
	
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

	public String getEmplName() {
		return emplName;
	}

	public void setEmplName(String emplName) {
		this.emplName = emplName;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public String getEmplProfile() {
		return emplProfile;
	}

	public void setEmplProfile(String emplProfile) {
		this.emplProfile = emplProfile;
	}

	@Override
	public String toString() {
		return "ChatRoomJoin [joinchatNo=" + joinchatNo + ", chatroomNo=" + chatroomNo + ", joinchatId=" + joinchatId
				+ ", chatRoomJoinList=" + chatRoomJoinList + "]";
	}

	
	
}
