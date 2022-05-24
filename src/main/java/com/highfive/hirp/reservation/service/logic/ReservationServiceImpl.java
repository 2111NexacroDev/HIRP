package com.highfive.hirp.reservation.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.reservation.domain.Reservation;
import com.highfive.hirp.reservation.domain.Utility;
import com.highfive.hirp.reservation.service.ReservationService;
import com.highfive.hirp.reservation.store.ReservationStore;

@Service
public class ReservationServiceImpl implements ReservationService {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private ReservationStore rStore;

	@Override
	public List<Reservation> printAllReservation() {
		List<Reservation> rList = rStore.selectAllReservation(sqlSession);
		return rList;
	}
	
	@Override
	public List<Reservation> printAllMyReservation(String emplId) {
		List<Reservation> myList = rStore.selectAllMyReservation(sqlSession, emplId);
		return myList;
	}

	@Override
	public Reservation printOneReservationByNo(int reservationNo) {
		Reservation reservation = rStore.selectOneReservationByNo(sqlSession, reservationNo);
		return reservation;
	}
	
	@Override
	public int registerReservation(Reservation reservation) {
		int result = rStore.insertReservation(sqlSession, reservation);
		return result;
	}

	@Override
	public int modifyReservation(Reservation reservation) {
		int result = rStore.updateReservation(sqlSession, reservation);
		return result;
	}

	@Override
	public int removeReservation(int reservationNo) {
		int result = rStore.deleteReservation(sqlSession, reservationNo);
		return result;
	}

	@Override
	public int returnUtility(int reservationNo) {
		int result = rStore.returnUtility(sqlSession, reservationNo);
		return result;
	}
	
	@Override
	public List<Utility> printAllUtility() {
		List<Utility> uList = rStore.selectAllUtility(sqlSession);
		return uList;
	}
	
	@Override
	public Utility printOneUtilityByNo(int utilityNo) {
		Utility utility = rStore.selectOneUtilityByNo(sqlSession, utilityNo);
		return utility;
	}

	@Override
	public int registerUtility(Utility utility) {
		int result = rStore.insertUtility(sqlSession, utility);
		return result;
	}

	@Override
	public int modifyUtility(Utility utility) {
		int result = rStore.updateUtility(sqlSession, utility);
		return result;
	}

	@Override
	public int removeUtility(int utilityNo) {
		int result = rStore.deleteUtility(sqlSession, utilityNo);
		return result;
	}
}
