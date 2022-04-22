package com.highfive.hirp.position.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.position.domain.Position;

public interface PositionStore {

	List<Position> selectAllPosition(SqlSession sqlSession);
	int insertPosition(SqlSession sqlSession, Position position);
	int updatePosition(SqlSession sqlSession, Position position);
	int deletePosition(SqlSession sqlSession, String positionCode);
	int updateChangePosition(SqlSession sqlSession, String positionSequence);

}
