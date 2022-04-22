package com.highfive.hirp.group.service;

import java.util.List;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.group.domain.Group;

public interface GroupService {

	// 조직도 조회
	public List<Group> printAllGroup();

	// 회원 검색
	public List<Group> searchAllGroup(Search search);

	// 상세 회원 정보 열람
	public Group detailAllGroup(String emplId);

}
