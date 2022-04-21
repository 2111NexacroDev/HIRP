package com.highfive.hirp.mail.domain;

import java.sql.Date;

public class Mail {
	private int mailNo;
	private String mailSender;
	private String mailRecpient;
	private String mailReferrer;
	private String mailTitle;
	private String mailContents;
	private Date mailDate;
	private String importantMail;
	private String temporaryStorage;
	private String mailWasteBasket;
	
	public Mail() {}

	public Mail(int mailNo, String mailSender, String mailRecpient, String mailReferrer, String mailTitle,
			String mailContents, Date mailDate, String importantMail, String temporaryStorage, String mailWasteBasket) {
		super();
		this.mailNo = mailNo;
		this.mailSender = mailSender;
		this.mailRecpient = mailRecpient;
		this.mailReferrer = mailReferrer;
		this.mailTitle = mailTitle;
		this.mailContents = mailContents;
		this.mailDate = mailDate;
		this.importantMail = importantMail;
		this.temporaryStorage = temporaryStorage;
		this.mailWasteBasket = mailWasteBasket;
	}

	public int getMailNo() {
		return mailNo;
	}

	public void setMailNo(int mailNo) {
		this.mailNo = mailNo;
	}

	public String getMailSender() {
		return mailSender;
	}

	public void setMailSender(String mailSender) {
		this.mailSender = mailSender;
	}

	public String getMailRecpient() {
		return mailRecpient;
	}

	public void setMailRecpient(String mailRecpient) {
		this.mailRecpient = mailRecpient;
	}

	public String getMailReferrer() {
		return mailReferrer;
	}

	public void setMailReferrer(String mailReferrer) {
		this.mailReferrer = mailReferrer;
	}

	public String getMailTitle() {
		return mailTitle;
	}

	public void setMailTitle(String mailTitle) {
		this.mailTitle = mailTitle;
	}

	public String getMailContents() {
		return mailContents;
	}

	public void setMailContents(String mailContents) {
		this.mailContents = mailContents;
	}

	public Date getMailDate() {
		return mailDate;
	}

	public void setMailDate(Date mailDate) {
		this.mailDate = mailDate;
	}

	public String getImportantMail() {
		return importantMail;
	}

	public void setImportantMail(String importantMail) {
		this.importantMail = importantMail;
	}

	public String getTemporaryStorage() {
		return temporaryStorage;
	}

	public void setTemporaryStorage(String temporaryStorage) {
		this.temporaryStorage = temporaryStorage;
	}

	public String getMailWasteBasket() {
		return mailWasteBasket;
	}

	public void setMailWasteBasket(String mailWasteBasket) {
		this.mailWasteBasket = mailWasteBasket;
	}

	@Override
	public String toString() {
		return "Mail [mailNo=" + mailNo + ", mailSender=" + mailSender + ", mailRecpient=" + mailRecpient
				+ ", mailReferrer=" + mailReferrer + ", mailTitle=" + mailTitle + ", mailContents=" + mailContents
				+ ", mailDate=" + mailDate + ", importantMail=" + importantMail + ", temporaryStorage="
				+ temporaryStorage + ", mailWasteBasket=" + mailWasteBasket + "]";
	}
	
}
