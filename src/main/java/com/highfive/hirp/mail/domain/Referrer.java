package com.highfive.hirp.mail.domain;

public class Referrer {
	private int referrerNo;
	private int mailNo;
	private String referrerId;
	
	public Referrer() {}

	public Referrer(int referrerNo, int mailNo, String referrerId) {
		super();
		this.referrerNo = referrerNo;
		this.mailNo = mailNo;
		this.referrerId = referrerId;
	}

	public int getReferrerNo() {
		return referrerNo;
	}

	public void setReferrerNo(int referrerNo) {
		this.referrerNo = referrerNo;
	}

	public int getMailNo() {
		return mailNo;
	}

	public void setMailNo(int mailNo) {
		this.mailNo = mailNo;
	}

	public String getReferrerId() {
		return referrerId;
	}

	public void setReferrerId(String referrerId) {
		this.referrerId = referrerId;
	}

	@Override
	public String toString() {
		return "Referrer [referrerNo=" + referrerNo + ", mailNo=" + mailNo + ", referrerId=" + referrerId + "]";
	}
	
}
