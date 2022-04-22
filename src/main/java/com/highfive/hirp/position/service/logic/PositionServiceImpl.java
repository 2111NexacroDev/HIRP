package com.highfive.hirp.position.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.position.domain.Position;
import com.highfive.hirp.position.service.PositionService;
import com.highfive.hirp.position.store.PositionStore;
@Service
public class PositionServiceImpl implements PositionService {

	@Autowired
	private PositionStore pStore;
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<Position> selectAllPosition() {
		List<Position> pList = pStore.selectAllPosition(sqlSession);
		return pList;
	}
	
	@Override
	public int insertPosition(Position position) {
		int result = pStore.insertPosition(sqlSession, position);
		return result;
	}
	
	@Override
	public int updatePosition(Position position) {
		int result = pStore.updatePosition(sqlSession, position);
		return result;
	}
	
	@Override
	public int deletePosition(String positionCode) {
		int result = pStore.deletePosition(sqlSession, positionCode);
		return result;
	}
	
	@Override
	public int updateChangePosition(String positionSequence) {
		int result = pStore.updateChangePosition(sqlSession, positionSequence);
		return result;
	}
	
}
