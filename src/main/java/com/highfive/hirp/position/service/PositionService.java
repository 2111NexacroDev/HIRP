package com.highfive.hirp.position.service;

import java.util.List;

import com.highfive.hirp.position.domain.Position;

public interface PositionService {

	public List<Position> selectAllPosition();
	public int insertPosition();
	public int updatePosition();
	public int deletePosition();
	public int updateChangePosition();
}
