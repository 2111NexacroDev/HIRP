package com.highfive.hirp.position.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.position.domain.Position;

public interface PositionStore {

	List<Position> selectAllPosition(SqlSession sqlSession); // 직급 목록 전체 조회
	int insertPosition(SqlSession sqlSession, Position position); // 직급 추가
	int updatePosition(SqlSession sqlSession, Position position); // 직급 수정
	int deletePosition(SqlSession sqlSession, String positionCode); // 직급 삭제

}
