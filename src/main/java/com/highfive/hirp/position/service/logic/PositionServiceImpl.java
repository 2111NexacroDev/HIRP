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
	
	// 직급 목록
	@Override
	public List<Position> selectAllPosition() {
		List<Position> pList = pStore.selectAllPosition(sqlSession);
		return pList;
	}
	
	// 직급 추가
	@Override
	public int insertPosition(Position position) {
		int result = pStore.insertPosition(sqlSession, position);
		return result;
	}
	
	// 직급 수정
	@Override
	public int updatePosition(Position position) {
		int result = pStore.updatePosition(sqlSession, position);
		return result;
	}
	
	// 직급 삭제
	@Override
	public int deletePosition(String positionCode) {
		int result = pStore.deletePosition(sqlSession, positionCode);
		return result;
	}
	
}
