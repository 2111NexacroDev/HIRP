package com.highfive.hirp.group.service;

import java.lang.reflect.Member;
import java.util.List;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.group.domain.Group;

public interface GroupService {

	// 조직도 조회
	public List<Dept> printAllGroup(); // 조회니까 () 비워둬야함 변수가 필요한 조회일경우 적어줘야함 조회라고 () 아님

	// 회원 검색
	public List<Group> searchAllGroup(Search search); // search변수, 넘겨주는값 적어줌

	// 상세 회원 정보 열람
	public Member detailGroupMember(String emplId);

	public List<Employee> selectAllGroupMember(String emplId);
}