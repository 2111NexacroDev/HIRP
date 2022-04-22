package com.highfive.hirp.group.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.group.domain.Group;
import com.highfive.hirp.group.service.GroupService;
import com.highfive.hirp.group.store.GroupStore;
import com.highfive.hirp.reservation.store.ReservationStore;

@Service
public class GroupServiceImpl implements GroupService {
	
	@Autowired
	private SqlSession sqlSession; // 얘때문에 (sqlSession)가능
	
	@Autowired
	private GroupStore gStore;

	// 조직도 조회
	@Override
	public List<Group> printAllGroup() {
		 List<Group> resultList = gStore.selectAllGroup(sqlSession); // sqlSession->필수,디비에가는것넣어주는
		return resultList;
	}

	// 회원 검색
	@Override
	public List<Group> searchAllGroup(Search search) { 
		List<Group> resultList = gStore.selectSearchGroup(sqlSession, search);// sqlSession, 아까보내준값적기(search)
		return resultList;
	}

	// 상세 회원 정보 열람
	@Override
	public Group detailAllGroup(String emplId) {
		Group group = gStore.selectDetailGroup(sqlSession, emplId);
		return group;
	}
}