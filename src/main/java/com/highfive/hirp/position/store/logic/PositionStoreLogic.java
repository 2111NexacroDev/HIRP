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
		List<Position> pList = sqlSession.selectList("");
		return pList;
	}

	@Override
	public int insertPosition(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int updatePosition(SqlSession sqlSession) {
		int result = sqlSession.update("");
		return result;
	}

	@Override
	public int deletePosition(SqlSession sqlSession) {
		int result = sqlSession.delete("");
		return result;
	}

	@Override
	public int updateChangePosition(SqlSession sqlSession) {
		int result = sqlSession.update("");
		return result;
	}

}
