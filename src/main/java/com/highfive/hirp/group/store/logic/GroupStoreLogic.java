package com.highfive.hirp.group.store.logic;

import java.lang.reflect.Member;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.group.domain.Group;
import com.highfive.hirp.group.store.GroupStore;

@Repository
public class GroupStoreLogic implements GroupStore{

	// 조직도 조회
	@Override
	public List<Dept> selectAllGroup(SqlSession sqlSession) {
		List<Dept> resultList = sqlSession.selectList("GroupMapper.selectAllGroup"); // selectOne->한개. selectList->여러개
		return resultList;
	}

	// 회원 검색
	@Override
	public List<Group> selectSearchGroup(SqlSession sqlSession, Search search) {
		List<Group> resultList = sqlSession.selectList("GroupMapper.selectSearchGroup", search);
		return resultList;
	}

	// 상세 회원 정보 열람
	@Override
	public Member selectDetailGroup(SqlSession sqlSession, String emplId) {
		Member member = sqlSession.selectOne("GroupMapper.selectDetailGroup", emplId);
		return member;
	}
}