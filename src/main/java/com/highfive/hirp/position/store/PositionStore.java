package com.highfive.hirp.position.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.position.domain.Position;

public interface PositionStore {

	List<Position> selectAllPosition(SqlSession sqlSession);
	int insertPosition(SqlSession sqlSession);
	int updatePosition(SqlSession sqlSession);
	int deletePosition(SqlSession sqlSession);
	int updateChangePosition(SqlSession sqlSession);

}
