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
		List<Reservation> rList = sqlSession.selectList("utilityMapper.selectAllReservation");
		return rList;
	}

	@Override
	public int insertReservation(SqlSession sqlSession, Reservation reservation) {
		int result = sqlSession.insert("utilityMapper.insertReservation", reservation);
		return result;
	}

	@Override
	public int updateReservation(SqlSession sqlSession, Reservation reservation) {
		int result = sqlSession.update("utilityMapper.updateReservation", reservation);
		return result;
	}

	@Override
	public int deleteReservation(SqlSession sqlSession, int reservationNo) {
		int result = sqlSession.delete("utilityMapper.deleteReservation", reservationNo);
		return result;
	}

	@Override
	public List<Utility> selectAllUtility(SqlSession sqlSession) {
		List<Utility> uList = sqlSession.selectList("utilityMapper.selectAllUtility");
		return uList;
	}

	@Override
	public int insertUtility(SqlSession sqlSession, Utility utility) {
		int result = sqlSession.insert("utilityMapper.insertUtility", utility);
		return result;
	}

	@Override
	public int updateUtility(SqlSession sqlSession, Utility utility) {
		int result = sqlSession.update("utilityMapper.updateUtility", utility);
		return result;
	}

	@Override
	public int deleteUtility(SqlSession sqlSession, int utilityNo) {
		int result = sqlSession.delete("utilityMapper.deleteUtility", utilityNo);
		return result;
	}

}
