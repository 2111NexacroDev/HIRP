package com.highfive.hirp.reservation.service;

import java.util.List;

import com.highfive.hirp.reservation.domain.Reservation;
import com.highfive.hirp.reservation.domain.Utility;

public interface ReservationService {
	// reservation
	public List<Reservation> printAllReservation();
	public List<Reservation> printAllMyReservation(String emplId);
	public int registerReservation(Reservation reservation);
	public int modifyReservation(Reservation reservation);
	public int removeReservation(int reservationNo);
	
	// utility
	public List<Utility> printAllUtility();
	public Utility printOneUtilityByNo(int utilityNo);
	public int registerUtility(Utility utility);
	public int modifyUtility(Utility utility);
	public int removeUtility(int utilityNo);
}
