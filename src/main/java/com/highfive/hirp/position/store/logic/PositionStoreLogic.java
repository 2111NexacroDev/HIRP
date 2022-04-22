package com.highfive.hirp.position.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.position.domain.Position;
import com.highfive.hirp.position.store.PositionStore;
@Repository
public class PositionStoreLogic implements PositionStore {

	@Override
	public List<Position> selectAllPosition(SqlSession sqlSession) {
		List<Position> pList = sqlSession.selectList("PositionMapper.selectAllPosition");
		return pList;
	}

	@Override
	public int insertPosition(SqlSession sqlSession, Position position) {
		int result = sqlSession.insert("PositionMapper.insertPosition", position);
		return result;
	}

	@Override
	public int updatePosition(SqlSession sqlSession, Position position) {
		int result = sqlSession.update("PositionMapper.updatePosition", position);
		return result;
	}

	@Override
	public int deletePosition(SqlSession sqlSession, String positionCode) {
		int result = sqlSession.delete("PositionMapper.deletePosition", positionCode);
		return result;
	}

	@Override
	public int updateChangePosition(SqlSession sqlSession, String positionSequence) {
		int result = sqlSession.update("PositionMapper.updateChangePosition", positionSequence);
		return result;
	}

}
