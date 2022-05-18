package com.highfive.hirp.reservation.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.reservation.domain.Reservation;
import com.highfive.hirp.reservation.domain.Utility;

public interface ReservationStore {

	List<Reservation> selectAllReservation(SqlSession sqlSession);
	int insertReservation(SqlSession sqlSession, Reservation reservation);
	int updateReservation(SqlSession sqlSession, Reservation reservation);
	int deleteReservation(SqlSession sqlSession, int reservationNo);
	
	List<Utility> selectAllUtility(SqlSession sqlSession);
	Utility selectOneUtilityByNo(SqlSession sqlSession, int utilityNo);
	int insertUtility(SqlSession sqlSession, Utility utility);
	int updateUtility(SqlSession sqlSession, Utility utility);
	int deleteUtility(SqlSession sqlSession, int utilityNo);
	
}
