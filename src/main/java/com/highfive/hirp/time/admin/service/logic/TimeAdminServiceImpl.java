package com.highfive.hirp.time.admin.service.logic;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.group.store.GroupStore;
import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.highfive.hirp.time.admin.service.TimeAdminService;
import com.highfive.hirp.time.admin.store.TimeAdminStore;

@Service
public class TimeAdminServiceImpl implements TimeAdminService {

	@Autowired
	private SqlSession sqlSession; // 얘때문에 (sqlSession)가능
	
	@Autowired
	private TimeAdminStore taStore;

	// 관리자 출근 내역 조회
	@Override
	public List<TimeAdmin> adminStart() {
		List<TimeAdmin> timeAdmin = taStore.selectStartGroup(sqlSession);
		return timeAdmin;
	}

	// 관리자 퇴근 내역 조회
	@Override
	public List<TimeAdmin> adminEnd() {
		List<TimeAdmin> timeAdmin = taStore.selectEndGroup(sqlSession);
		return timeAdmin;
	}

	// 관리자 연차 신청 내역 조회
	@Override
	public List<TimeAdmin> adminTimeView() {
		List<TimeAdmin> timeAdmin = taStore.selectVacationGroup(sqlSession);
		return timeAdmin;
	}

	// 관리자 근태 조정 신청 내역 조회
	@Override
	public List<TimeAdmin> AdminTimeModify() {
		List<TimeAdmin> timeAdmin = taStore.selectTimeGroup(sqlSession);
		return timeAdmin;
	}
}