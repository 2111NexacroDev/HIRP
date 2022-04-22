package com.highfive.hirp.chat.domain;

import java.sql.Date;

public class Message {
	private int msgNo;
	private int chatroom_no;
	private String msgSendid;
	private String msgContents;
	private Date msgSenddate;
	
	public Message() {}

	public Message(int msgNo, int chatroom_no, String msgSendid, String msgContents, Date msgSenddate) {
		super();
		this.msgNo = msgNo;
		this.chatroom_no = chatroom_no;
		this.msgSendid = msgSendid;
		this.msgContents = msgContents;
		this.msgSenddate = msgSenddate;
	}

	public int getMsgNo() {
		return msgNo;
	}

	public void setMsgNo(int msgNo) {
		this.msgNo = msgNo;
	}

	public int getChatroom_no() {
		return chatroom_no;
	}

	public void setChatroom_no(int chatroom_no) {
		this.chatroom_no = chatroom_no;
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

	@Override
	public String toString() {
		return "Message [msgNo=" + msgNo + ", chatroom_no=" + chatroom_no + ", msgSendid=" + msgSendid
				+ ", msgContents=" + msgContents + ", msgSenddate=" + msgSenddate + "]";
	}
	
	
}
