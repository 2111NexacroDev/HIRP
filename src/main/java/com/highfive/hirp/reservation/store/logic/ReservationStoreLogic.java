package com.highfive.hirp.reservation.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.reservation.domain.Reservation;
import com.highfive.hirp.reservation.domain.Utility;
import com.highfive.hirp.reservation.store.ReservationStore;

@Repository
public class ReservationStoreLogic implements ReservationStore {
	@Override
	public List<Reservation> selectAllReservation(SqlSession sqlSession) {
		List<Reservation> rList = sqlSession.selectList("ReservationMapper.selectAllReservation");
		return rList;
	}

	@Override
	public List<Reservation> selectAllMyReservation(SqlSession sqlSession, String emplId) {
		List<Reservation> myList = sqlSession.selectList("ReservationMapper.selectAllMyReservation", emplId);
		return myList;
	}

	@Override
	public Reservation selectOneReservationByNo(SqlSession sqlSession, int reservationNo) {
		Reservation reservation = sqlSession.selectOne("ReservationMapper.selectOneReservationByNo", reservationNo);
		return reservation;
	}
	
	@Override
	public int insertReservation(SqlSession sqlSession, Reservation reservation) {
		int result = sqlSession.insert("ReservationMapper.insertReservation", reservation);
		return result;
	}

	@Override
	public int updateReservation(SqlSession sqlSession, Reservation reservation) {
		int result = sqlSession.update("ReservationMapper.updateReservation", reservation);
		return result;
	}

	@Override
	public int deleteReservation(SqlSession sqlSession, int reservationNo) {
		int result = sqlSession.delete("ReservationMapper.deleteReservation", reservationNo);
		return result;
	}

	@Override
	public int returnUtility(SqlSession sqlSession, int reservationNo) {
		int result = sqlSession.update("ReservationMapper.returnUtility", reservationNo);
		return result;
	}
	
	@Override
	public List<Utility> selectAllUtility(SqlSession sqlSession) {
		List<Utility> uList = sqlSession.selectList("ReservationMapper.selectAllUtility");
		return uList;
	}
	
	@Override
	public Utility selectOneUtilityByNo(SqlSession sqlSession, int utilityNo) {
		Utility utility = sqlSession.selectOne("ReservationMapper.selectOneUtilityByNo", utilityNo);
		return utility;
	}

	@Override
	public int insertUtility(SqlSession sqlSession, Utility utility) {
		int result = sqlSession.insert("ReservationMapper.insertUtility", utility);
		return result;
	}

	@Override
	public int updateUtility(SqlSession sqlSession, Utility utility) {
		int result = sqlSession.update("ReservationMapper.updateUtility", utility);
		return result;
	}

	@Override
	public int deleteUtility(SqlSession sqlSession, int utilityNo) {
		int result = sqlSession.delete("ReservationMapper.deleteUtility", utilityNo);
		return result;
	}
}
