package com.highfive.hirp.position.service;

import java.util.List;

import com.highfive.hirp.employee.domain.Certification;
import com.highfive.hirp.employee.domain.JobRole;
import com.highfive.hirp.employee.domain.Language;
import com.highfive.hirp.employee.domain.Military;
import com.highfive.hirp.position.domain.Position;

public interface PositionService {
	public List<Position> selectAllPosition(); // 직급 목록 전체 조회
	public int insertPosition(Position position); // 직급 추가
	public int updatePosition(Position position); // 직급 수정
	public int deletePosition(String positionCode); // 직급 삭제
	public int updateChangePosition(String positionSequence); // 직급 순서바꾸기
}
