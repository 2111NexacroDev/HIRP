package com.highfive.hirp.reservation.domain;

import java.sql.Date;

public class Reservation {
	private int reservationNo;
	private String emplId;
	private int utilityNo;
	private Date reservationStartDate;
	private Date reservationEndDate;
	private String reservationConts;
	private String isReturn;

	public Reservation() {
	}

	public Reservation(int reservationNo, String emplId, int utilityNo, Date reservationStartDate,
			Date reservationEndDate, String reservationConts, String isReturn) {
		super();
		this.reservationNo = reservationNo;
		this.emplId = emplId;
		this.utilityNo = utilityNo;
		this.reservationStartDate = reservationStartDate;
		this.reservationEndDate = reservationEndDate;
		this.reservationConts = reservationConts;
		this.isReturn = isReturn;
	}

	public int getReservationNo() {
		return reservationNo;
	}

	public void setReservationNo(int reservationNo) {
		this.reservationNo = reservationNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public int getUtilityNo() {
		return utilityNo;
	}

	public void setUtilityNo(int utilityNo) {
		this.utilityNo = utilityNo;
	}

	public Date getReservationStartDate() {
		return reservationStartDate;
	}

	public void setReservationStartDate(Date reservationStartDate) {
		this.reservationStartDate = reservationStartDate;
	}

	public Date getReservationEndDate() {
		return reservationEndDate;
	}

	public void setReservationEndDate(Date reservationEndDate) {
		this.reservationEndDate = reservationEndDate;
	}

	public String getReservationConts() {
		return reservationConts;
	}

	public void setReservationConts(String reservationConts) {
		this.reservationConts = reservationConts;
	}

	public String getIsReturn() {
		return isReturn;
	}

	public void setIsReturn(String isReturn) {
		this.isReturn = isReturn;
	}

	@Override
	public String toString() {
		return "Reservation [reservationNo=" + reservationNo + ", emplId=" + emplId + ", utilityNo=" + utilityNo
				+ ", reservationStartDate=" + reservationStartDate + ", reservationEndDate=" + reservationEndDate
				+ ", reservationConts=" + reservationConts + ", isReturn=" + isReturn + "]";
	}
}
