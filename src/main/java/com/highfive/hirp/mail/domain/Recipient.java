package com.highfive.hirp.mail.domain;

public class Recipient {
	private int recipientNo;
	private int mailNo;
	private String recipientId;
	
	public Recipient() {}

	public Recipient(int recipientNo, int mailNo, String recipientId) {
		super();
		this.recipientNo = recipientNo;
		this.mailNo = mailNo;
		this.recipientId = recipientId;
	}

	public int getRecipientNo() {
		return recipientNo;
	}

	public void setRecipientNo(int recipientNo) {
		this.recipientNo = recipientNo;
	}

	public int getMailNo() {
		return mailNo;
	}

	public void setMailNo(int mailNo) {
		this.mailNo = mailNo;
	}

	public String getRecipientId() {
		return recipientId;
	}

	public void setRecipientId(String recipientId) {
		this.recipientId = recipientId;
	}

	@Override
	public String toString() {
		return "Recipient [recipientNo=" + recipientNo + ", mailNo=" + mailNo + ", recipientId=" + recipientId + "]";
	}
	
}
