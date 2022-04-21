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
	public int insertPosition() {
		int result = pStore.insertPosition(sqlSession);
		return result;
	}
	@Override
	public int updatePosition() {
		int result = pStore.updatePosition(sqlSession);
		return result;
	}
	@Override
	public int deletePosition() {
		int result = pStore.deletePosition(sqlSession);
		return result;
	}
	@Override
	public int updateChangePosition() {
		int result = pStore.updateChangePosition(sqlSession);
		return result;
	}
	
}
