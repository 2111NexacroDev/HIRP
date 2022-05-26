package com.highfive.hirp.chat.domain;

import java.sql.Date;

public class Message {
	private int msgNo;
	private int chatroomNo;
	private String msgSendid;
	private String msgContents;
	private String msgSenddate;
	//empl
	private String emplName;
	private String deptName;
	private String positionName;
	
	public Message() {}

	public Message(int msgNo, int chatroomNo, String msgSendid, String msgContents, String msgSenddate) {
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

	public String getMsgSenddate() {
		return msgSenddate;
	}

	public void setMsgSenddate(String msgSenddate) {
		this.msgSenddate = msgSenddate;
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
	
	@Override
	public String toString() {
		return "Message [msgNo=" + msgNo + ", chatroomNo=" + chatroomNo + ", msgSendid=" + msgSendid + ", msgContents="
				+ msgContents + ", msgSenddate=" + msgSenddate + "]";
	}



	
}
