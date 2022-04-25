package com.highfive.hirp.chat.domain;

import java.sql.Date;

public class Message {
	private int msgNo;
	private int chatroomNo;
	private String msgSendid;
	private String msgContents;
	private Date msgSenddate;
	
	public Message() {}

	public Message(int msgNo, int chatroomNo, String msgSendid, String msgContents, Date msgSenddate) {
		super();
		this.msgNo = msgNo;
		this.chatroomNo = chatroomNo;
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

	@Override
	public String toString() {
		return "Message [msgNo=" + msgNo + ", chatroomNo=" + chatroomNo + ", msgSendid=" + msgSendid + ", msgContents="
				+ msgContents + ", msgSenddate=" + msgSenddate + "]";
	}

	
}
