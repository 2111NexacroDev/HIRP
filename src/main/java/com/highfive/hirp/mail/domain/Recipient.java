package com.highfive.hirp.mail.domain;

public class Recipient {
	private int recipientNo;
	private int mailNo;
	private String recipientId;
	private String emplId;
	
	public Recipient() {}

	public Recipient(int recipientNo, int mailNo, String recipientId, String emplId) {
		super();
		this.recipientNo = recipientNo;
		this.mailNo = mailNo;
		this.recipientId = recipientId;
		this.emplId = emplId;
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

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	@Override
	public String toString() {
		return "Recipient [recipientNo=" + recipientNo + ", mailNo=" + mailNo + ", recipientId=" + recipientId
				+ ", emplId=" + emplId + "]";
	}

}
