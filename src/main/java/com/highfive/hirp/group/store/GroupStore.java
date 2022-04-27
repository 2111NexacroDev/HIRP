package com.highfive.hirp.group.store;

import java.lang.reflect.Member;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.group.domain.Group;

public interface GroupStore {

	// 조직도 조회
	public List<Group> selectAllGroup(SqlSession sqlSession);

	// 회원 검색
	public List<Group> selectSearchGroup(SqlSession sqlSession, Search search);

	// 상세 회원 정보 열람
	public Member selectDetailGroup(SqlSession sqlSession, String emplId);
}