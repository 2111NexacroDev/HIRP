package com.highfive.hirp.reservation.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.highfive.hirp.reservation.service.ReservationService;
import com.highfive.hirp.reservation.store.ReservationStore;

public class ReservationServiceImpl implements ReservationService {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private ReservationStore rStore;
}
